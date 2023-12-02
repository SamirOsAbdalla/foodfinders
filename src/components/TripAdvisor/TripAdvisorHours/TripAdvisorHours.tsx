import "./TripAdvisorHours.css"
import { FaRegClock } from "react-icons/fa6";

interface Props {
    hours?: string[]
}
export default function TripAdvisorHours({
    hours,
}: Props) {

    let testHours = [
        'Monday: 11:00 - 22:00',
        'Tuesday: 11:00 - 22:00',
        'Wednesday: 11:00 - 22:00',
        'Thursday: 11:00 - 22:00',
        'Friday: 12:00 - 20:00',
        'Saturday: 11:00 - 22:00',
        'Sunday: 11:00 - 22:00'
    ]

    const getTimePeriod = (hour: string) => {
        if (hour[0] == "0" || hour == "10" || hour == "11") {
            return "am"
        }
        return "pm"
    }
    const formatHour = (hour: string) => {
        const militaryTimeOffset = 12
        const splitHour = hour.split(":")
        const extractHour = splitHour[0]

        if ("00" <= extractHour && extractHour <= "11") {
            if (extractHour == "00") {
                return "12" + ":" + splitHour[1]
            }
            if (extractHour[0] == "0") {
                return extractHour.slice(1) + ":" + splitHour[1]
            }
            return extractHour + ":" + splitHour[1]
        } else {

            let hourInt = parseInt(extractHour)
            if (hourInt) {
                if (hourInt == 12) {
                    return hourInt.toString() + ":" + splitHour[1]
                }
                return (hourInt - militaryTimeOffset).toString() + ":" + splitHour[1]
            }
        }
    }
    const getTodaysHours = () => {
        if (!hours) {
            return "";
        }
        const todayDayNumber = (new Date()).getDay()
        let todayDayString = "";
        switch (todayDayNumber) {
            case (0):
                todayDayString = "Sunday"
                break;
            case (1):
                todayDayString = "Monday"
                break;
            case (2):
                todayDayString = "Tuesday"
                break;
            case (3):
                todayDayString = "Wednesday"
                break;
            case (4):
                todayDayString = "Thursday"
                break;
            case (5):
                todayDayString = "Friday"
                break;
            case (6):
                todayDayString = "Saturday"
                break;
        }

        let value = hours.find((day) => {

            return (day.split(":")[0] == todayDayString)
        })

        //This gives us the two hours i.e. 11:00 and 21:00 in an array
        let splitArray = value?.split(" ")
        if (splitArray) {

            let startingHour = splitArray[1]
            let finalHour = splitArray[3]
            let startingTimePeriod = getTimePeriod(startingHour.split(":")[0])
            let endingTimePeriod = getTimePeriod(finalHour.split(":")[0])

            let returnStartingHour = formatHour(startingHour)
            let returnFinalHour = formatHour(finalHour)

            return (returnStartingHour + `${startingTimePeriod} - ` + returnFinalHour + `${endingTimePeriod}`)
        } else {
            return ""
        }

    }
    return (
        <div className="ta__hours d-flex flex-column">
            <div className="ta__hours__heading">
                Hours
            </div>
            <div className="ta__hours__info w-100 d-flex justify-content-between align-items-center">
                <div>Today</div>
                <div>{getTodaysHours()}</div>
            </div>
        </div>
    )
}
