import { apiSlice } from "../../app/api/apiSlice"
import { setCredentials } from "../../redux/slices/auth/authSlice"

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: '/auth',
                method: 'POST',
                body: { ...credentials }
            })
        }),
        sendLogout: builder.mutation({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled
                    dispatch(apiSlice.util.resetApiState())
                } catch (err) {
                    console.log(err)
                }
            }
        }),
        refresh: builder.mutation({
          query: () => ({
              url: '/auth/refresh',
              method: 'GET',
          }),
          async onQueryStarted(arg, { dispatch, queryFulfilled }) {
              try {
                  const { data } = await queryFulfilled
                //   console.log(data, 'authApiSlice')
                  const { accessToken } = data
                  dispatch(setCredentials({ accessToken }))
              } catch (err) {
                  console.log(err)
              }
          }
      }),
        emailVerify: builder.mutation({
          query: (body) => ({
              url: `/auth/mail/${body.id}/verify/${body.token}`,
              method: 'GET',
          }),
          async onQueryStarted(arg, { dispatch, queryFulfilled }) {
              try {
                  const { data } = await queryFulfilled
                //   console.log(data, 'emailVerify')
                //   const { message } = data
                //   console.log({message});
                  
                  
              } catch (err) {
                  console.log(err)
              }
          }
      }),
    })
})

export const {
    useLoginMutation,
    useSendLogoutMutation,
    useRefreshMutation,
    useEmailVerifyMutation,
} = authApiSlice 