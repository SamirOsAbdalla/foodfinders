"use client"
import React from 'react'
import "./HowToUseModal.css"
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { useState } from 'react';

export default function HowToUseModal() {
    const [caretStatus, setCaretStatus] = useState<"up" | "down">("down")

    const handleCaretStatus = () => {
        caretStatus == "down" ? setCaretStatus("up") : setCaretStatus("down")
    }

    return (
        <div className="htu__wrapper d-flex flex-column">
            <div className="htu__heading d-flex justify-content-center align-items-center">
                <div className="htu__heading__container d-flex justify-content-between align-items-center">
                    Instructions
                    <div>
                        {caretStatus == "down" ?
                            <FaCaretDown onClick={handleCaretStatus} className="htu__caret" /> :
                            <FaCaretUp onClick={handleCaretStatus} className="htu__caret" />
                        }
                    </div>
                </div>
            </div>
            <div className={`htu__dropdown ${caretStatus == "up" && "htu__dropdown__show"} flex-column justify-content-start gap-4 pt-2`}>
                <span>1. Click on the button</span>
                <span>2. Get your personalized restaurant</span>
                <span>3. Call, favorite or go to the restaurant</span>
                <span>{"4. Eat (maybe)"}</span>
                <span>5. Repeat </span>
            </div>
        </div>
    )
}
