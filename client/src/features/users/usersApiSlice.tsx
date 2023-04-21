import { apiSlice } from "../../app/api/apiSlice"

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        addNewUser: builder.mutation({
            query: initialUserData => ({
                url: '/user',
                method: 'POST',
                body: {
                    ...initialUserData,
                }
            }),
        }),
        updateUser: builder.mutation({
            query: initialUserData => ({
                url: '/user',
                method: 'PATCH',
                body: {
                    ...initialUserData,
                }
            }),
        }),
        deleteUser: builder.mutation({
            query: ({ id }) => ({
                url: `/user`,
                method: 'DELETE',
                body: { id }
            }),
        }),
    }),
})

export const {
    useAddNewUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
} = usersApiSlice