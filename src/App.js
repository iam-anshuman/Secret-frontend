import HomePage from './Components/HomePage';
import SignUp from './Components/SignUp';
import LogIn from './Components/LogIn';
import Error from './Components/Error';
import ForgetPassword from './Components/ForgetPassword';
import {BrowserRouter as Router, Routes, Route,Navigate} from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';


export default function App() {
  const { user } = useAuthContext();
  return (
      <Router>
        <Routes >
          <Route path='/' element={user ? <HomePage/> : <Navigate to="/login" /> } />
          <Route path='/signup' element={!user ? <SignUp/> : <Navigate to={"/"}/> }  />
          <Route path='/login' element={!user ? <LogIn/> : <Navigate to={"/"}/> }  />
          <Route path='/forget-password' element={!user ? <ForgetPassword/> : <Navigate to={"/"}/> }  />
          <Route path='*' element={<Error/>} />
        </Routes>
      </Router>
  );
}

