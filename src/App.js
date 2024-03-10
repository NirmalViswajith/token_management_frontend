import 'bootstrap/dist/css/bootstrap.min.css';
import SignupPage from './Components/Pages/Authentication/Signup';
import Login from './Components/Pages/Authentication/Login';
import { Navigate, Route, Routes } from 'react-router-dom';
import Token from './Components/Pages/Token/Token';
import Navbar2 from './Components/Pages/Navbar';
import DashBoard from './Components/Pages/Dashboard/Dashboard';
import Admin_panel from './Components/Pages/Admin_panel/AdminPanel';
import UpdateToken from './Components/Pages/Token/UpdateToken';
import EditMailComponent from './Components/Pages/Admin_panel/EditMailComponent';

function App() {
  return (
    <div>
      <Navbar2 />
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signUp' element={<SignupPage />} />
        <Route path='/tokenPage' element={<Token />} />
        <Route path='/dashboard' element={<DashBoard />} />
        <Route path='/admin_panel' element={<Admin_panel />} />
        <Route path='/tokenPage/:id' element={<UpdateToken />} />
        <Route path='/editMailBox/:id' element={<EditMailComponent />} />
      </Routes>
      
    </div>
  );
}

export default App;
