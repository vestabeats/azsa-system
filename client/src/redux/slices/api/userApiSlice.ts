import { apiSlice } from "../apiSlice";
const USER_URL = "/user";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        update: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/updateprofile`,
                method: "PUT",
                body: data,
                credentials: "include"
            })
        }),
        getAllStudents: builder.query({
            query: ({ wilaya, isTrashed, search, isActive }) => ({
                url: `${USER_URL}/getstudents?wilaya=${wilaya}&isTrashed=${isTrashed}&search=${search}&isActive=${isActive}`,
                method: "GET",
                credentials: "include"
            })
        }),
        getSideBarData: builder.query({
            query: ({ isActive }) => ({
                url: `${USER_URL}/sidebardata?isActive=${isActive}`,
                method: "GET",
                credentials: "include"
            })
        }),
        getStudent:builder.query({
            query:(id)=>({
                url:`${USER_URL}/find/${id}`,
                method:"GET",
                credentials:"include"
            })
        }),
        getStudentStats:builder.query({
            query:()=>({
                url:`${USER_URL}/studentstats`,
                method:"GET",
                credentials:"include"
            })
        }),
        userAction:builder.mutation({
            query:(data)=>({
                url:`${USER_URL}/${data.id}`,
                method:"PUT",
                body:data,
                credentials:"include"
            })
        }),
        studentConduct:builder.mutation({
            query:(data)=>({
                url:`${USER_URL}/changeconduct?id=${data.id}`,
                method:"PUT",
                body:data,
                credentials:"include"
            })
        }),
        deleteRestoreUser:builder.mutation({
            query:({id,actionType})=>({
                url:`${USER_URL}/delete-restore/${id}?actionType=${actionType}`,
                method:"DELETE",
                credentials:"include"
            })
        }),
        deleteUser:builder.mutation({
            query:(id)=>({
                url:`${USER_URL}/${id}`,
                method:"DELETE",
                credentials:"include"
            })
        }),
        adminChangePassword:builder.mutation({
            query:({data,userId})=>({
                url:`${USER_URL}/admchangepassword?userId=${userId}`,
                method:"PUT",
                body:data,
                credentials:"include"
            })
        }),
        changePassword:builder.mutation({
            query:({data})=>({
                url:`${USER_URL}/changepassword`,
                method:"PUT",
                body:data,
                credentials:"include"
            })
        }),
        getAllUserHistory:builder.query({
            query:({start,end,search,sex,univ,yos,status})=>({
                url:`${USER_URL}/history?start=${start}&end=${end}&search=${search}&sex=${sex}&univ=${univ}&yos=${yos}&status=${status}`,
                method:"GET",
                credentials:"include"
            })
        }),
        getNotifications:builder.query({
            query:()=>({
                url:`${USER_URL}/notifications`,
                method:"GET",
                credentials:"include"
            })
        }),
        getAttache:builder.query({
            query:()=>({
                url:`${USER_URL}/getattache`,
                method:"GET",
                credentials:"include"
            })
        }),
        getOfficials:builder.query({
            query:()=>({
                url:`${USER_URL}/getofficials`,
                method:"GET",
                credentials:"include"
            })
        }),
        getConduct:builder.query({
            query:()=>({
                url:`${USER_URL}/getconduct`,
                method:"GET",
                credentials:"include"
            })
        }),

        markNotiAsRead:builder.mutation({
            query:(data)=>({
                url:`${USER_URL}/read-noti?isReadType=${data.type}&id=${data.id}`,
                method:"PUT",
                body:data,
                credentials:"include"
            })
        }),
    })
});

// Define types for the mutation  studentstats
type UpdateMutationTrigger = ReturnType<typeof userApiSlice.endpoints.update.useMutation>[0];
type UpdateMutationResult = ReturnType<typeof userApiSlice.endpoints.update.useMutation>[1];
type MarkNotiAsReadMutationTrigger = ReturnType<typeof userApiSlice.endpoints.markNotiAsRead.useMutation>[0];
type MarkNotiAsReadMutationResult = ReturnType<typeof userApiSlice.endpoints.markNotiAsRead.useMutation>[1];
type AdminChangePasswordMutationTrigger = ReturnType<typeof userApiSlice.endpoints.adminChangePassword.useMutation>[0];
type AdminChangePasswordMutationResult = ReturnType<typeof userApiSlice.endpoints.adminChangePassword.useMutation>[1];
type ChangePasswordMutationTrigger = ReturnType<typeof userApiSlice.endpoints.changePassword.useMutation>[0];
type ChangePasswordMutationResult = ReturnType<typeof userApiSlice.endpoints.changePassword.useMutation>[1];
type UserActionMutationTrigger = ReturnType<typeof userApiSlice.endpoints.userAction.useMutation>[0];
type UserActionMutationResult = ReturnType<typeof userApiSlice.endpoints.userAction.useMutation>[1];
type DeleteUserMutationTrigger = ReturnType<typeof userApiSlice.endpoints.deleteUser.useMutation>[0];
type DeleteUserMutationResult = ReturnType<typeof userApiSlice.endpoints.deleteUser.useMutation>[1];
type DeleteRestoreUserMutationTrigger = ReturnType<typeof userApiSlice.endpoints.deleteRestoreUser.useMutation>[0];
type DeleteRestoreUserMutationResult = ReturnType<typeof userApiSlice.endpoints.deleteRestoreUser.useMutation>[1];

type StudentConductMutationTrigger = ReturnType<typeof userApiSlice.endpoints.studentConduct.useMutation>[0];
type StudentConductMutationResult = ReturnType<typeof userApiSlice.endpoints.studentConduct.useMutation>[1];

// Define types for the query getStudentStats
type GetAllStudentsQueryTrigger = ReturnType<typeof userApiSlice.endpoints.getAllStudents.useQuery>[0];
type GetAllStudentsQueryResult = ReturnType<typeof userApiSlice.endpoints.getAllStudents.useQuery>[1];
type GetStudentQueryTrigger = ReturnType<typeof userApiSlice.endpoints.getStudent.useQuery>[0];
type GetStudentQueryResult = ReturnType<typeof userApiSlice.endpoints.getStudent.useQuery>[1];
type GetNotificationsQueryTrigger = ReturnType<typeof userApiSlice.endpoints.getNotifications.useQuery>[0];
type GetNotificationsQueryResult = ReturnType<typeof userApiSlice.endpoints.getNotifications.useQuery>[1];
type GetAttacheQueryTrigger = ReturnType<typeof userApiSlice.endpoints.getAttache.useQuery>[0];
type GetAttacheQueryResult = ReturnType<typeof userApiSlice.endpoints.getAttache.useQuery>[1];
type GetOfficialsQueryTrigger = ReturnType<typeof userApiSlice.endpoints.getOfficials.useQuery>[0];
type GetOfficialsQueryResult = ReturnType<typeof userApiSlice.endpoints.getOfficials.useQuery>[1];
type GetConductQueryTrigger = ReturnType<typeof userApiSlice.endpoints.getConduct.useQuery>[0];
type GetConductQueryResult = ReturnType<typeof userApiSlice.endpoints.getConduct.useQuery>[1];
type GetAllUserHistoryQueryTrigger = ReturnType<typeof userApiSlice.endpoints.getAllUserHistory.useQuery>[0];
type GetAllUserHistoryQueryResult = ReturnType<typeof userApiSlice.endpoints.getAllUserHistory.useQuery>[1];

type GetStudentStatsQueryTrigger = ReturnType<typeof userApiSlice.endpoints.getStudentStats.useQuery>[0];
type GetStudentStatsQueryResult = ReturnType<typeof userApiSlice.endpoints.getStudentStats.useQuery>[1];

type GetSideBarDataQueryTrigger = ReturnType<typeof userApiSlice.endpoints.getSideBarData.useQuery>[0];
type GetSideBarDataQueryResult = ReturnType<typeof userApiSlice.endpoints.getSideBarData.useQuery>[1];

// Export custom hooks
export const useUpdateMutation = userApiSlice.endpoints.update.useMutation as () => [UpdateMutationTrigger, UpdateMutationResult];
export const useMarkNotiAsReadMutation = userApiSlice.endpoints.markNotiAsRead.useMutation as () => [MarkNotiAsReadMutationTrigger, MarkNotiAsReadMutationResult];
export const useChangePasswordMutation = userApiSlice.endpoints.changePassword.useMutation as () => [ChangePasswordMutationTrigger, ChangePasswordMutationResult];
export const useAdminChangePasswordMutation = userApiSlice.endpoints.adminChangePassword.useMutation as () => [AdminChangePasswordMutationTrigger, AdminChangePasswordMutationResult];
export const useDeleteUserMutation = userApiSlice.endpoints.deleteUser.useMutation as () => [DeleteUserMutationTrigger , DeleteUserMutationResult];
export const useDeleteRestoreUserMutation = userApiSlice.endpoints.deleteRestoreUser.useMutation as () => [DeleteRestoreUserMutationTrigger , DeleteRestoreUserMutationResult];
export const useGetAllStudentsQuery = userApiSlice.endpoints.getAllStudents.useQuery as () => [GetAllStudentsQueryTrigger, GetAllStudentsQueryResult];
export const useGetStudentQuery = userApiSlice.endpoints.getStudent.useQuery as () => [GetStudentQueryTrigger, GetStudentQueryResult];
export const useGetNotificationsQuery = userApiSlice.endpoints.getNotifications.useQuery as () => [GetNotificationsQueryTrigger, GetNotificationsQueryResult];
export const useGetAttacheQuery = userApiSlice.endpoints.getAttache.useQuery as () => [GetAttacheQueryTrigger, GetAttacheQueryResult];
export const useGetOfficialsQuery = userApiSlice.endpoints.getOfficials.useQuery as () => [GetOfficialsQueryTrigger, GetOfficialsQueryResult];
export const useGetConductQuery = userApiSlice.endpoints.getConduct.useQuery as () => [GetConductQueryTrigger, GetConductQueryResult];
export const useGetAllUserHistoryQuery = userApiSlice.endpoints.getAllUserHistory.useQuery as () => [GetAllUserHistoryQueryTrigger, GetAllUserHistoryQueryResult];
export const useGetStudentStatsQuery = userApiSlice.endpoints.getStudentStats.useQuery as () => [GetStudentStatsQueryTrigger, GetStudentStatsQueryResult];
export const useGetSideBarDataQuery = userApiSlice.endpoints.getSideBarData.useQuery as () => [GetSideBarDataQueryTrigger, GetSideBarDataQueryResult];
export const useUserActionMutation = userApiSlice.endpoints.userAction.useMutation as () => [UserActionMutationTrigger, UserActionMutationResult];
export const useStudentConductMutation = userApiSlice.endpoints.studentConduct.useMutation as () => [StudentConductMutationTrigger,  StudentConductMutationResult];