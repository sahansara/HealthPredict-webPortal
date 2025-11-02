import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/admin/Dashborad' 
import DoctorManagement from './pages/admin/DoctorManagement';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>} />

        <Route path="/admin/dashboard" element={<Dashboard/>} /> 
        <Route path="/admin/doctors" element={<DoctorManagement />} />
        {/* <Route path="/admin/doctor/:id" element={<DoctorDetailsPage />} />  */}
        
        


        {/* <Route path="/doctor/dashboard" element={<DoctorDashboard />} /> */}
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;