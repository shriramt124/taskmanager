
import './App.css';
import Alltasks from './pages/Alltasks';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ImportantTasks from './pages/ImportantTasks';
import CompletedTasks from './pages/CompletedTasks';
import IncompletedTasks from './pages/IncompletedTasks';
import Signup from './pages/Signup';
import Login from './pages/Login';

function App() {
  return (
    <div className="App bg-gray-900 text-white h-screen p-2 relative">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} >
          <Route index element={<Alltasks />}/>{/* by default we want all tasks so we did it as index */}
          <Route path='/importantTasks' element={<ImportantTasks />} />
          <Route path='/completedTasks' element={<CompletedTasks />} />
          <Route path='/incompletedTasks' element={<IncompletedTasks />} />
          </Route>
          <Route path='/signup'  element={<Signup />} />
          <Route path='/login' element={<Login />}/>

        </Routes>

      </BrowserRouter>


    </div>
  );
}

export default App;
