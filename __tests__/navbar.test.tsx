import { render, screen, fireEvent } from "@testing-library/react"
import Navbar from "@/components/Navbar/Navbar"
import { ReduxProvider } from "@/redux/provider"

describe("Navbar", () => {
    it("should render the filter icon", () => {
        render(<Navbar />)
        const filterIcon = screen.getByTestId("navbar__filter__icon")

        expect(filterIcon).toBeInTheDocument()
    })

    it("should render the filter dropdown", () => {
        render(
            <ReduxProvider>
                <Navbar />
            </ReduxProvider>
        )
        const filterIcon = screen.getByTestId("navbar__filter__icon")
        fireEvent.click(filterIcon)
        const filterdropdown = screen.getByTestId("filterdropdown")
        expect(filterdropdown).toBeInTheDocument()
    })
})
