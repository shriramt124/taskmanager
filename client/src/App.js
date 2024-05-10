
import './App.css';
import Alltasks from './pages/Alltasks';
import Home from './pages/Home';
import { Routes, Route, useNavigate } from "react-router-dom";
import ImportantTasks from './pages/ImportantTasks';
import CompletedTasks from './pages/CompletedTasks';
import IncompletedTasks from './pages/IncompletedTasks';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { authActions } from "./store/auth";
import { useDispatch } from "react-redux";


function App() {
  const navigate = useNavigate();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
const dispatch = useDispatch();
  useEffect(() => {
    if(localStorage.getItem("id") && localStorage.getItem("token")){
      dispatch(authActions.login());
    }
   else if (isLoggedIn === false) {
      navigate("/signup")
    }
  }, []);

  return (
    <div className="App bg-gray-900 text-white h-screen p-2 relative">

      <Routes>
        <Route path='/' element={<Home />} >
          <Route index element={<Alltasks />} />{/* by default we want all tasks so we did it as index */}
          <Route path='/importantTasks' element={<ImportantTasks />} />
          <Route path='/completedTasks' element={<CompletedTasks />} />
          <Route path='/incompletedTasks' element={<IncompletedTasks />} />
        </Route>
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />

      </Routes>




    </div>
  );
}

export default App;
