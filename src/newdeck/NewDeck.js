import React, {useState} from "react";
import { useHistory, Link } from "react-router-dom";
import { createDeck } from "../utils/api";

function NewDeck({ updateDeckCount }) {
    const initialState = {
        name: '',
        description: ''
    };

    const [formData, setFormData] = useState(initialState);
    const history = useHistory();

    const handleSubmit = (event) => {
        event.preventDefault();
        createDeck(formData);
        setFormData(initialState);
        updateDeckCount(1)
        alert('Deck Created!')
    }

    const handleChange = ({target}) => {
        setFormData({
            ...formData,
            [target.name]: target.value
        })
    }

    const cancelHandler = () => {
        history.push("/");
    }
    
    return (
    <div>
         <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item active">
                    <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                    Create Deck
                </li>
            </ol>
        </nav>
    <h1>Create Deck</h1>
    <form onSubmit={handleSubmit}>
        <div>
            <div className="form-group">
                <label htmlFor="newDeckName">Name</label>
                <input 
                type="text" 
                name="name" 
                placeholder="Deck Name" 
                className="form-control" 
                required 
                id="name"
                onChange={handleChange}
                value={formData.name}
                >
                </input>
            </div>
        </div>
        <div className="form-group">
            <label htmlFor="newDeckDescription">Description</label>
            <textarea 
            name="description" 
            placeholder="Deck Description" 
            className="form-control" 
            required 
            id="description"
            onChange={handleChange}
            value={formData.description}
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

export default NewDeck;