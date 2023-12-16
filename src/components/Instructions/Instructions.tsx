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
        <div className="htu__wrapper d-flex flex-column gap-3">
            <div className="htu__heading--container d-flex justify-content-between align-items-center">
                Instructions

            </div>
            <div className={`htu__dropdown d-flex flex-column justify-content-start gap-3`}>
                <span>1. Allow location services</span>
                <span>2. Click on the button</span>
                <span>3. Get your personalized restaurant</span>
                <span>4. Call, favorite or go to the restaurant</span>
                <span>{"5. Eat (maybe)"}</span>
                <span>6. Repeat </span>
            </div>
        </div>
    )
}
