import React, {useState, useEffect} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {getZips, toggleDataStatus} from "../utils/questionaire"


function Zips(props) {
    const [zips,setZips] = useState([])
    const [searchDataSet, setSearchDataSet] = useState("")

    useEffect(() => {
        getZips(setZips)
    }, [])

    const handleToggleDataStatus = async id => {
        await toggleDataStatus(id)
        getZips(setZips)
      }

    const filteredZips = zips.filter(zip => zip.name.toLowerCase().startsWith(searchDataSet.toLowerCase()))
    return (
        <div className="dashboard">
        <div style={{width: "35%", marginBottom: "40px"}}>
        <input onChange={({target:{value}}) => setSearchDataSet(value)} placeholder='Search through datasets' type="text" className="login-field" />
        </div>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>File Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell align="left">Upload Date</TableCell>
            <TableCell align="left">Download</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredZips.map((row) => (
            <TableRow
              key={row._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="left">{row.name}</TableCell>
              <TableCell align="left">{row.description}</TableCell>
              <TableCell align="left">{row.day_posted.toString().substr(0,10)}</TableCell>
              <TableCell align="left"><a href={`${row.file}`}  style={{background:"green",width:"100px",color:"white",padding:"4px",display:"inline-block"}} className="button">Download</a> </TableCell>
              <TableCell align="left"><button onClick={() => handleToggleDataStatus (row._id)}  style={{background:"gray",width:"100px",color:"white",padding:"4px",display:"inline-block"}} className="button">{row.isApproved ? "Unapprove" : "Approve"}</button> </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </div>
    );
}

export default Zips;