
import { apiSlice } from "../apiSlice";

const ACADEMICS_URL = "/academics";
export const academicsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addAcademics: builder.mutation({
            query: (data) => ({
                url: `${ACADEMICS_URL}/addacademics`,
                method: "POST",
                body: data,
                credentials: "include"
            })
        }),
        getAcademics:builder.query({
            query:()=>({
                url:`${ACADEMICS_URL}/getacademics`,
                method:"GET",
                credentials:"include"
            })
        }),
        getProgramData:builder.query({
            query:({program})=>({
                url:`${ACADEMICS_URL}/getprogdata/${program}`,
                method:"GET",
                credentials:"include"
            })
        }),
       
        downloadData:builder.query({
            query:({id})=>({
                url:`${ACADEMICS_URL}/downloadfile/${id}`,
                method:"GET",
                credentials:"include"
            })
        }),
        updateAcademics: builder.mutation({
            query: (data) => ({
                url: `${ACADEMICS_URL}/updateacademics`,
                method: "PUT",
                body: data,
                credentials: "include"
            })
        }),
        deleteAcademics:builder.mutation({
            query:({id})=>({
                url:`${ACADEMICS_URL}/deleteacademics?id=${id}`,
                method:"DELETE",
                credentials:"include"
            })
        }),
    })
})

type AddAcademicsMutationTrigger = ReturnType<typeof academicsApiSlice.endpoints.addAcademics.useMutation>[0];
type AddAcademicsMutationResult = ReturnType<typeof academicsApiSlice.endpoints.addAcademics.useMutation>[1];

type DeleteAcademicsMutationTrigger = ReturnType<typeof academicsApiSlice.endpoints.deleteAcademics.useMutation>[0];
type DeleteAcademicsMutationResult = ReturnType<typeof academicsApiSlice.endpoints.deleteAcademics.useMutation>[1];

type GetAcademicsQueryTrigger = ReturnType<typeof academicsApiSlice.endpoints.getAcademics.useQuery>[0];
type GetAcademicsQueryResult = ReturnType<typeof academicsApiSlice.endpoints.getAcademics.useQuery>[1];

type GetProgramDataQueryTrigger = ReturnType<typeof academicsApiSlice.endpoints.getProgramData.useQuery>[0];
type GetProgramDataQueryResult = ReturnType<typeof academicsApiSlice.endpoints.getProgramData.useQuery>[1];

type DownloadDataQueryTrigger = ReturnType<typeof academicsApiSlice.endpoints.downloadData.useQuery>[0];
type DownloadDataQueryResult = ReturnType<typeof academicsApiSlice.endpoints.downloadData.useQuery>[1];

type UpdateAcademicsMutationTrigger = ReturnType<typeof academicsApiSlice.endpoints.updateAcademics.useMutation>[0];
type UpdateAcademicsMutationResult = ReturnType<typeof academicsApiSlice.endpoints.updateAcademics.useMutation>[1];

export const useAddAcademicsMutation = academicsApiSlice.endpoints.addAcademics.useMutation as () => [AddAcademicsMutationTrigger, AddAcademicsMutationResult];
export const useDeleteAcademicsMutation = academicsApiSlice.endpoints.deleteAcademics.useMutation as () => [DeleteAcademicsMutationTrigger, DeleteAcademicsMutationResult];
export const useGetAcademicsQuery = academicsApiSlice.endpoints.getAcademics.useQuery as () => [ GetAcademicsQueryTrigger, GetAcademicsQueryResult];
export const useGetProgramDataQuery = academicsApiSlice.endpoints.getProgramData.useQuery as () => [ GetProgramDataQueryTrigger, GetProgramDataQueryResult];
export const useDownloadDataQuery = academicsApiSlice.endpoints.downloadData.useQuery as () => [DownloadDataQueryTrigger, DownloadDataQueryResult];
export const useUpdateAcademicsMutation=academicsApiSlice.endpoints.updateAcademics.useMutation as () => [ UpdateAcademicsMutationTrigger , UpdateAcademicsMutationResult];