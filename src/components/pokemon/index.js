import React, { useEffect, useState } from 'react'
import { ApiConfig } from '../api'
import axios from 'axios'
import TableComponent from '../table'
import PokemonDataComponent from '../modal'
import { Visibility } from '@mui/icons-material'
import { GridActionsCellItem } from '@mui/x-data-grid-pro'

const PokemonsComponent =  () =>  {
  const [ tableRows, setTableRows ] = useState([]);
  const [ tableColumns, setTableColumns ] = useState([]);
  const [ pokemons, setPokemons ] = useState([]);
  const [ getpokemon, setPokemon ] = useState([]);
  const [ openModal, setOpenModal ] = useState(false);

  const handleOpenModal = (url) => (event) => {
    event.stopPropagation();
    const pokemonResult = axios.get(url)
    .then(response => {
        let result = [response];
        setPokemon(result);
        setOpenModal(true);
      }
    )
    .catch(error => {
      console.log(error);
    })
  };

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
      },
    ]);

    axios.get('pokemon?limit=150&offset=200', ApiConfig)
        .then(response => {
            setPokemons(response.data.results);
            var getNewRows = handleSetNewRows(pokemons);
            setTableRows(getNewRows);
            console.log("resultado>>>>", tableRows)
          }
        )
        .catch(error => {
          console.log(error);
        })
  }, []);

  // useEffect(() => {

  // }, [openModal]);

  const handleSetNewRows = data => {
    let newRrows;
    newRrows = data.map((pokemon, index) => {
      var row;
      row = {order: index+1, id: pokemon.url, name: pokemon.name};
      return row;
    })

    return newRrows;
  }
    
  return  (
    <div>
      {/*
        Modal component
        Here will be displayed pokemon info
      */}
      {
        tableRows !== null &&
        // <PokemonDataComponent
        //   pokemonData={getpokemon}
        //   open={openModal}
        //   setOpenModal={setOpenModal} 
        // />
        'hola'
      }

      {/*
        Pokemons list
        Here will be displayed pokemons list
      */}
      <TableComponent
        rows={tableRows}
        columns={tableColumns}
      />
    </div>    
  )
}

export default PokemonsComponent;