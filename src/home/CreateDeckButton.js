import React from "react";
import { useHistory } from "react-router-dom";

function CreateDeckButton () {
    const history = useHistory();
    const handler = (event) => {
        history.push('/decks/new');
    }
    return(
        <button className="btn btn-secondary" type="button" onClick={handler}>+ Create Deck</button>
    )
}

export default CreateDeckButton;