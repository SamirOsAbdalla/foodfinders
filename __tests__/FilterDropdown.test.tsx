import { render, screen, fireEvent } from "@testing-library/react"
import FilterDropdown from "@/components/FilterDropdown/FilterDropdown"
import { ReduxProvider } from "@/redux/provider"

describe('FilterDropdown logic', () => {
    it("should change detect when a cuisine option is clicked and 'unclicked' in the filter dropdown", () => {

        const filterDropdownStatus = "open"

        render(
            <ReduxProvider>
                <FilterDropdown
                    filterDropdownStatus={filterDropdownStatus}
                    closeForm={() => { }}
                />
            </ReduxProvider>
        )
        let filterFormCuisines = screen.getAllByTestId("filter-form__cuisine")
        const originalFormCuisinesLength = filterFormCuisines.length
        let firstCuisine = filterFormCuisines[0]

        //Make sure that the desired element is not already present
        expect(screen.queryByTestId("filter-form__cuisine filter-form__cuisine--clicked", { exact: true }))
            .not.toBeInTheDocument()
        fireEvent.click(firstCuisine)

        //Desired element should now be in the document
        let filterFormCuisineClicked = screen.getByTestId("filter-form__cuisine filter-form__cuisine--clicked", { exact: true })
        expect(filterFormCuisineClicked)
            .toBeInTheDocument()

        //There should be one less cuisine without the clicked data-testid
        filterFormCuisines = screen.getAllByTestId("filter-form__cuisine", { exact: true })
        expect(filterFormCuisines.length)
            .toBe(originalFormCuisinesLength - 1)

        //When the same desired element is clicked again, everything should be reset
        fireEvent.click(firstCuisine)
        filterFormCuisines = screen.getAllByTestId("filter-form__cuisine", { exact: true })
        expect(filterFormCuisines.length)
            .toBe(originalFormCuisinesLength)
    })
})
