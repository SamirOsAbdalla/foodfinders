import { ICuisine } from "@/util/restaurantTypes"
import "./TripAdvisorCuisines.css"

interface Props {
    cuisines?: ICuisine[]
}
export default function TripAdvisorCuisines({
    cuisines
}: Props) {
    if (!cuisines) {
        return (<></>)
    }
    return (
        <div>
            {cuisines &&
                <div className="d-flex justify-content-start align-items-center gap-2">
                    {cuisines.map((cuisine, index) => (
                        <div className="ta__cuisine d-flex justify-content-center gap-2" key={cuisine.localized_name}>
                            {cuisine.localized_name}
                            <span>•</span>
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}
