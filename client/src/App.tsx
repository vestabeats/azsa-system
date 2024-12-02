import React from 'react'
import Home from './pages/Home'
import {Routes,Route,Navigate,useLocation,Outlet} from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import Students from './pages/Students'
import Messages from './pages/Messages'
import Trash from './pages/Trash'
import History from './pages/History'
import StudentsCard from './components/StudentsCard'
import Login from './pages/Login'
import { useSelector } from 'react-redux'
import MobileSidebar from './components/MobileSiderbar'
import StudentDetails from './components/StudentDetails'
import Transcript from './pages/Transcript'
import Attestation from './pages/Attestation'
import Performance from './pages/Performance'
import StudentPerformance from './components/StudentPerformance'
import AllAttestations from './pages/AllAttestations'
import ChatBox from './components/ChatBox'
import StudentAttache from './pages/StudentAttache'
import ProgramDetails from './components/ProgramDetails'
import Academics from './pages/Academics'
import Help from './components/Help'
import Policy from './components/Policy'
import OpenDocuments from './components/OpenDocuments'
import Disciplinary from './pages/Disciplinary'
import Officials from './pages/Officials'

function Layout (){
  const { user } = useSelector((state: any) => state.auth);
  console.log("user",user)
  const location = useLocation()
  return user ? (
    <div className='w-full h-screen flex flex-col md:flex-row'>
      <div className='w-1/5 h-screen bg-white sticky top-0 hidden md:block'>
        <Sidebar /> 
      </div>

       <MobileSidebar/> 

       <div className='flex-1 z-10 overflow-y-auto'>
        <Navbar /> 
        <div className=''>
        <Outlet/>
       </div>
       
       </div>
       
    </div>
  ):(
    <Navigate to="/home" state={{from: location}} replace/>
  )
}

const App:React.FC = () => {
  return (
    <main className='w-full min-h-screen bg-[#f3f4f6]'>
      <Routes>
      <Route element={<Layout/>}>
      <Route index path='/' element={<Navigate to='/dashboard'/>} />
      <Route path='/dashboard' element={<Dashboard/>} />
      <Route path='/active/:active' element={<Students/>}/>
      <Route path='/inactive/:inactive' element={<Students/>}/>
      <Route path='/messages' element={<Messages/>}/>
      <Route path='/trash' element={<Trash/>}/>
      
      <Route path='/transcript' element={<Transcript/>}/>
      <Route path='/attestations' element={<Attestation/>}/>
      <Route path='/performance' element={<Performance/>}/>
      <Route path='studentdetails/:id' element={<StudentDetails/>}/>
      <Route path='opendocuments/:id' element={<OpenDocuments/>}/>
      <Route path='allattestations' element={<AllAttestations/>}/>
      <Route path='officials' element={<Officials/>}/>
      <Route path='academics' element={<Academics/>}/>
      <Route path='disciplinary' element={<Disciplinary/>}/>
      <Route path='attache' element={<StudentAttache/>}/>
      <Route path='/chatbox/:id' element={<ChatBox/>} />
      <Route path='/programdetails/:program' element={<ProgramDetails/>} />
      <Route path='studentperformance/:userId' element={<StudentPerformance/>}/>
      <Route path="/studentscard/:city/status/:stat" element={<StudentsCard/>}/>

      </Route>
      <Route path='help' element={<Help/>}/>
      <Route path='studentshistory' element={<History/>}/>
      <Route path='policy' element={<Policy/>}/>
      <Route path='/home' element={<Home/>} />
      <Route path='/login' element={<Login/>} />
      </Routes>
    </main>
  )
}

export default App