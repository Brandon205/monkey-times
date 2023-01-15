import React from "react";
import { TwistyPlayer } from "cubing/twisty";

export default function TwistyComponent(props) {

    const player = new TwistyPlayer({
        puzzle: "3x3x3",
        alg: "R U R'",
        hintFacelets: "none",
        backView: "top-right",
        background: "none"
    });

    // const el = React.createElement(player);
    // console.log(el)

    // console.log(player)
    // document.body.appendChild(player);
    
    return
        {
            props.show ? (
                <div className="absolute bottom-0 right-0">
                    <h1>Twisty</h1>
                    {/* {el} */}
                </div>
            ) : null
        }
}