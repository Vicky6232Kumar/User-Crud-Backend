
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { useState ,useEffect } from "react";
import Navbar from './components/layouts/Navbar';
import Account from "./components/User/Account";
import Login from "./components/User/Login";
import SignUp from "./components/User/SignUp";
import UpdateAccount from "./components/User/UpdateAccount";
import UpdatePassword from "./components/User/UpdatePassword"
import store from './store'
import { loadUser } from "./actions/userAction";
import { useSelector } from "react-redux";
import Alert from "./components/layouts/Alert";
import NotFound from "./components/layouts/NotFound";
import Admin from "./components/User/Admin";

function App() {
  
  const [alert, setAlert] = useState("");
  const { isAuthenticated, user } = useSelector(state => state.users)

  useEffect(() => {

  store.dispatch(loadUser());

  }, [])


  const showAlert = (message) =>{
    setAlert({
      msg:message
    })
    setTimeout(() => {
      setAlert("")
    }, 1500);
  }
  
  return (
    <Router>
        <Navbar showAlert = {showAlert} />
        <Alert alert= {alert}/>
        <Routes>
          {/* <Route exact path="/" element={<Home />} /> */}
          {/* <Route exact path="/events" element={<EventsPage />} /> */}
          <Route exact path="/login" element={<Login showAlert = {showAlert} />}  />
          <Route exact path="/signup" element={<SignUp showAlert = {showAlert} />}/>
          <Route exact path="/notfound" element={<NotFound />} />
          {isAuthenticated  && <Route exact path="/admin" element={<Admin />} />}
          {isAuthenticated && <Route exact path="/account" element={<Account user={user} />} />}
          {isAuthenticated && <Route exact path="/account/update" element={<UpdateAccount showAlert = {showAlert}/>} />}
          {isAuthenticated && <Route exact path="/password/update" element={<UpdatePassword showAlert = {showAlert}/>} />}
          
        </Routes>
      </Router>
  );
}

export default App;
