import { IProduct } from "../../Interfaces/Interfaces"
import { apiSlice } from "../../app/api/apiSlice"
import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";

const productsAdapter = createEntityAdapter({})

const initialState = productsAdapter.getInitialState()

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getProducts: builder.query<IProduct[], any>({
            query: () => ({
                url: '/product',
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                },
            }),
            //@ts-ignore
            transformResponse: (responseData ) => {
                //@ts-ignore
                const loadedProducts = responseData.map(pro => {
                    pro.id = pro._id
                    return pro
                });
                return productsAdapter.setAll(initialState, loadedProducts)
            },
            //@ts-ignore
            providesTags: (result, error, arg) => {
                //@ts-ignore
                if (result?.ids) {
                    return [
                        { type: 'Product', id: 'LIST' },
                        //@ts-ignore
                        ...result.ids.map(id => ({ type: 'Product', id }))
                    ]
                } else return [{ type: 'Product', id: 'LIST' }]
            }
        }),
    }),
})

export const {
    useGetProductsQuery,
} = productApiSlice

// returns the query result object
export const selectProductsResult = productApiSlice.endpoints.getProducts.select('')

// creates memoized selector
const selectProductsData = createSelector(
    selectProductsResult,
    productsResult => productsResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllProducts,
    selectById: selectProductById,
    selectIds: selectProductIds
    // Pass in a selector that returns the users slice of state
    //@ts-ignore
} = productsAdapter.getSelectors(state => selectProductsData(state) ?? initialState)