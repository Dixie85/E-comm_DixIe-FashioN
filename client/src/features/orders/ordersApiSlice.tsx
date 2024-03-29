import { IOrder } from "../../Interfaces/Interfaces"
import { apiSlice } from "../../app/api/apiSlice"

export const ordersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUserOrders: builder.query<IOrder[], string>({
            query: id => `/order/${id}`,
            providesTags: [{ type: 'Order', id: 'LIST' }],
        }),
        addNewOrder: builder.mutation({
            query: initialOrderData => ({
                url: '/order',
                method: 'POST',
                body: {
                    ...initialOrderData,
                }
            }),
            invalidatesTags: [{ type: 'Order', id: 'LIST' }, { type: 'Product', id: 'LIST' }],
        }),
        cancelOrder: builder.mutation({
            query: initialUserData => ({
                url: '/order/canceled',
                method: 'PATCH',
                body: {
                    ...initialUserData,
                }
            }),
            invalidatesTags: [{ type: 'Order', id: 'LIST' }],
        }),
    }),
})

export const {
    useGetUserOrdersQuery,
    useAddNewOrderMutation,
    useCancelOrderMutation,
} = ordersApiSlice