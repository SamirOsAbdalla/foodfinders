import React from 'react'

interface Props {
    name: string
}

export default function CardName({
    name
}: Props) {
    return (
        <div className="card-name">
            {name}
        </div>
    )
}
