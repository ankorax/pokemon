import React, { useEffect, useState } from 'react'
import { ApiConfig } from '../api'
import axios from 'axios'
import TableComponent from '../table'
import PokemonDataComponent from '../modal'
import { Visibility } from '@mui/icons-material'
import { GridActionsCellItem } from '@mui/x-data-grid-pro'

const PokemonsComponent =  () =>  {
    const [ getTableRows, setTableRows ] = useState([]);
    const [ getTableColumns, setTableColumns ] = useState([]);
    const [ getpokemon, setPokemon ] = useState([]);
    const [ getOpenModal, setOpenModal ] = useState(false);

    useEffect(() => {
        setTableColumns([
        {field: 'order', headerName: 'ID', width: '200'},
        {field: 'name', headerName: 'NAME', width: '500'},
        {field: 'actions', headerName: 'Actions', width: '200',
            type: 'actions',
            getActions: ({ id }) => {
            return [
                <GridActionsCellItem
                icon={<Visibility />}
                label="Edit"
                onClick={handleOpenModal(id)}
                color="inherit"
                />
            ];
            }
        }
        ]);
        handleGetPokemons();
    }, [getOpenModal]);

    useEffect(() => {
        handleGetPokemons();
    }, [getOpenModal]);

    const handleGetPokemons = async () => {
        await axios.get('pokemon?limit=150', ApiConfig)
        .then(response => {
            handleSetNewRows(response.data.results);
        })
        .catch(error => {
            console.log(error);
        });
    }

    const handleSetNewRows = (pokemons) => {
        let newRrows;
        newRrows = pokemons.map((pokemon, index) => {
            var row;
            row = {order: index+1, id: pokemon.url, name: pokemon.name};
            return row;
        })

        setTableRows(newRrows);
    }

    const handleOpenModal = (url) => async (event) => {
        event.stopPropagation();
        const axiosRequest = await axios.get(url)
        .then(response => {
            const data = [response.data];            
            setPokemon(data);
            setOpenModal(true);
            
        })
        .catch(error => {
            console.log(error);
        });
    };
    
  return  (
    <div>
        {/*
        Pokemons list
        Here will be displayed pokemons list
        */}
        <TableComponent
            rows={getTableRows}
            columns={getTableColumns}
        />
        {/*
        Modal component
        Here will be displayed pokemon info
        */}
        {
            getTableRows !== null && (
                <PokemonDataComponent
                pokemonData={getpokemon}
                openModal={getOpenModal}
                setOpenModal={setOpenModal} 
                />
            )
        }      
    </div>    
  )
}

export default PokemonsComponent;