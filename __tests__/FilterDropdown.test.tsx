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
    const filterDropdownFoodTypes = screen.getAllByTestId("filterdropdown__foodtype")
    fireEvent.click(filterDropdownFoodTypes[0])
    const filterDropdownFoodTypesActive = screen.getAllByTestId("filterdropdown__foodtype__active")
    expect(filterDropdownFoodTypesActive[0]).toBeInTheDocument()
})