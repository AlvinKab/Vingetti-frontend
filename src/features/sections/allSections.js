import { useGetAllSectionsQuery } from "./sectionApiSlice"
import { useDeleteOneSectionMutation } from "./sectionApiSlice"

const AllSections = ({ sectionId }) => {
    const { section } = useGetAllSectionsQuery('sectionsList', {
        selectFromResult: ({ data }) => ({
            section: data?.entities[sectionId]
        })
    })

    const [deleteSection] = useDeleteOneSectionMutation()

    const onDeleteSectionClicked = async () => {
        await deleteSection({id :section.id})
    }

    const content = (
        <div className="section-info">
            <p>Section name: {section.sectionName}</p>
            <p>Dimensions(metres): {section.dimensions}</p>
            <p>Price: {section.price}</p>
            <span><button onClick={onDeleteSectionClicked}>delete</button></span>
        </div>
    )

    return content
}

export default AllSections