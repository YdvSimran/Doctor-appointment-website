import {BrowserRouter ,Routes,Route} from "react-router-dom";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import {useSelector } from "react-redux";
import Spinner from "./components/spinner";
import ProtectedRoutes from "./components/ProtectedRoutes";
import PublicRoutes from "./components/PublicRoutes";

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
        <Route path="/login" element={<PublicRoutes>  <Login /> </PublicRoutes> }  />
        <Route path="/register" element={ <PublicRoutes> <Register />  </PublicRoutes>  }  />
      </Routes>

    }
    </BrowserRouter>
  </>
  );
}

export default App;
