import React from 'react'
import Image from 'next/image'
interface Props {
    apiRespOrigin: "yelp" | "tripadvisor"
}
export default function OriginAttribution({
    apiRespOrigin
}: Props) {

    return (
        <div className="origin-attribution position-absolute d-flex justify-content-center align-items-center">

            {apiRespOrigin == "yelp" ?
                <Image src="/yelp_logo.svg" alt="Yelp Logo" width={70} height={25} /> :
                <Image src="/ta_logo_light.png" alt="TripAdvisor Logo" width={120} height={25} />
            }
        </div>
    )
}
