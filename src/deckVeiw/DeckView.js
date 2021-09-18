import React, { useEffect, useState } from "react";
import { useParams, Link , useHistory, useRouteMatch } from "react-router-dom";
import { readDeck,deleteDeck, deleteCard } from "../utils/api";


function DeckView({updateDeckCount}) {
    
    const initialCurrentDeck = {
        id: 0,
        name: '',
        cards: [],
        description: ''
    }
    const params = useParams()
    const deckId = parseInt(params.deckId)
    const [currentDeck, setCurrentDeck] = useState(initialCurrentDeck)
    const history = useHistory()
    const { name, id, cards, description } = currentDeck
    const {url} = useRouteMatch()
    console.log(url)
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
    }, [deckId, history])

    const deckDeleteHandler = async () => {
        if (window.confirm("Are you sure you want to delete this deck? You will not be able to recover it.")) {
            await deleteDeck(id)
            updateDeckCount(-1)
            history.push('/')
        } else {
            history.go(0)
            }
        } 
        return(
        <div>
        <nav aria-label="breadcrumb" className="row">
            <ol className="breadcrumb">
                <li className="breadcrumb-item active">
                    <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item" aria-current="page">
                    {name}
                </li>
            </ol>
        </nav>
            <div className="row">
                <h4 className="title">{name}</h4>
            </div>
            <div className="row">
                <p className="lead">{description}</p>
            </div>
            <div className="row">
                <Link to={`${url}/edit`} className="btn btn-secondary">
                    Edit
                </Link>
                <Link to={`${url}/study`} className="btn btn-primary">
                    Study
                </Link>
                <Link to={`${url}/cards/new`} className="btn btn-primary">
                    + Add new Card
                </Link>
                <button className="btn btn-danger" onClick={deckDeleteHandler} type="delete" id="delete">Delete</button>
            </div>
            {cards.map((card) => {
                async function cardDeleteHandler () {
                    if (window.confirm("Delete this card?  You will not be able to recover it.")) {
                        await deleteCard(card.id)
                        history.go(0)
                    } else {
                        history.go(0)
                    }
                }
                return(
                    <div key={card.id} className="card p-3 m-3">
                        <div className="row">
                            <div className="card-body col-6">
                                {card.front}
                            </div>
                            <div className="card-body col-6">
                                {card.back}
                            </div>
                        </div>
                        <div className="row p-3">
                            <Link to={`${url}/cards/${card.id}/edit`} className="btn btn-secondary p-1">
                                Edit
                            </Link>
                            <button className="btn btn-danger p-1" onClick={cardDeleteHandler} >Delete Card</button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
  
}

export default DeckView;