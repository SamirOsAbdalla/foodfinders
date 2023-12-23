import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import "./CardSkeletons.css"
import React from 'react'

let arr = [1, 2, 3, 4]
export default function CardSkeletons() {
    return (
        <div className="card-skeletons__wrapper">
            {arr.map(card =>
                <div key={card} className="card-skeleton">
                    <Skeleton count={1} height={120} width={300} />
                    <div className="skeleton__bottom">
                        <Skeleton count={2} height={20} width={250} />
                    </div>
                    <div className="card-skeleton__bottom">
                        <Skeleton count={1} height={20} width={250} />
                    </div>
                </div>
            )}
        </div>
    )
}
