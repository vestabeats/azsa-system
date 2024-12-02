import { apiSlice } from "../apiSlice";
const CHAT_URL="/chat"

export const chatApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getUserChat:builder.query({
            query:(id)=>({
                url:`${CHAT_URL}/${id}`,
                method:"GET",
                credentials:"include"
            })
        }),
       
      addMessage:builder.mutation({
        query:(data)=>({
            url:`${CHAT_URL}`,
            method:"POST",
            body:data,
            credentials:"include"
        })
    }),
    getMyChats:builder.query({
        query:({id,tab})=>({
            url:`${CHAT_URL}/mychats/${id}?tab=${tab}`,
            method:"GET",
            credentials:"include"
        })
    }),
    markChatAsRead:builder.mutation({
        query:(id)=>({
            url:`${CHAT_URL}/read-chat?id=${id}`,
            method:"PUT",
            //body:data,
            credentials:"include"
        })
    }),

      })
        
    })

type GetUserChatQueryTrigger = ReturnType<typeof chatApiSlice.endpoints.getUserChat.useQuery>[0];
type GetUserChatQueryResult = ReturnType<typeof chatApiSlice.endpoints.getUserChat.useQuery>[1];

type MarkChatAsReadMutationTrigger = ReturnType<typeof chatApiSlice.endpoints.markChatAsRead.useMutation>[0];
type MarkChatAsReadMutationResult = ReturnType<typeof chatApiSlice.endpoints.markChatAsRead.useMutation>[1];

type GetMyChatsQueryTrigger = ReturnType<typeof chatApiSlice.endpoints.getMyChats.useQuery>[0];
type GetMyChatsQueryResult = ReturnType<typeof chatApiSlice.endpoints.getMyChats.useQuery>[1];

type AddMessageMutationTrigger = ReturnType<typeof chatApiSlice.endpoints.addMessage.useMutation>[0];
type AddMessageMutationResult = ReturnType<typeof chatApiSlice.endpoints.addMessage.useMutation>[1];


export const useGetUserChatQuery = chatApiSlice.endpoints.getUserChat.useQuery as () => [ GetUserChatQueryTrigger, GetUserChatQueryResult];
export const useMarkChatAsReadMutation = chatApiSlice.endpoints.markChatAsRead.useMutation as () => [MarkChatAsReadMutationTrigger, MarkChatAsReadMutationResult];
export const useGetMyChatsQuery = chatApiSlice.endpoints.getMyChats.useQuery as () => [ GetMyChatsQueryTrigger ,GetMyChatsQueryResult];
export const useAddMessageMutation=chatApiSlice.endpoints.addMessage.useMutation as () => [ AddMessageMutationTrigger,  AddMessageMutationResult ];
