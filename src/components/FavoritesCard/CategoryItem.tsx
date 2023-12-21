import React from 'react'

interface Props {
    title: string
}
export default function CategoryItem({
    title
}: Props) {
    return (
        <div className="category-item">
            <div>{title}</div>
        </div>
    )
}
