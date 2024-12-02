import { createSlice } from "@reduxjs/toolkit";

export interface stateInitial{
    user:any,
    isSidebarOpen:boolean,
    searchvalue:string,
    startDate:string,
    endDate:string
}
const initialState:stateInitial = {
    user:localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo') as string):null,
    isSidebarOpen:false,
    searchvalue:'',
    startDate:"",
    endDate:""
}
const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        setCredentials:(state,action)=>{
            state.user =action.payload,
            localStorage.setItem('userInfo',JSON.stringify(action.payload))
        },
        logout:(state)=>{
            state.user = null,
            localStorage.removeItem('userInfo')
        },
        setOpenSidebar:(state,action)=>{
            state.isSidebarOpen=action.payload
        },
        setSearchValue:(state,action)=>{
            state.searchvalue=action.payload
        },
        setStartDate:(state,action)=>{
            state.startDate=action.payload
        },
        setEndDate:(state,action)=>{
            state.endDate=action.payload
        },
}
})
export const {setCredentials,logout,setOpenSidebar,setSearchValue, setStartDate,setEndDate} = authSlice.actions
export default authSlice.reducer