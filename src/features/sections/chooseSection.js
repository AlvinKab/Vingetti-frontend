import SectionFormat from "./sectionFormat"
import { useGetAllSectionsQuery } from "./sectionApiSlice"

const SectionChoices = () => {
    const {
        data: sections,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetAllSectionsQuery()

    let content

    if (isLoading) content = <div className="loading-screen"/>

    if (isError) {
        content = <p className="error">{error?.data?.message}</p>
    }

    if (isSuccess) {
        const sectionsList = sections?.length && <SectionFormat/>

        content = (
            <>
                <h2><strong>Choose your delight</strong></h2>
                <div className="section-choice-page">
                    {sectionsList}
                </div>
            </>
        )}

    return content
}

export default SectionChoices