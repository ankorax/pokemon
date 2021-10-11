import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import  PokemonsComponent from '../components/pokemon';

function Router() {
    return (
        <BrowserRouter>
            <Route path="/" exact component={PokemonsComponent} />
        </BrowserRouter>
    )
}

export default Router;