import React, {useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {getQuestionnaire, deleteQuestionnaire, getRequests} from "../utils/questionaire"
import {getAllUsers, getCurrentUser, priv, makeGuest, deleteUser} from "../utils/auth"


function OverView({setActive, active}) {
    const MySwal = withReactContent(Swal)
    const navigate = useNavigate()
    const [searchTip,setSearchTip] = useState("id")
    let [questionnaire,setQuestionaire] = useState([])
   
    const [search,setSearch] = useState("")
    let [users,setUsers] = useState([])
    const [searchUser,setSearchUser] = useState("")
    const [requests,setRequests] = useState([])

   useEffect(() => {
    getQuestionnaire(setQuestionaire)
    getAllUsers(setUsers)
    getRequests(setRequests)
   }, [])
   
   
   const handleSearch = text =>{
        setSearch(text)
    }

    const goOverView = id => {
        navigate(`/overview/${id}`)
    }

    const handleSearchUser = text =>{
        setSearchUser(text)
    }


    const handleDeleteQuestinnaire = async(event, id) => {
        event.stopPropagation()
        MySwal.fire({
          title: 'Do you want to delete this Questinnaire? Action is not reversible',
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: 'Delete',
          denyButtonText: `Quit`,
        }).then(async (result) => {
          if (result.isConfirmed) {
            await deleteQuestionnaire(id)
            getQuestionnaire(setQuestionaire)
          } else if (result.isDenied) {
            Swal.fire('Alright got it', '', 'info')
          }
        })
    
        
       }


       const handleDelete = id =>{
        MySwal.fire({
            title: 'Do you want to delete this user?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Delete',
            denyButtonText: `Quit`,
          }).then(async (result) => {
            if (result.isConfirmed) {
                await deleteUser(id)
                getAllUsers(setUsers)
            } else if (result.isDenied) {
              Swal.fire('Alright got it', '', 'info')
            }
          })
       }


    switch (searchTip){
      
        case "year":{
          questionnaire = questionnaire.
          filter(ques=> new Date(ques.collected_on).getFullYear()?.toString().startsWith(search))
          break
        }
  
        case "month":{
          questionnaire = questionnaire.
          filter(ques=> (new Date(ques.collected_on)
          .getUTCMonth()+1).toString().startsWith(search) && 
          new Date(ques.collected_on).getFullYear()=== new Date().getFullYear())
          break
        }
        case "date":{
          questionnaire = questionnaire.
          filter(ques=> ques.collected_on.toString().startsWith(search))
         break
        }
        default:{
         if(search){
          questionnaire = questionnaire.
          filter(ques => search && ques.womanId.toLowerCase() === search.toLowerCase())
         }
         else {
          questionnaire = questionnaire.
          filter(ques => ques.womanId.toLowerCase().startsWith(search.toLowerCase()))
         }
        }
      }
    
      users = users.filter(user=>user.username.toLowerCase().startsWith(searchUser.toLowerCase()))

    return (
        <div className="dashboard">
       
   
        <div className="counter-grid">
            <div onClick={()=>setActive("users")} className={`${active === "users"? "counter  active-counter":"counter"}`}>
                <h3 className="counter__title">Total Users</h3>
                <p className="counter__text">{users.length}</p>
            </div>
           
            <div onClick={()=>setActive("requests")} className={`${active === "requests"? "counter counter--blue active-counter":"counter counter--blue"}`}>
                <h3 className="counter__title">Data Requests</h3>
                <p className="counter__text"> {requests.length}</p>
            </div>
        </div>
     {
         active === "data" &&
         <div className="data">
         <div className="data-search">
              <h2 className="data-overview">Data Overview</h2>
             <div className="search-by">
               <button onClick={()=>setSearchTip("id")} className={`${searchTip === "id"? "search-tip active-tip":"search-tip"}`}>ID</button>
               <button onClick={()=>setSearchTip("year")} className={`${searchTip === "year"? "search-tip active-tip":"search-tip"}`}>Year</button>
               <button onClick={()=>setSearchTip("month")} className={`${searchTip === "month"? "search-tip active-tip":"search-tip"}`}>Month</button>
               <button onClick={()=>setSearchTip("date")} className={`${searchTip === "date"? "search-tip active-tip":"search-tip"}`}>Date</button>
             <input onChange={({target})=>handleSearch(target.value)} placeholder="Search by ID or date" type="text" className="search-input" />
             </div>
          </div>
          <table className="table table-responsive table-hover">
              <thead>
                  <tr className='t__head'>
                      <th scope="col">Woman ID</th>
                      <th scope="col">Date</th>
                      <th scope="col">Officer</th>
                      <th scope="col">Manage</th>
                  </tr>
              </thead>
              <tbody>
                 {questionnaire.map(({womanId,officer,collected_on,_id})=>(
                      <tr onClick={()=>goOverView(_id)} className='t__row' style={{cursor:"pointer"}} key={collected_on}>
                      <td>{womanId}</td>
                      <td>{collected_on.toString().substr(0,10)}</td>
                      <td>{officer.name}</td>
                      <td>  {getCurrentUser().isAdmin && <td>  <button onClick={(event)=>handleDeleteQuestinnaire(event, _id)}  style={{background:"red",width:"100px",color:"white",padding:"4px",marginBlock:"10px", fontSize:"15px"}} className="button">Delete</button></td>}</td>
                  </tr>
                 ))}
              </tbody>
          </table>
         </div>
     }


{
         active === "users" &&
         <div className="data">
         <div className="data-search">
              <h2 className="data-overview">Active Users</h2>
              <input onChange={({target})=>handleSearchUser(target.value)} placeholder="Search data" type="text" className="search-input" />
          </div>
          <table className="table table-hover">
              <thead>
                  <tr className='t__head'>
                      <th  scope="col">Username</th>
                      <th scope="col">Email</th>
                      <th scope="col">Joined On</th>
                      <th scope="col">Privileges</th>
                      <th scope="col">Manage</th>
                  </tr>
              </thead>
              <tbody>
                 {users.map(({username,email,created_at,_id,isAdmin, isGuest})=>(
                      <tr className='t__row' key={created_at}>
                      <td>{username}</td>
                      <td>{email}</td>
                      <td>{created_at.toString().substr(0,15)}</td>
                      {getCurrentUser().isAdmin && <td>
                        <button onClick={()=> priv(_id,getAllUsers,setUsers)}  style={{background:"green",width:"100px",color:"white",padding:"4px",marginBlock:"10px"}} className="button">{isAdmin ? "Revoke":"Add"}</button>
                       {!isGuest && <button onClick={()=> makeGuest(_id,getAllUsers,setUsers)} style={{background:"gray",width:"100px",color:"white",padding:"4px",marginBlock:"10px", borderRadius:"7px", marginInline:"5px"}}   >Make guest</button>}
                      </td>
                      }
                     {getCurrentUser().isAdmin && <td>  <button onClick={()=>handleDelete(_id)}  style={{background:"red",width:"100px",color:"white",padding:"4px",marginBlock:"10px"}} className="button">Delete</button></td>}
                  </tr>
                 ))}
              </tbody>
          </table>
         </div>
     }
     {
         active === "requests" &&
         <div className="data">
         <div className="data-search">
              <h2 className="data-overview">Data Requests</h2>
              <input onChange={({target})=>handleSearchUser(target.value)} placeholder="Search data" type="text" className="search-input" />
          </div>
          <table className="table table-hover">
              <thead>
                  <tr className='t__head'>
                      <th  scope="col">Name of Enquirer</th>
                      <th scope="col">Email Address</th>
                      <th scope="col">Phone Number</th>
                      <th scope="col">Description</th>
                      <th scope="col">Reasons</th>
                  </tr>
              </thead>
              <tbody>
                 {requests.map(({ name,email,phone,_id,description,reason})=>(
                      <tr className='t__row' key={_id}>
                      <td>{name}</td>
                      <td>{email}</td>
                      <td>{phone}</td>
                      <td>{description}</td>
                      <td>{reason || "None"}</td>
                  </tr>
                 ))}
              </tbody>
          </table>
         </div>
     }
    </div>
    );
}

export default OverView;