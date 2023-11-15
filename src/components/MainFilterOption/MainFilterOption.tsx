import "./MainFilterOption.css"
import { UseFormRegister } from "react-hook-form"

interface Props {
    optionName: string,
    register: UseFormRegister<{
        foodTypes: string[];
        mainOptions: string[];
    }>
}
export default function MainFilterOption({
    optionName, register
}: Props) {
    return (
        <div className="mainfilteroption__wrapper text-white d-flex gap-5 justify-content-between align-items-center">
            <div>{optionName}</div>
            <div>
                <label className="mainfilteroption__switch m-0">
                    <input type="checkbox" value={optionName} {...register("mainOptions")} />
                    <span className="mainfilteroption__slider" ></span>
                </label>
            </div>
        </div>
    )
}
