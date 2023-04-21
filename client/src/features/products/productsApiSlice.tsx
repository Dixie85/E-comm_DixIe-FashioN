import { IProduct } from "../../Interfaces/Interfaces"
import { apiSlice } from "../../app/api/apiSlice"

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getProducts: builder.query<IProduct[], string>({
            query: () => '/product',
            providesTags: [{ type: 'Product', id: 'LIST' }],
        }),
    }),
})

export const {
    useGetProductsQuery,
} = productApiSlice


