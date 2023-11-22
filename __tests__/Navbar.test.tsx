import { render, screen, fireEvent } from "@testing-library/react"
import Navbar from "@/components/Navbar/Navbar"
import { ReduxProvider } from "@/redux/provider"

describe("Navbar", () => {
    it("should render the filter icon", () => {
        render(<Navbar />)
        const filterButton = screen.getByTestId("navbar__filter__button")

        expect(filterButton).toBeInTheDocument()
    })

    it("should render the filter dropdown", () => {
        render(
            <ReduxProvider>
                <Navbar />
            </ReduxProvider>
        )
        const filterButton = screen.getByTestId("navbar__filter__button")
        fireEvent.click(filterButton)
        const filterdropdown = screen.getByTestId("filterdropdown")
        expect(filterdropdown).toBeInTheDocument()
    })
})
