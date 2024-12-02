import { apiSlice } from "../apiSlice";


// Define the API URL
const AUTH_URL = "/user";

// Define types for request and response data

// Define the API slice with typed endpoints
export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${AUTH_URL}/login`,
                method: "POST",
                body: data,
                credentials: "include"
            })
        }),
        register: builder.mutation({
            query: (data) => ({
                url: `${AUTH_URL}/register`,
                method: "POST",
                body: data,
                credentials: "include"
            })
        }),
        logout: builder.mutation<void, void>({
            query: () => ({
                url: `${AUTH_URL}/logout`,
                method: "POST",
                credentials: "include"
            })
        })
    })
});

// Extract types for the mutations
type LoginMutationTrigger = ReturnType<typeof authApiSlice.endpoints.login.useMutation>[0];
type LoginMutationResult = ReturnType<typeof authApiSlice.endpoints.login.useMutation>[1];

type RegisterMutationTrigger = ReturnType<typeof authApiSlice.endpoints.register.useMutation>[0];
type RegisterMutationResult = ReturnType<typeof authApiSlice.endpoints.register.useMutation>[1];

type LogoutMutationTrigger = ReturnType<typeof authApiSlice.endpoints.logout.useMutation>[0];
type LogoutMutationResult = ReturnType<typeof authApiSlice.endpoints.logout.useMutation>[1];

// Export the hooks with explicit types
export const useLoginMutation = authApiSlice.endpoints.login.useMutation as () => [LoginMutationTrigger, LoginMutationResult];
export const useRegisterMutation = authApiSlice.endpoints.register.useMutation as () => [RegisterMutationTrigger, RegisterMutationResult];
export const useLogoutMutation = authApiSlice.endpoints.logout.useMutation as () => [LogoutMutationTrigger, LogoutMutationResult];
