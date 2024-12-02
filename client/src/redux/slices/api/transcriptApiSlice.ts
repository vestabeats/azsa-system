
import { apiSlice } from "../apiSlice";

const TRASCRIPT_URL = "/transcript";
export const transcriptApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addTranscript: builder.mutation({
            query: (data) => ({
                url: `${TRASCRIPT_URL}/addtranscript`,
                method: "POST",
                body: data,
                credentials: "include"
            })
        }),
        getTranscript:builder.query({
            query:()=>({
                url:`${TRASCRIPT_URL}/gettranscript`,
                method:"GET",
                credentials:"include"
            })
        }),
        getPerformanceStats:builder.query({
            query:()=>({
                url:`${TRASCRIPT_URL}/getperfstats`,
                method:"GET",
                credentials:"include"
            })
        }),
        getAdminPerformanceStats:builder.query({
            query:({userId})=>({
                url:`${TRASCRIPT_URL}/getadminperfstats/${userId}`,
                method:"GET",
                credentials:"include"
            })
        }),
        updateTranscript: builder.mutation({
            query: (data) => ({
                url: `${TRASCRIPT_URL}/updatetranscript`,
                method: "PUT",
                body: data,
                credentials: "include"
            })
        }),
        deleteTranscript:builder.mutation({
            query:({id})=>({
                url:`${TRASCRIPT_URL}/deletetranscript?id=${id}`,
                method:"DELETE",
                credentials:"include"
            })
        }),
    })
})

type AddTranscriptMutationTrigger = ReturnType<typeof transcriptApiSlice.endpoints.addTranscript.useMutation>[0];
type AddTranscriptMutationResult = ReturnType<typeof transcriptApiSlice.endpoints.addTranscript.useMutation>[1];

type DeleteTranscriptMutationTrigger = ReturnType<typeof transcriptApiSlice.endpoints.deleteTranscript.useMutation>[0];
type DeleteTranscriptMutationResult = ReturnType<typeof transcriptApiSlice.endpoints.deleteTranscript.useMutation>[1];

type GetTranscriptQueryTrigger = ReturnType<typeof transcriptApiSlice.endpoints.getTranscript.useQuery>[0];
type GetTranscriptQueryResult = ReturnType<typeof transcriptApiSlice.endpoints.getTranscript.useQuery>[1];
type GetPerfomanceStatsQueryTrigger = ReturnType<typeof transcriptApiSlice.endpoints.getPerformanceStats.useQuery>[0];
type GetPerfomanceStatsQueryResult = ReturnType<typeof transcriptApiSlice.endpoints.getPerformanceStats.useQuery>[1];
type GetAdminPerfomanceStatsQueryTrigger = ReturnType<typeof transcriptApiSlice.endpoints.getAdminPerformanceStats.useQuery>[0];
type GetAdminPerfomanceStatsQueryResult = ReturnType<typeof transcriptApiSlice.endpoints.getAdminPerformanceStats.useQuery>[1];

type UpdateTranscriptMutationTrigger = ReturnType<typeof transcriptApiSlice.endpoints.updateTranscript.useMutation>[0];
type UpdateTranscriptMutationResult = ReturnType<typeof transcriptApiSlice.endpoints.updateTranscript.useMutation>[1];

export const useAddTranscriptMutation = transcriptApiSlice.endpoints.addTranscript.useMutation as () => [AddTranscriptMutationTrigger, AddTranscriptMutationResult];
export const useDeleteTranscriptMutation = transcriptApiSlice.endpoints.deleteTranscript.useMutation as () => [DeleteTranscriptMutationTrigger, DeleteTranscriptMutationResult];
export const useGetTranscriptQuery = transcriptApiSlice.endpoints.getTranscript.useQuery as () => [ GetTranscriptQueryTrigger, GetTranscriptQueryResult];
export const useGetPerformanceStatsQuery = transcriptApiSlice.endpoints.getPerformanceStats.useQuery as () => [ GetPerfomanceStatsQueryTrigger, GetPerfomanceStatsQueryResult];
export const useGetAdminPerformanceStatsQuery = transcriptApiSlice.endpoints.getAdminPerformanceStats.useQuery as () => [ GetAdminPerfomanceStatsQueryTrigger, GetAdminPerfomanceStatsQueryResult];
export const useUpdateTranscriptMutation=transcriptApiSlice.endpoints.updateTranscript.useMutation as () => [ UpdateTranscriptMutationTrigger , UpdateTranscriptMutationResult];