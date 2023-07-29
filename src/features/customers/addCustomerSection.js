import { useState,useEffect } from 'react'
import { useUpdateCustomerMutation } from './customerApiSlice'
import { useGetAllSectionsQuery } from '../sections/sectionApiSlice'
import { useGetAllCustomersQuery } from './customerApiSlice'
import { useNavigate } from 'react-router-dom'

const AddCustomerSection = ({ sectionId,customerId }) => {
    const [updateCustomer, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateCustomerMutation()

    const navigate = useNavigate()

    let [validRandomID, setValidRandomID] = useState(false)

    let content

    if (isLoading) content = <div className="loading-screen"/>

    useEffect(() => {
        if (isSuccess) {
            navigate(`/customers/update/${sectionId}`)
        }
    }, [isSuccess, navigate, sectionId])

    const { section } = useGetAllSectionsQuery('sectionsList', {
        selectFromResult: ({ data }) => ({
            section: data?.entities[sectionId]
        })
    })

    const { customer } = useGetAllCustomersQuery('customersList', {
        selectFromResult: ({ data }) => ({
            customer: data?.entities[customerId]
        })
    })

    const checkForValidId = () => {
        customer.randomID? setValidRandomID(validRandomID = true) : setValidRandomID(validRandomID = false)
    }

    useEffect(() => {
        if (isSuccess && validRandomID) {
            customer.section = section.sectionName
        }
    }, [isSuccess, validRandomID, customer, section.sectionName])


    const errClass = isError? "error" : "offscreen"
    const validRandomIdClass = !validRandomID? "-invalid" : ""

    content = (
        <>
            <p className={errClass}>{error?.data?.message}</p>

            <p>Section name: {section.sectionName}</p>
            <p>Price: {section.price}</p>
            <form className="add-section-to-customer" onSubmit={updateCustomer}>
                <label>Confirm random park ID: </label>
                <input 
                    id="randomID"
                    name="randomID"
                    type="number"
                    className={`form-input${validRandomIdClass}`}
                    onChange={checkForValidId}
                />
                <label>Section name: </label>
                <input 
                    id="section"
                    name="section"
                    type="text"
                    readOnly value={customer.section}
                />
                {validRandomID && <button type="submit" className="customer-paid">Confirm purchase</button>}
            </form>
        </>
    )

    return content
}

export default AddCustomerSection