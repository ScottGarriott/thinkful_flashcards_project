import React, {useEffect, useState} from "react";
import { useParams, Link , useHistory } from "react-router-dom";
import { createCard, readDeck } from "../utils/api";

function NewCard() {
    const params = useParams()
    const deckId = parseInt(params.deckId)
    const history = useHistory()

    const initialFormState = {
        front: "",
        back: ""
    }

    const [formData, setFormData] = useState(initialFormState)
    const [deck, setDeck] = useState({})

    useEffect(() => {
        const abortController = new AbortController()
   
        const getDeck = async () => {
            try{
            const deckApi = await readDeck(deckId, abortController.signal)
            setDeck(() => deckApi)
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


    const handleChange = ({target}) => {
        setFormData({
            ...formData,
            [target.name]: target.value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        createCard(deckId, formData)
        setFormData(initialFormState)
    }

    const doneHandler = () => {
        history.push(`/decks/${deckId}`)
    }

    return (
    <div>
         <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item active">
                    <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                   <Link to={`/decks/${deckId}`}>{deck.name}</Link>
                </li>
                <li className="breadcrumb-item" aria-current="page">
                   New Card
                </li>
            </ol>
        </nav>
    <h1>Add Card</h1>
    <form onSubmit={handleSubmit}>
        <div>
            <div className="form-group">
                <label htmlFor="newCardFront">Card Front</label>
                <textarea
                type="text" 
                name="front" 
                placeholder="Card Front" 
                className="form-control" 
                required 
                id="front"
                onChange={handleChange}
                value={formData.front}
                >
                </textarea>
            </div>
        </div>
        <div className="form-group">
            <label htmlFor="newDeckDescription">Card Back</label>
            <textarea 
            name="back" 
            placeholder="Card Back" 
            className="form-control" 
            required 
            id="back"
            onChange={handleChange}
            value={formData.back}
            >
            </textarea>
        </div>
        <div>
            <button type="submit" className="btn btn-primary">Save</button>
            <button type="cancel" className="btn btn-secondary" onClick={doneHandler}>Done</button>
        </div>
    </form>
    </div>
    )
}


export default NewCard