import { Link } from "react-router-dom"
import { useGetAllSectionsQuery } from "./sectionApiSlice"

const SectionFormat = ({ sectionId }) => {
    const { section } = useGetAllSectionsQuery('sectionsList', {
        selectFromResult: ({ data }) => ({
            section: data?.entities[sectionId]
        })
    })

    const content = (
        <div className="section-format">
            <Link to={`/customers/update/${sectionId}`}>
                {section.sectionName}
            </Link>
        </div>
    )
    if (section) {return content} else {return null}
}

export default SectionFormat