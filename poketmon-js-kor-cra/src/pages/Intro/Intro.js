import React from "react";
import {Link} from "react-router-dom";

const Intro =  (props) => {
    return (
        <div>
            <h2>Intro.js</h2>
            <ul>
                <Link to='/Main'>Start</Link>
            </ul>
        </div>
    );
}
export default Intro;