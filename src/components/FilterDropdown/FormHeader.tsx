
interface Props {
    closeForm: () => any
}

export default function FormHeader({
    closeForm
}: Props) {
    return (
        <div className="form-header d-flex justify-content-between ">
            <div onClick={closeForm} className="form-header--clickable">Cancel</div>
            <div className="form-header__title">Filters</div>
            <button type="submit" className="form-header--clickable form-header__apply d-flex justify-content-center align-items-center">Apply</button>
        </div>
    )
}
