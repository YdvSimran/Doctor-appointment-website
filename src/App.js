import {BrowserRouter ,Routes,Route} from "react-router-dom";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import {useSelector } from "react-redux";
import Spinner from "./components/spinner";
import ProtectedRoutes from "./components/ProtectedRoutes";
import PublicRoutes from "./components/PublicRoutes";
import ApplyDoctor from "./pages/ApplyDoctor";
import NotificationPages from "./pages/NotificationPages";
import Users from "./pages/admin/Users";
import Doctors from "./pages/admin/Doctors";
import Profile from "./pages/doctor/Profile";
import BookingPages from "./pages/BookingPages";

function App() {
  const {loading} = useSelector(state=> state.alerts);
  return (
  <>
    <BrowserRouter>
    {loading ? (<Spinner />):
    <Routes>
        <Route 
        path="/" 
        element={
          <ProtectedRoutes>
                <Homepage />
          </ProtectedRoutes>
        
        } 
         />
         <Route 
        path="/apply-doctor" 
        element={
          <ProtectedRoutes>
                <ApplyDoctor />
          </ProtectedRoutes>
        
        } 
         />
           <Route 
        path="/admin/users" 
        element={
          <ProtectedRoutes>
                <Users />
          </ProtectedRoutes>
        
        } 
         />
           <Route 
        path="/admin/doctors" 
        element={
          <ProtectedRoutes>
                <Doctors />
          </ProtectedRoutes>
        
        } 
         />
            <Route 
        path="/doctor/profile/:id" 
        element={
          <ProtectedRoutes>
                <Profile />
          </ProtectedRoutes>
        
        } 
         />
              <Route 
        path="/doctor/book-appointment/:doctorId" 
        element={
          <ProtectedRoutes>
                <BookingPages />
          </ProtectedRoutes>
        
        } 
         />
           <Route 
        path="/notification" 
        element={
          <ProtectedRoutes>
                <NotificationPages />
          </ProtectedRoutes>
        
        } 
         />
        <Route path="/login" element={<PublicRoutes>  <Login /> </PublicRoutes> }  />
        <Route path="/register" element={ <PublicRoutes> <Register />  </PublicRoutes>  }  />
      </Routes>

    }
    </BrowserRouter>
  </>
  );
}

export default App;
