import "./DropdownLink.css"
import Link from 'next/link'

interface Props {
    text: string,
    linkhref: string,
    children: React.ReactNode
}
export default function DropdownLink({
    text,
    linkhref,
    children
}: Props) {
    return (
        <Link href={`${linkhref}`} className="d-flex align-items-center justify-content-between gap-3 w-100 text-decoration-none dropdown__link">
            {text}
            {children}
        </Link>
    )
}
