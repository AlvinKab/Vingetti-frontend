import { useGetAllCustomersQuery } from "./customerApiSlice"
import { useDeleteOneCustomerMutation } from "./customerApiSlice"

const AllCustomers = ({ customerId }) => {
    const { customer } = useGetAllCustomersQuery('customersList', {
        selectFromResult: ({ data }) => ({
            customer: data?.entities[customerId]
        })
    })

    const [deleteCustomer] = useDeleteOneCustomerMutation()

    const onDeleteCustomerClicked = async () => {
        await deleteCustomer({id :customer.id})
    }

    const content = (
        <>
            <div className="customer-info">
                <p>Random ID: {customer.randomID}</p>
                <p>Name: {customer.firstName} {}</p>
                <p>Sections visited: {customer.section}</p>
                <p>{customer.date}</p>
                <span><button onClick={onDeleteCustomerClicked}>delete</button></span>
            </div>
        </>
    )
    return content
}

export default AllCustomers