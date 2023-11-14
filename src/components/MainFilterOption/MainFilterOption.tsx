import "./MainFilterOption.css"

interface Props {
    optionName: string
}
export default function MainFilterOption({
    optionName
}: Props) {
    return (
        <div className="mainfilteroption__wrapper text-white d-flex gap-5 justify-content-between align-items-center">
            <div>{optionName}</div>
            <div>
                <label className="mainfilteroption__switch m-0">
                    <input type="checkbox" />
                    <span className="mainfilteroption__slider" ></span>
                </label>
            </div>
        </div>
    )
}
