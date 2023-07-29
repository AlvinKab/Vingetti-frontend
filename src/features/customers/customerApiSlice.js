import {
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/api"

const customersAdapter = createEntityAdapter({})

const initialState = customersAdapter.getInitialState()

export const CustomerApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAllCustomers: builder.query({
            query: () => ({
                url: '/customers',
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                },
            }),
            transformResponse: responseData => {
                const loadedCustomers = responseData.map(customer => {
                    customer.id = customer._id
                    return customer
                });
                return customersAdapter.setAll(initialState, loadedCustomers)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Customer', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Customer', id }))
                    ]
                } else return [{ type: 'Customer', id: 'LIST' }]
            }
        }),
        createNewCustomer: builder.mutation({
            query: prevCustomerInfo => ({
                url: '/customers',
                method: 'POST',
                body: { ...prevCustomerInfo }
            }),
            invalidatesTags: [
                { type:'Customer', id:'LIST' }
            ]
        }),
        updateCustomer: builder.mutation({
            query: prevCustomerInfo => ({
                url: '/customers',
                method: 'PATCH',
                body: { ...prevCustomerInfo }
            }),
            invalidatesTags: (result, error, arg) => [
                { type:'Customer', id: arg.id }
            ]
        }),
        deleteOneCustomer: builder.mutation({
            query: ({ id }) => ({
                url: '/customers',
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type:'Customer', id: arg.id }
            ]
        })
    })
})

export const {
    useGetAllCustomersQuery,
    useCreateNewCustomerMutation,
    useUpdateCustomerMutation,
    useDeleteOneCustomerMutation
} = CustomerApiSlice

export const selectCustomersResult = CustomerApiSlice.endpoints.getAllCustomers.select()