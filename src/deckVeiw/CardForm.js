import React from "react";

function CardForm({handleSubmit, handleChange, doneHandler, card}){
    return (
    <React.Fragment>
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
                            value={card.front}
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
                        value={card.back}
                        >
                        </textarea>
                    </div>
                    <div>
                        <button type="submit" className="btn btn-primary">Save</button>
                        <button type="cancel" className="btn btn-secondary" onClick={doneHandler}>Done</button>
                    </div>
                </form>
                </React.Fragment>
                )
}

export default CardForm;