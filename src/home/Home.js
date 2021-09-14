import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { listDecks, deleteDeck } from "../utils/api";
import CreateDeckButton from "./CreateDeckButton";
import { Link } from "react-router-dom";
function Home({ updateDecks, deckLength }) {
    const [decks, setDecks] = useState([]);
    const history = useHistory()

    useEffect(()  => {
        const abortController = new AbortController()
        const getDecks = async () => {
            const ApiDecks = await listDecks(abortController.signal)
            setDecks(() => ApiDecks)
        }
        getDecks()
        return () => abortController.abort()
    }, [deckLength])
    
   


    return (
        <div>
            <div>
                <CreateDeckButton />
            </div>
            <div>
                {decks.map(({ id, name, description, cards = [] }, index) => {
                     const deleteHandler = async () => {
                        if (window.confirm("Are you sure you want to delete this deck? You will not be able to recover it.")) {
                            await deleteDeck(id)
                            updateDecks(-1)
                            history.go(0)
                        } else {
                            history.go(0)
                            }
                        }
                    const deckLength = cards.length
                  return (
                    <div className="card w-75 mb-4 p-3" key={index}>
                        <div className="card-body">
                            <h5 className="card-title">{name}</h5>
                            <p className="ml-auto">{deckLength} cards</p>
                        </div>
                        <p className="card-text">{description}</p>
                        <div className="row px-3">
                            <Link to={`/decks/${id}`} className="btn btn-secondary">
                                View
                            </Link>
        
                            <Link to={`/decks/${id}/study`} className="btn btn-primary">
                                <i className="fa fa-eye" aria-hidden="true"></i>
                                Study
                            </Link>
        
                            <button className="btn btn-danger float-right" onClick={deleteHandler} type="delete" id="delete">Delete</button>
                        </div>
                    </div>
                )})}
            </div>
        </div>
    )
}

export default Home;