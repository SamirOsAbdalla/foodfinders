import { render, screen, fireEvent } from "@testing-library/react"
import Navbar from "@/components/Navbar/Navbar"
import { ReduxProvider } from "@/redux/provider"

describe("Render navbar dropdowns/buttons", () => {
    it("should render the filter icon", () => {
        render(<Navbar />)
        const filterButton = screen.getByTestId("navbar-filter__button")

        expect(filterButton).toBeInTheDocument()
    })

    it("should render the filter dropdown", () => {
        render(
            <ReduxProvider>
                <Navbar />
            </ReduxProvider>
        )
        const filterButton = screen.getByTestId("navbar-filter__button")
        fireEvent.click(filterButton)

        const filterDropdown = screen.getByTestId("filter-dropdown")
        expect(filterDropdown).toBeInTheDocument()
    })

    it("should render the account dropdown", () => {
        render(
            <ReduxProvider>
                <Navbar />
            </ReduxProvider>
        )
        const accountButton = screen.getByTestId("navbar-account__button")
        fireEvent.click(accountButton)

        const accountDropdown = screen.getByTestId("account-dropdown")
        expect(accountDropdown).toBeInTheDocument()
    })


    it("should detect which NavbarDropdown is in the document", () => {
        render(
            <ReduxProvider>
                <Navbar />
            </ReduxProvider>
        )
        Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 500 })

        const navbarHamburger = screen.getByTestId("navbar__hamburger")
        let navbarDropdownClosed = screen.queryByTestId("navbar__dropdown--closed")
        let navbarDropdown = screen.queryByTestId("navbar__dropdown")
        expect(navbarDropdownClosed)
            .toBeInTheDocument()
        expect(navbarDropdown)
            .not.toBeInTheDocument()

        fireEvent.click(navbarHamburger)

        navbarDropdownClosed = screen.queryByTestId("navbar__dropdown--closed")
        navbarDropdown = screen.queryByTestId("navbar__dropdown")
        expect(navbarDropdownClosed)
            .not.toBeInTheDocument()
        expect(navbarDropdown)
            .toBeInTheDocument()
    })

    it("should close FilterDropdown on wrapper click", () => {
        render(
            <ReduxProvider>
                <Navbar />
            </ReduxProvider>
        )
        let filterButton = screen.getByTestId("navbar-filter__button")
        fireEvent.click(filterButton)

        let filterDropdown: HTMLElement | null = screen.getByTestId("filter-dropdown")
        fireEvent.click(filterDropdown)

        filterDropdown = screen.queryByTestId("filter-dropdown")
        expect(filterDropdown).not.toBeInTheDocument()
    })
})
