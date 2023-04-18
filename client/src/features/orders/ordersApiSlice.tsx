import { apiSlice } from "../../app/api/apiSlice"

export const ordersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        addNewOrder: builder.mutation({
            query: initialOrderData => ({
                url: '/api/order',
                method: 'POST',
                body: {
                    ...initialOrderData,
                }
            })
        }),
        cancelOrder: builder.mutation({
            query: initialUserData => ({
                url: '/api/order/canceled',
                method: 'PATCH',
                body: {
                    ...initialUserData,
                }
            })
        }),
    }),
})

export const {
    useAddNewOrderMutation,
    useCancelOrderMutation,
} = ordersApiSlice