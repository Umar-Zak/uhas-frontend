import { ToastContainer} from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import HomePage from './Pages/HomePage';
import DataCollectionPage from './Pages/DataCollectionPage';
import {
  Routes,
  Route,
} from "react-router-dom";
import Dashboard from './Pages/DashBoard';
function App() {
  return (
    <>
    <ToastContainer/>
  <Routes>
   
    <Route path="/questionaire" element={<DataCollectionPage/>} >

    </Route>
    <Route path="/dashboard" element={<Dashboard/>} >
      
    </Route>
    <Route path="/" element={<HomePage/>}>
    </Route>
  </Routes></>
  );
}

export default App;
