import React from "react"

export default function Answer(props) {
    return (
        <label>
            <input 
                type="radio" 
                name={props.name}
                value={props.value}
            />
            {props.value}
        </label>
    )
}