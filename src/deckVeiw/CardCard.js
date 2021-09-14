import React, { useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";


function CardCard({cards, id}) {
    const [currentCard, setCurrentCard] = useState(0)
    const [isFlipped, setIsFlipped] = useState(false)
    const {url} = useRouteMatch()

    console.log(url)
    const flipHandler = () => {
        setIsFlipped(() => !isFlipped)
    }

    const nextHandler = () => {
        if(currentCard + 1 === cards.length){
            if(window.confirm('You have run out of cards, would you like to restart?')){
                setCurrentCard(0)
                setIsFlipped(false)
            }
        }else{
            setCurrentCard(currentCard + 1)
            setIsFlipped(!isFlipped)
        }
    }

    if(cards.length < 3) {
       return(
           <div className="m-3">
                <div className="row">
                    <h4>{`Not enough cards, you need at least 3 cards to study, your deck has ${cards.length} cards`} </h4>
                </div>
                <div className="row">
                    <Link to={`${url}/cards/new`} className="btn btn-primary">+ Add Card</Link>
                </div>
           </div>
       )
    }else{
        return (
            <div>
                <div className="card p-3">
                    <div className="card-title">
                        <h5>{`Card ${currentCard + 1} of ${cards.length}`}</h5>
                    </div>
                    <div className="card-body">
                        <p>{isFlipped ? cards[currentCard].back : cards[currentCard].front}</p>
                    </div>
                    <div>
                        {!isFlipped ? 
                        <button className="btn btn-secondary" onClick={flipHandler}>Flip</button> :
                        <button className="btn btn-secondary" onClick={nextHandler}>Next Card</button>}
                    </div>
                </div>
            </div>
        )
    }
    
}

export default CardCard