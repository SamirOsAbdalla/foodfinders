export type NavbarButtonColor = "light" | "black"
interface Props {
    clickHandler: () => any,
    text: string,
    children: React.ReactNode,
    color: NavbarButtonColor
}
export default function NavbarButton({
    clickHandler,
    text,
    children,
    color
}: Props) {
    return (
        <button data-testid={`${text == "Account" ? "navbar-account__button" : "navbar-filter__button"}`}
            className={`navbar__button navbar__button--${color} d-flex align-items-center justify-content-center`}
            onClick={clickHandler}
        >
            <span className="navbar__button--text">{text}</span>
            {children}
        </button>
    )
}
