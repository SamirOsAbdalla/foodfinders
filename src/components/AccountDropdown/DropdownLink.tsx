import "./DropdownLink.css"
import Link from 'next/link'

interface Props {
    text: string,
    linkhref: string,
    children: React.ReactNode,
    closeAccountDropdown: () => any
}
export default function DropdownLink({
    text,
    linkhref,
    children,
    closeAccountDropdown
}: Props) {
    return (
        <Link href={`${linkhref}`} onClick={closeAccountDropdown} className="d-flex align-items-center justify-content-between gap-3 w-100 text-decoration-none dropdown__link">
            {text}
            {children}
        </Link>
    )
}
