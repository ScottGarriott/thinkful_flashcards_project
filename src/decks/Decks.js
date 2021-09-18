import React from "react";
import {Switch, Route} from "react-router-dom";
import NewDeck from "../newdeck/NewDeck";
import DeckView from "../deckVeiw/DeckView";
import NotFound from "../notFound/NotFound";
import Study from "../deckVeiw/Study";
import NewCard from "../deckVeiw/NewCard";
import EditDeck from "../deckVeiw/EditDeck";
import EditCard from "../deckVeiw/EditCard";

function Decks({updateDeckCount}) {
    return (
        <div>
    <Switch>
        <Route path='/decks/new'>
            <NewDeck updateDeckCount={updateDeckCount} />
        </Route>
        <Route exact path='/decks/:deckId'>
            <DeckView updateDeckCount={updateDeckCount} />
        </Route>
        <Route path='/decks/:deckId/study'>
            <Study />
        </Route>
        <Route path='/decks/:deckId/cards/new'>
            <NewCard />
        </Route>
        <Route path='/decks/:deckId/edit'>
            <EditDeck updateDeckCount={updateDeckCount} />
        </Route>
        <Route path='/decks/:deckId/cards/:cardId/edit'>
            <EditCard updateDeckCount={updateDeckCount} />
        </Route>
        <Route>
            <NotFound />
        </Route>
    </Switch>
    </div>
    )
}

export default Decks;