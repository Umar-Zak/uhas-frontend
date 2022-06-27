import React, {useState, useEffect} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Swal from 'sweetalert2'
import {useNavigate} from "react-router-dom"
import withReactContent from 'sweetalert2-react-content'
import {getAllStudents, deleteStudent} from "../utils/questionaire"

function Students({setSelectedStudent, setCurrentQuestion, setShowQuesForm, survey, index}) {
    const MySwal = withReactContent(Swal)
    const navigate = useNavigate()
    const [students, setStudents] = useState([])


    useEffect(() => {
        getAllStudents(setStudents)
    }, [])

    const handleStartSurvey = (id) => {
        setSelectedStudent(id)
        setCurrentQuestion(survey[index])
        setShowQuesForm(true)
      }

    return (
        <div className="dashboard">
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow   >
            <TableCell style={{fontSize:"12px"}}>Name of Student</TableCell>
            <TableCell  style={{fontSize:"12px"}} align="left">Status</TableCell>
            <TableCell  style={{fontSize:"12px"}} align="left">Action</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
        {
          students.map(stu => (
            <TableRow
              key={stu._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell align="left">{ stu.name}</TableCell>
                <TableCell align="left">{stu.hasTakenSurvey? "Taken" : "Not Taken"}</TableCell>
                <TableCell align="left">
                 { stu.hasTakenSurvey && <button onClick={() => navigate(`/survey/${stu._id}`)}   style={{background:"green",width:"140px",color:"white",padding:"4px",marginBlock:"10px", fontSize:"15px"}} className="button">View</button>}
                 {!stu.hasTakenSurvey && <button onClick={() =>handleStartSurvey(stu._id)}   style={{background:"green",width:"140px",color:"white",padding:"4px",marginBlock:"10px", fontSize:"15px"}} className="button">Take questionnaire</button>}
                 <button onClick={() => deleteStudent(stu._id)} style={{background:"red",width:"140px",color:"white",padding:"4px",marginBlock:"10px", marginInline:"15px",fontSize:"15px"}} className="button">Delete</button>
                </TableCell>
            </TableRow>
          ))
        }
        </TableBody>
      </Table>
      </div>
    );
}

export default Students;