import logo from '../logo.svg';
import '../HeroList.css';
import {Route, Link, Routes, useParams} from 'react-router-dom';
import React, {Component, useState} from 'react';

// import Hero from './Hero';

function HeroList (props) {
    const [error, setError] = useState(null);
    let isLoaded = useState(false);
    let items = useState([]);

    const componentDidMount = () => {
        fetch("https://gateway.marvel.com:443/v1/public/characters?limit=100&apikey=b6995d361d0c44520ec906f87e2b2cdc",{method: "GET"})
            .then(res => res.json())
            .then(
                (result) => {
                    isLoaded = true;
                    let items = result.data.results;
                },

                (error) => {
                    setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    if (error) {
        return <div>Erreur : {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Chargement…</div>;
    } else {
        return (
            <ul>
                {items.map(item => (
                    <div key={item.id}>
                        <p> {item.name}: { item.description } </p>
                        <Link to={'/' + item.id}>Link to page</Link>
                    </div>
                ))}
            </ul>
        );
    };
}

export default HeroList;
