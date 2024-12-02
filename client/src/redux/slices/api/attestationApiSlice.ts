
import { apiSlice } from "../apiSlice";

const ATTESTATION_URL = "/attestation";
export const attestationApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addAttestation: builder.mutation({
            query: ({data,userId}) => ({
                url: `${ATTESTATION_URL}/addattestation?userId=${userId}`,
                method: "POST",
                body: data,
                credentials: "include"
            })
        }),
        addRequest: builder.mutation({
            query: (data) => ({
                url: `${ATTESTATION_URL}/addrequest`,
                method: "POST",
                body: data,
                credentials: "include"
            })
        }),
        getAttestation:builder.query({
            query:()=>({
                url:`${ATTESTATION_URL}/getattestation`,
                method:"GET",
                credentials:"include"
            })
        }),
        getAdminAttestation:builder.query({
            query:({search})=>({
                url:`${ATTESTATION_URL}/getadminattestation?search=${search}`,
                method:"GET",
                credentials:"include"
            })
        }),
      
        updateAttestation: builder.mutation({
            query: (data) => ({
                url: `${ATTESTATION_URL}/updateattestation`,
                method: "PUT",
                body: data,
                credentials: "include"
            })
        }),
        deleteAttestation:builder.mutation({
            query:({id})=>({
                url:`${ATTESTATION_URL}/deleteattestation?id=${id}`,
                method:"DELETE",
                credentials:"include"
            })
        }),
        deleteAllAttestation:builder.mutation({
            query:()=>({
                url:`${ATTESTATION_URL}/deleteallattestation`,
                method:"DELETE",
                credentials:"include"
            })
        }),
    })
})

type AddAttestationMutationTrigger = ReturnType<typeof attestationApiSlice.endpoints.addAttestation.useMutation>[0];
type AddAttestationMutationResult = ReturnType<typeof attestationApiSlice.endpoints.addAttestation.useMutation>[1];
type AddRequestMutationTrigger = ReturnType<typeof attestationApiSlice.endpoints.addRequest.useMutation>[0];
type AddRequestMutationResult = ReturnType<typeof attestationApiSlice.endpoints.addRequest.useMutation>[1];
type DeleteAttestationMutationTrigger = ReturnType<typeof attestationApiSlice.endpoints.deleteAttestation.useMutation>[0];
type DeleteAttestationMutationResult = ReturnType<typeof attestationApiSlice.endpoints.deleteAttestation.useMutation>[1];

type DeleteAllAttestationMutationTrigger = ReturnType<typeof attestationApiSlice.endpoints.deleteAllAttestation.useMutation>[0];
type DeleteAllAttestationMutationResult = ReturnType<typeof attestationApiSlice.endpoints.deleteAllAttestation.useMutation>[1];

type GetAttestationQueryTrigger = ReturnType<typeof attestationApiSlice.endpoints.getAttestation.useQuery>[0];
type GetAttestationQueryResult = ReturnType<typeof attestationApiSlice.endpoints.getAttestation.useQuery>[1];
type GetAdminAttestationQueryTrigger = ReturnType<typeof attestationApiSlice.endpoints.getAdminAttestation.useQuery>[0];
type GetAdminAttestationQueryResult = ReturnType<typeof attestationApiSlice.endpoints.getAdminAttestation.useQuery>[1];

type UpdateAttestationMutationTrigger = ReturnType<typeof attestationApiSlice.endpoints.updateAttestation.useMutation>[0];
type UpdateAttestationMutationResult = ReturnType<typeof attestationApiSlice.endpoints.updateAttestation.useMutation>[1];

export const useAddAttestationMutation = attestationApiSlice.endpoints.addAttestation.useMutation as () => [AddAttestationMutationTrigger, AddAttestationMutationResult ];
export const useAddRequestMutation = attestationApiSlice.endpoints.addRequest.useMutation as () => [AddRequestMutationTrigger, AddRequestMutationResult ];
export const useDeleteAttestationMutation = attestationApiSlice.endpoints.deleteAttestation.useMutation as () => [DeleteAttestationMutationTrigger, DeleteAttestationMutationResult];
export const useDeleteAllAttestationMutation = attestationApiSlice.endpoints.deleteAllAttestation.useMutation as () => [DeleteAllAttestationMutationTrigger, DeleteAllAttestationMutationResult];
export const useGetAttestationQuery = attestationApiSlice.endpoints.getAttestation.useQuery as () => [GetAttestationQueryTrigger , GetAttestationQueryResult ];
export const useGetAdminAttestationQuery = attestationApiSlice.endpoints.getAdminAttestation.useQuery as () => [GetAdminAttestationQueryTrigger , GetAdminAttestationQueryResult ];
export const useUpdateAttestationMutation=attestationApiSlice.endpoints.updateAttestation.useMutation as () => [ UpdateAttestationMutationTrigger , UpdateAttestationMutationResult];