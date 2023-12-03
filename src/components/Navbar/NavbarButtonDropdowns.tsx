import {
    SetStateAction,
    Dispatch,
    useEffect,
    useRef,
    useState
} from 'react'
import { DropdownStatus } from './Navbar'
import NavbarButton from './NavbarButton'
import { BsPerson } from "react-icons/bs";
import { TbFilters } from 'react-icons/tb';
import AccountDropdown from '../AccountDropdown/AccountDropdown';
import FilterDropdown from '../FilterDropdown/FilterDropdown';
import { NavbarButtonColor } from './NavbarButton';

interface Props {
    closeHamburger: () => any
}

const useNavbarButtonToggles = (closeHamburger: () => any) => {
    const accountDropdownRef = useRef<HTMLDivElement>(null)

    // Here I lifted state up into the common ancestor (the current component) since 
    // the display state of each child component is coupled (since I only want one of them to show at a time)
    const [accountDropdownStatus, setAccountDropdownStatus] = useState<DropdownStatus>("closed")
    const [filterDropdownStatus, setFilterDropdownStatus] = useState<DropdownStatus>("closed")

    const toggleAccountDropdownStatus = () => {

        setFilterDropdownStatus("closed")
        if (accountDropdownStatus == "open") {
            setAccountDropdownStatus("closed")
            return;
        }
        setAccountDropdownStatus("open")
    }

    const toggleFilterDropdownStatus = () => {
        setAccountDropdownStatus("closed")
        if (filterDropdownStatus == "open") {
            setFilterDropdownStatus("closed")
            return;
        }
        setFilterDropdownStatus("open")
        closeHamburger()
    }

    useEffect(() => {
        window.onclick = (event) => {
            let htmlTarget = event.target as HTMLElement
            if (!accountDropdownRef.current?.contains(htmlTarget)) {
                setAccountDropdownStatus("closed")
            }
        }
    }, [])


    const closeForm = () => {
        toggleFilterDropdownStatus()
    }

    return {
        closeHamburger,
        closeForm,
        accountDropdownRef,
        accountDropdownStatus,
        filterDropdownStatus,
        toggleAccountDropdownStatus,
        toggleFilterDropdownStatus
    }

}


export default function NavbarButtonDropdowns({
    closeHamburger
}: Props) {

    let {
        closeForm,
        accountDropdownRef,
        accountDropdownStatus,
        filterDropdownStatus,
        toggleAccountDropdownStatus,
        toggleFilterDropdownStatus
    } = useNavbarButtonToggles(closeHamburger)


    return (
        <div className="d-flex align-items-center gap-4">
            <div ref={accountDropdownRef} className="position-relative">
                <NavbarButton
                    clickHandler={toggleAccountDropdownStatus}
                    text="Account"
                    color="light"
                >
                    <BsPerson className="navbar__button--icon" />
                </NavbarButton>
                <AccountDropdown dropdownStatus={accountDropdownStatus} />
            </div>
            <div className="position-relative">
                <NavbarButton
                    clickHandler={toggleFilterDropdownStatus}
                    text="Filters"
                    color="black"
                >
                    <TbFilters className="navbar__button--icon" />
                </NavbarButton>
            </div>
            <FilterDropdown
                filterDropdownStatus={filterDropdownStatus}
                closeForm={closeForm}
            />
        </div>
    )
}
