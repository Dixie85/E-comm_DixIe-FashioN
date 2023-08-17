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
        requirePasswordChangeLink: builder.mutation({
            query: ({ username }) => ({
                url: `/user/password-reset`,
                method: 'POST',
                body: { username }
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    console.log(data, 'passwordChange')
                    const { message } = data
                    console.log({ message });


                } catch (err) {
                    console.log(err)
                }
            }
        }),
        passwordChange: builder.mutation({
            query: (body) => ({
                url: `/user/password-reset/${body.id}/${body.token}`,
                method: 'POST',
                body: { password: body.password }
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    console.log(data, 'passwordChange')
                    const { message } = data
                    console.log({ message });

                } catch (err) {
                    console.log(err)
                }
            }
        }),
        verifyPasswordResetLink: builder.mutation({
            query: (body) => ({
                url: `/user/password-reset/${body.id}/${body.token}`,
                method: 'GET',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    console.log(data, 'verifyPasswordResetLink')
                    const { message } = data
                    console.log({ message });

                } catch (err) {
                    console.log(err)
                }
            }
        }),
        cancelPasswordChange: builder.mutation({
            query: ({ token }) => ({
                url: `/user/password-reset`,
                method: 'DELETE',
                body: { token }
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    console.log(data, 'Change canceled')
                    const { message } = data
                    console.log({ message });
                } catch (err) {
                    console.log(err)
                }
            }
        }),
    }),
})

export const {
    useAddNewUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
    useRequirePasswordChangeLinkMutation,
    usePasswordChangeMutation,
    useVerifyPasswordResetLinkMutation,
    useCancelPasswordChangeMutation,
} = usersApiSlice