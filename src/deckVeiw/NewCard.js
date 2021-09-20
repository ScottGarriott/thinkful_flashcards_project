import React, {useEffect, useState} from "react";
import { useParams, Link , useHistory } from "react-router-dom";
import { createCard, readDeck } from "../utils/api";
import CardForm from "./CardForm";

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
        },[deckId, history])


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
        alert('Card Created!')
        //history.push(`/decks/${deckId}`)
    }

    const doneHandler = (event) => {
        event.preventDefault()
        setFormData(initialFormState)
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
    <CardForm doneHandler={doneHandler}  handleChange={handleChange} handleSubmit={handleSubmit} card={formData}/>
    </div>
    )
}

export default NewCard