import { apiSlice } from "../apiSlice";

const DOCS_URL = "/docs";
export const docsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addDocs: builder.mutation({
            query: (data) => ({
                url: `${DOCS_URL}/adddocs`,
                method: "POST",
                body: data,
                credentials: "include"
            })
        }),
        addDiscipline: builder.mutation({
            query: ({data,id}) => ({
                url: `${DOCS_URL}/adddiscipline?userId=${id}`,
                method: "POST",
                body: data,
                credentials: "include"
            })
        }),
        getDiscipline:builder.query({
            query:(id)=>({
                url:`${DOCS_URL}/getdiscipline?userId=${id}`,
                method:"GET",
                credentials:"include"
            })
        }),
        updateDocs: builder.mutation({
            query: (data) => ({
                url: `${DOCS_URL}/updatedocs`,
                method: "PUT",
                body: data,
                credentials: "include"
            })
        }),
        getDocs:builder.query({
            query:()=>({
                url:`${DOCS_URL}/getdocs`,
                method:"GET",
                credentials:"include"
            })
        }),
        getADocs:builder.query({
            query:(id)=>({
                url:`${DOCS_URL}/getadocs?id=${id}`,
                method:"GET",
                credentials:"include"
            })
        }),
        deleteDocs:builder.mutation({
            query:({id})=>({
                url:`${DOCS_URL}/deletedocs?id=${id}`,
                method:"DELETE",
                credentials:"include"
            })
        }),

    })
})

type AddDocsMutationTrigger = ReturnType<typeof docsApiSlice.endpoints.addDocs.useMutation>[0];
type AddDocsMutationResult = ReturnType<typeof docsApiSlice.endpoints.addDocs.useMutation>[1];
type AddDisciplineMutationTrigger = ReturnType<typeof docsApiSlice.endpoints.addDiscipline.useMutation>[0];
type AddDisciplineMutationResult = ReturnType<typeof docsApiSlice.endpoints.addDiscipline.useMutation>[1];
type GetDisciplineQueryTrigger = ReturnType<typeof docsApiSlice.endpoints.getDiscipline.useQuery>[0];
type GetDisciplineQueryResult = ReturnType<typeof docsApiSlice.endpoints.getDiscipline.useQuery>[1];
type UpdateDocsMutationTrigger = ReturnType<typeof docsApiSlice.endpoints.updateDocs.useMutation>[0];
type UpdateDocsMutationResult = ReturnType<typeof docsApiSlice.endpoints.updateDocs.useMutation>[1];
type DeleteDocsMutationTrigger = ReturnType<typeof docsApiSlice.endpoints.deleteDocs.useMutation>[0];
type DeleteDocsMutationResult = ReturnType<typeof docsApiSlice.endpoints.deleteDocs.useMutation>[1];
type GetDocsQueryTrigger = ReturnType<typeof docsApiSlice.endpoints.getDocs.useQuery>[0];
type GetDocsQueryResult = ReturnType<typeof docsApiSlice.endpoints.getDocs.useQuery>[1];
type GetADocsQueryTrigger = ReturnType<typeof docsApiSlice.endpoints.getADocs.useQuery>[0];
type GetADocsQueryResult = ReturnType<typeof docsApiSlice.endpoints.getADocs.useQuery>[1];
export const useAddDocsMutation = docsApiSlice.endpoints.addDocs.useMutation as () => [AddDocsMutationTrigger, AddDocsMutationResult ];
export const useAddDisciplineMutation = docsApiSlice.endpoints.addDiscipline.useMutation as () => [AddDisciplineMutationTrigger, AddDisciplineMutationResult ];
export const useGetDisciplineQuery = docsApiSlice.endpoints.getDiscipline.useQuery as () => [GetDisciplineQueryTrigger , GetDisciplineQueryResult ];
export const useGetDocsQuery = docsApiSlice.endpoints.getDocs.useQuery as () => [GetDocsQueryTrigger , GetDocsQueryResult ];
export const useGetADocsQuery = docsApiSlice.endpoints.getADocs.useQuery as () => [GetADocsQueryTrigger , GetADocsQueryResult ];
export const useDeleteDocsMutation = docsApiSlice.endpoints.deleteDocs.useMutation as () => [DeleteDocsMutationTrigger, DeleteDocsMutationResult];
export const useUpdateDocsMutation=docsApiSlice.endpoints.updateDocs.useMutation as () => [ UpdateDocsMutationTrigger , UpdateDocsMutationResult];