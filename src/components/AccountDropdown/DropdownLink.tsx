import "./DropdownLink.css"
import Link from 'next/link'

interface Props {
    text: string,
    linkhref: string,
    children: React.ReactNode,
    onClick: () => any,
}
export default function DropdownLink({
    text,
    linkhref,
    children,
    onClick
}: Props) {
    return (
        <Link href={`${linkhref}`} onClick={onClick} className="d-flex align-items-center justify-content-between gap-3 w-100 text-decoration-none dropdown__link">
            {text}
            {children}
        </Link>
    )
}
