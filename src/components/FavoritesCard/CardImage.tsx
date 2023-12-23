import React from 'react'
import Image from 'next/image'
import tripAdvisorLogo from "../../../public/tripadvisor_logo.png"
import YelpUtilButtons from '../Yelp/YelpUtilButtons/YelpUtilButtons'

interface Props {
    imageUrl?: string,
    apiRespOrigin: "yelp" | "tripadvisor",
    phoneNumber?: string,
    address?: string
}
export default function CardImage({
    imageUrl,
    phoneNumber,
    address,
    apiRespOrigin
}: Props) {

    return (
        <div className="w-100 card-image position-relative">
            <div className="favorites-card__buttons__wrapper d-flex position-absolute justify-content-between align-items-center">
                <YelpUtilButtons phoneNumber={phoneNumber} address={address} origin="card" />
            </div>
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
