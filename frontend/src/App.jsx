import { BrowserRouter, Route,Routes } from 'react-router-dom';

import Master from './Layout/student/Master';
import Adminmaster from './Layout/Admin/Adminmaster';



import About from './pages/Student/About';
import Feature from './pages/Student/Feature';
import Services from './pages/Student/Services';
import Department from './pages/Student/Department';
import Year from './pages/Student/Year';
import Term from './pages/Student/Term';
import Subject from './pages/Student/Subject';
import Exam from './pages/Student/Exam';
import Login from './pages/Login';
import DashBoard from './pages/AdminSide/DashBoard';
import StudentTable from './pages/AdminSide/StudentManage';
import EnquiryManage from './pages/AdminSide/EnquiryManage';
import UploadPaper from './pages/AdminSide/UploadPaper';
import ChatBoat from './pages/Student/ChatBot';
import Library from './pages/Student/Library';
import UploadBook from './pages/AdminSide/UploadBook';
import AddBook from './pages/AdminSide/AddBook';
import Library1 from './pages/Student/Library1';





function App() {
  return (
   <BrowserRouter>
      <Routes>
            <Route path='/Login' element={<Login/>}/>
          <Route path='/' element={<Master/>}>
            <Route path='/' element={<About/>}/>
            <Route path='/feature' element={<Feature/>}/>
            <Route path='/services' element={<Services/>}/>
            <Route path='/Department' element={<Department/>}/>
            <Route path='/Year/:id' element={<Year/>}/>
            <Route path='/Term/:id' element={<Term/>}/>
            <Route path='/Subject/:id' element={<Subject/>}/>
            <Route path='/Exam/:id' element={<Exam/>}/>
            <Route path='/ChatBoat' element={<ChatBoat/>}/>
            <Route path='/Library/:id' element={<Library/>}/>
            <Route path='/Library1' element={<Library1/>}/>



          </Route>
          <Route path='admin' element={<Adminmaster/>}>

            <Route path='DashBoard' element={<DashBoard/>}/>
            <Route path='studentTable' element={<StudentTable/>}/>
            <Route path='EnquiryManage' element={<EnquiryManage/>}/>
            <Route path='UploadPaper' element={<UploadPaper/>}/>
            <Route path='UploadBook' element={<UploadBook/>}/>
            <Route path='AddBook' element={<AddBook/>}/>

          </Route>
          

      </Routes>
   </BrowserRouter>
  )
}

export default App;
