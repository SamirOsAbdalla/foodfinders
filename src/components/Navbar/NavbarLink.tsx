import Link from "next/link"
interface Props {
    text: string,
    linkhref: string,

}
export default function NavbarLink({
    text,
    linkhref,
}: Props) {
    return (
        <Link className="navbar__link text-decoration-none" href={`${linkhref}`}>
            {text}
        </Link>
    )
}
