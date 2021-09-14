import React, { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { readDeck } from "../utils/api";
import CardCard from "./CardCard";

function Study () {
    const initialCurrentDeck = {
        id: 0,
        name: '',
        cards: [],
        description: ''
    }
    const [currentDeck, setCurrentDeck] = useState(initialCurrentDeck)
    const params = useParams()
    const deckId = parseInt(params.deckId) 
    const history = useHistory()
    const { name, id, cards } = currentDeck

    useEffect(() => {
        const abortController = new AbortController()
        const getDeck = async () => {
            try{
            const deckApi = await readDeck(deckId, abortController.signal)
            setCurrentDeck(() => deckApi)
       
    }catch(error) {
        if(error.name === 'AbortError'){
            console.log('Aborted', deckId)
        }else{
            history.push('/notfound')
            }
        }
    }
        getDeck()
        return () => abortController.abort()
    }, [])


    
    return (
    <div>
        <nav aria-label="breadcrumb" className="row">
            <ol className="breadcrumb">
                <li className="breadcrumb-item active">
                    <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                    <Link to={`/decks/${id}`}>{name}</Link>
                </li>
                <li className="breadcrumb-item" aria-current="page">
                    Study
                </li>
            </ol>
        </nav>
        <div className="row">
            <h2>{name}: Study</h2>
        </div>
        <div className="row">
            <CardCard cards={cards} id={id}/>
        </div>
    </div>
    )
}

export default Study;