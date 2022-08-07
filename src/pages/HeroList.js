import logo from '../logo.svg';
import '../HeroList.css';
import React, { Component } from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';

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
                        <div key={item.name}>
                            <p> {item.name}: { item.description } </p>
                            <a style={{ cursor:"pointer" }} href={null} onClick='this.props.navigate'>Click Me </a>
                        </div>
                    ))}
                </ul>
            );
        }
    }
}

function WithNavigate(props) {
    let navigate = useNavigate();
    return <HeroList {...props} navigate={navigate} />
}

export default HeroList;
