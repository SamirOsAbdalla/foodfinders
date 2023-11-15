import { render, screen, fireEvent } from "@testing-library/react"
import FilterDropdown from "@/components/FilterDropdown/FilterDropdown"
import { ReduxProvider } from "@/redux/provider"

it("should change the input color when a food name filter icon is clicked", () => {
    let testFunction: any = () => {

    }
    render(
        <ReduxProvider>
            <FilterDropdown
                setFilterDropdownStatus={testFunction}
            />
        </ReduxProvider>
    )
    const filterDropdownFoodNames = screen.getAllByTestId("filterdropdown__foodname")
    fireEvent.click(filterDropdownFoodNames[0])
    const filterDropdownFoodNamesActive = screen.getAllByTestId("filterdropdown__foodname__active")
    expect(filterDropdownFoodNamesActive[0]).toBeInTheDocument()
})