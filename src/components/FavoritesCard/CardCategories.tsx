import React from 'react'
import CategoryItem from './CategoryItem'

interface Props {
    categories?: any[]
}

export default function CardCategories({
    categories
}: Props) {
    if (!categories) {
        return <></>
    }

    return (
        <div className="card-categories__wrapper d-flex gap-2">
            {categories.map(category => <CategoryItem title={category.title} />)}
        </div>
    )
}
