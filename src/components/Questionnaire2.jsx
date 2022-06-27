import React, {useState, useEffect} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {getSecondQuestionnaire} from "../utils/questionaire"



function Questionnaire2(props) {

    let [secondQuestionnaire,setSecondQuestionaire] = useState([])

    useEffect(() => {
        getSecondQuestionnaire(setSecondQuestionaire)
    }, [])

    return (
        <div className="dashboard">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow   >
          <TableCell style={{fontSize:"12px"}}>Name of Researcher</TableCell>
          <TableCell  style={{fontSize:"12px"}} align="left">District</TableCell>
          <TableCell  style={{fontSize:"12px"}} align="left">Sub-District</TableCell>
          <TableCell  style={{fontSize:"12px"}} align="left">Town</TableCell>
          <TableCell  style={{fontSize:"12px"}} align="left">Description</TableCell>
          <TableCell  style={{fontSize:"12px"}} align="left">Institution</TableCell>
          <TableCell  style={{fontSize:"12px"}} align="left">Institution Type</TableCell>
          <TableCell  style={{fontSize:"12px"}} align="left">Institution Level</TableCell>
          <TableCell  style={{fontSize:"12px"}} align="left">Latitude</TableCell>
          <TableCell  style={{fontSize:"12px"}} align="left">Longitude</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {secondQuestionnaire.map((row) => (
          <TableRow
            key={row._id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            {row.data?.map(d=>(
              <TableCell align="left">{ d.answer}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </div>
    );
}

export default Questionnaire2;