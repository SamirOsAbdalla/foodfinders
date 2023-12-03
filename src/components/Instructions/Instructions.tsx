"use client"
import "./Instructions.css"
import {
    FaCaretDown,
    FaCaretUp
} from "react-icons/fa";
import { useState } from 'react';

type CaretStatus = "up" | "down"
export default function Instructions() {
    const [caretStatus, setCaretStatus] = useState<CaretStatus>("down")

    const toggleCaretStatus = () => {
        caretStatus == "down" ? setCaretStatus("up") : setCaretStatus("down")
    }

    return (
        <div className="htu__wrapper d-flex flex-column">
            <div className="htu__heading d-flex justify-content-center align-items-center">
                <div className="htu__heading--container d-flex justify-content-between align-items-center">
                    Instructions
                    <div>
                        {caretStatus == "down" ?
                            <FaCaretDown onClick={toggleCaretStatus} className="htu__caret" /> :
                            <FaCaretUp onClick={toggleCaretStatus} className="htu__caret" />
                        }
                    </div>
                </div>
            </div>
            <div className={`htu__dropdown pt-2 ${caretStatus == "up" && "htu__dropdown--show"} d-flex flex-column justify-content-start gap-4`}>
                <span>1. Click on the button</span>
                <span>2. Get your personalized restaurant</span>
                <span>3. Call, favorite or go to the restaurant</span>
                <span>{"4. Eat (maybe)"}</span>
                <span>5. Repeat </span>
            </div>
        </div>
    )
}
