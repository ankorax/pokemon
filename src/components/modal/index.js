import React, { useEffect, useState } from 'react';
import { ApiConfig } from '../api';
import axios from 'axios';
import { 
    Box,
    Grid,
    ImageList,
    ImageListItem,
    List,
    ListItem,
    Paper,
} from '@mui/material';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '60%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function PokemonDataComponent(props) {
    const [ getId, setId] = useState();
    const [ getForm, setForm] = useState([]);
    const [ getFrontSprite, setFrontSprite] = useState();
    const [ getAbilities, setAbilities] = useState([]);
    const [ getTypes, setTypes] = useState([]);    
    const [ getEvolutions, setEvolutions] = useState([]);
    const [ getEvolutionsList, setEvolutionsList] = useState([]);

    useEffect(() => {
        handleGetId(props.pokemonData);

        if(getId !== undefined || getId !== null) {
            handleGetForm();   
            handleEvolution();
            handleAbilities(props.pokemonData);
            handleTypes(props.pokemonData);
        }
    }, [props, getId])

    const handleClose = () => {
        props.setOpenModal(false);
    }

    const handleGetId = (pokemon) => {
        if(pokemon.length > 0) {
            return setId(pokemon[0].id);
        }
    }

    const handleGetForm = async () => {    
        await axios.get('pokemon-form/'+getId, ApiConfig)
        .then(response => {
            setForm([response.data]);
            handleSprite();
        })
        .catch(error => {            
            console.log(error);
        });
    }

    const handleTypes = async (pokemon) => {
        const obj =  pokemon.length > 0 ? pokemon[0] : null;
        const types = obj !== null ? obj.types : null;

        if(types !== null) {
            setTypes(
                <List>
                    {types.map((type, index) => {
                        return <ListItem id={'type-'+index}>{type.type.name}</ListItem>
                    })}
                </List> 
            );
        }
    }

    const handleAbilities = async (pokemon) => {
        const obj =  pokemon.length > 0 ? pokemon[0] : null;
        const abilities = obj !== null ? obj.abilities : null;

        if(abilities !== null) {
            setAbilities(
                <List>
                    {abilities.map((ability, index) => {
                        return <ListItem  id={'ability-'+index}>{ability.ability.name}</ListItem>
                    })}
                </List> 
            );
        }
    }

    const handleSprite = () => {
        if(getForm.length > 0) {
            const form = getForm.length > 0 ? getForm[0] : null;
            const sprites = form !== null ? form.sprites : null;

            const images = (
            <ImageList sx={{ width: 500, height: 500 }} cols={3} rowHeight={10}>
                {Object.values(sprites).map((item, index) => (
                    (item !== null) && (                        
                        <ImageListItem key={'image-'+index}>
                        <img
                            src={`${item}?w=200&h=200&fit=crop&auto=format`}
                            srcSet={`${item}?w=200&h=200&fit=crop&auto=format&dpr=2 2x`}
                            alt={item}
                            loading="lazy"
                        />
                        </ImageListItem>
                    )
                ))}
            </ImageList>);

            return setFrontSprite(images);
        }
    }

    const handleEvolution = () => {
        axios.get('evolution-chain/'+getId, ApiConfig)
        .then(response => {
            setEvolutions([response.data]);
            
            const chain = getEvolutions.length > 0 ? getEvolutions[0].chain : null;
            const evolvesTo = chain !== null ? chain.evolves_to : null;
            const details = evolvesTo.length > 0 ? evolvesTo[0].evolution_details : null;

            if(details !== null) {
                setEvolutionsList(
                    <List>
                        {                            
                            details.map((detail, index) => {
                                return <ListItem  id={'evolution-'+index}>Minimun Level: {detail.min_level}</ListItem>
                            })
                        }
                    </List>
                )
            } else {
                setEvolutionsList(
                    <List>
                        {
                            <ListItem>None evolution was found</ListItem>
                        }
                    </List>
                )
            }        
        })
        .catch(error => {
            console.log(error);            
        });
    }

    return (
        <>
            <Modal
                open={props.openModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Grid container spacing={2}>
                        <Grid item xs={6} md={7}>
                            <Paper elevation={5}>
                                { getFrontSprite }                            
                            </Paper>
                        </Grid>
                        <Grid item xs={6} md={5}>
                            <Paper elevation={0}>
                                <h1>{ getForm.length > 0 ? getForm[0].name.toUpperCase(): 'Unknown' }</h1>
                                <h2>Type: { getForm.length > 0 ? getForm[0].type : 'Unknown' }</h2>
                                <p>{ getTypes }</p>
                                <h2>Abilites:</h2>
                                <p>{ getAbilities }</p>
                                <h2>Evolutions:</h2>
                                <p>{ getEvolutionsList }</p>
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </>
    );
}