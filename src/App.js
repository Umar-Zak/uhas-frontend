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
import OverView from './Pages/OverView';
import SecondDataCollection from './Pages/SecondDataCollection';
import AnalyticsPage from './Pages/AnalyticsPage';
import SurveyPage from './Pages/SurveyPage';
function App() {
  return (
    <>
    <ToastContainer/>
  <Routes>
   
    <Route path="/questionaire" element={<DataCollectionPage/>} >

    </Route>
    <Route path="/second-questionaire" element={ <SecondDataCollection/>} >

    </Route>
    <Route path="/dashboard" element={<Dashboard/>} >
      
    </Route>
    <Route path="/overview/:id" element={<OverView/>} >
      
    </Route>
    <Route path="/survey/:id" element={<SurveyPage/>} >
      
    </Route>
    <Route path="/" element={<HomePage/>}>
    </Route>
  </Routes></>
  );
}

export default App;
