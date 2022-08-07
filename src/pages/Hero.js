import logo from '../logo.svg';
import '../HeroList.css';
import React, { Component } from 'react';

// import Hero from './Hero';

class Hero extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props)
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
        const id = this.props.match.params.id;
        console.log(id);

        let idCheck = false;

        if (error) {
            return <div>Erreur : {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Chargement…</div>;
        } else {
            return (
                <ul>
                    {items.map(item => {
                        while(!idCheck){
                            if (item.id === 12) {
                                return (
                                    <ul>
                                        <h1>{item.name}</h1>
                                        <h2>{item.description}</h2>
                                    </ul>
                                );
                                idCheck = true;
                            }
                        }
                    })}
                </ul>
            )
        }
    }
}

export default Hero;