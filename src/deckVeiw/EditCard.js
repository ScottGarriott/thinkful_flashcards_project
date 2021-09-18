import React, {useEffect, useState} from "react";
import { useParams, Link , useHistory } from "react-router-dom";
import { readDeck, readCard, updateCard } from "../utils/api";
import CardForm from "./CardForm";


function EditCard({updateDeckCount}) {
    const [card, editCard] = useState({front:'', back:''})
    const [deck, setDeck] = useState({})
    const {deckId, cardId} = useParams()
    const history = useHistory()

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

        useEffect(() => {
            const abortController = new AbortController()
       
            const getCard = async () => {
                try{
                const cardApi = await readCard(cardId, abortController.signal)
                editCard(() => cardApi)
                }catch(error) {
                    if(error.name === 'AbortError'){
                        console.log('Aborted', cardId)
                    }else{
                        history.push('/notfound')
                        }
                    }
                }
                getCard()
                return () => abortController.abort
            },[cardId, history])

            const handleSubmit = async (event) => {
                event.preventDefault()
                await updateCard(card)
               history.push(`/decks/${deckId}`)
               updateDeckCount(1)
            }
    
            const handleChange = ({target}) => {
                editCard({
                    ...card,
                    [target.name]: target.value
                })
            }
    
        
            const doneHandler = () => {
                history.push(`/decks/${deckId}`)
            }

          return  (
                <div>
                <div>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item active">
                                <Link to="/">Home</Link>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page">
                                <Link to={`/decks/${deckId}`}>{`Deck ${deck.name}`}</Link>
                            </li>
                            <li className="breadcrumb-item" aria-current="page">
                                {`Edit Card ${card.id}`}
                            </li>
                        </ol>
                    </nav>
                </div>
                <h1>Edit Card</h1>
                    <CardForm doneHandler={doneHandler}  handleChange={handleChange} handleSubmit={handleSubmit} card={card}/>
                </div>
                )
}

export default EditCard