import React from 'react'
import Image from 'next/image'
import tripAdvisorLogo from "../../../public/tripadvisor_logo.png"
interface Props {
    imageUrl?: string,
    apiRespOrigin: "yelp" | "tripadvisor"
}
export default function CardImage({
    imageUrl,
    apiRespOrigin
}: Props) {

    return (
        <div className="w-100 card-image position-relative">
            {apiRespOrigin == "yelp" ?
                <Image fill style={{ objectFit: "cover" }} src={imageUrl ?? ""} alt="Restaurant Image" /> :
                <div className={`w-100 ta__card-image__container ${imageUrl ? "" : "background__black"} position-relative`}>
                    {imageUrl ?
                        <Image
                            fill
                            src={`${imageUrl}`}
                            style={{ objectFit: "cover" }}
                            alt="TripAdvisor Image"
                        /> :
                        <Image
                            fill
                            src="/tripadvisor_logo.png"
                            style={{ objectFit: "contain" }}
                            alt="TripAdvisor Image"
                        />
                    }
                </div>
            }
        </div>
    )
}
