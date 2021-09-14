import React, {useEffect, useState} from "react";
import { useParams, Link , useHistory, useRouteMatch } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api";

function EditDeck({updateDecks}) {
    const [deck, editDeck] = useState({name:'', description:'', id: 0})
    const history = useHistory()
    const {deckId} = useParams()
    const {url} = useRouteMatch()


    console.log(url)
    useEffect(() => {
        const abortController = new AbortController()
   
        const getDeck = async () => {
            try{
            const deckApi = await readDeck(deckId, abortController.signal)
            editDeck(() => deckApi)
            }catch(error) {
                if(error.name === 'AbortError'){
                    console.log('Aborted', deckId)
                }else{
                    history.push('/notfound')
                    }
                }
            }
            getDeck()
            return () => abortController.abort
        },[deckId])

        const handleSubmit = async (event) => {
            event.preventDefault()
           const response = await updateDeck(deck)
           history.push(`/decks/${response.id}`)
           updateDecks(1)
        }

        const handleChange = ({target}) => {
            editDeck({
                ...deck,
                [target.name]: target.value
            })
        }

    
        const cancelHandler = () => {
            history.push("/")
        }
    
    if(!deck) {
        return (
            <div className="spinner-border text-primary" role="status">
                <span className="sr-only">
                    Loading...
                </span>
            </div>
        )
    }else{
   return (
    <div>
        <div>
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item active">
                    <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                    <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
                </li>
                <li className="breadcrumb-item" aria-current="page">
                    Edit
                </li>
            </ol>
        </nav>
        </div>
    <h1>Edit Deck</h1>
    <form onSubmit={handleSubmit}>
        <div>
            <div className="form-group">
                <label htmlFor="newDeckName">Name</label>
                <input 
                type="text" 
                name="name" 
                className="form-control" 
                required 
                id="name"
                onChange={handleChange}
                value={deck.name}
                >
                </input>
            </div>
        </div>
        <div className="form-group">
            <label htmlFor="newDeckDescription">Description</label>
            <textarea 
            name="description" 
            className="form-control" 
            required 
            id="description"
            onChange={handleChange}
            value={deck.description}
            >
            </textarea>
        </div>
        <div>
            <button type="submit" className="btn btn-primary">Submit</button>
            <button type="cancel" className="btn btn-secondary" onClick={cancelHandler}>Cancel</button>
        </div>
    </form>
    </div>
    )
    }   
}

export default EditDeck