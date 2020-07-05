import React from "react";
import "./App.css";

import PathFinderVisualiser from "./pathFinderVisualiser/pathfinderVisualiser";

//Stylesheets
import "./utils/bootstrap.min.css";

function App() {
    return (
        <div className="App">
            <PathFinderVisualiser />
        </div>
    );
}

export default App;
