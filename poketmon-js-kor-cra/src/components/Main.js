import React from "react";
import Header from './Header';

const Main = (props) => {
    return (
        <div>
            <Header></Header>
            <h1>Main.js</h1>
            <Link to ='/Battle'>Battle</Link>
        </div>

    );
}

export default Main;