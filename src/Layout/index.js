import React, { useState } from "react";
import Header from "../header/Header";
import NotFound from "../notFound/NotFound";
import Decks from "../decks/Decks";
import {Switch, Route, BrowserRouter as Router} from "react-router-dom";
import Home from "../home/Home";

//first we need to get the decks
//then we need to set a state which

function Layout() {

  const [deckLength, setDeckLength] = useState(0);

  const updateDecks = (newDecks) => {
    setDeckLength(() => deckLength + newDecks)
  }
  

  return (
    <div>
      <Header />
      <div className="container">

        <Switch>
        <Route exact path="/">
        <Home updateDecks={updateDecks} deckLength={deckLength}/>
        </Route>
        <Route path="/decks">
        <Decks updateDecks={updateDecks} />
        </Route>
        <Route>
        <NotFound />
        </Route>
        </Switch>

      </div>
    </div>
  );
}

export default Layout;
