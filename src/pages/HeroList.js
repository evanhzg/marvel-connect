import logo from '../logo.svg';
import '../HeroList.css';
import {Route, Link, Routes, useParams} from 'react-router-dom';
import React, { Component } from 'react';

// import Hero from './Hero';

class HeroList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }

    componentDidMount() {
        fetch("https://gateway.marvel.com:443/v1/public/characters?limit=100&apikey=b6995d361d0c44520ec906f87e2b2cdc",{method: "GET"})
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result.data.results
                    });
                },

                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        const { error, isLoaded, items } = this.state;

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
                            <Link to={"/" + item.id}>Link to page</Link>
                        </div>
                    ))}
                </ul>
            );
        }
    }
}

export default HeroList;
