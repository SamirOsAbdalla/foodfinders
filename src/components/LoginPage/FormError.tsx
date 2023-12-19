import React from 'react'
import { MdErrorOutline } from "react-icons/md";

interface Props {
    message: string
}
export default function FormError({
    message
}: Props) {

    return (
        <div className="form-error__wrapper d-flex align-items-center gap-3">
            <MdErrorOutline className="form-error__icon" />
            <div className="form-error__message">Error: {message}</div>
        </div>
    )
}
