import React from 'react';
import {MdCancel} from "react-icons/md"
import Loader from './Loader';
import {uploadFile} from "../utils/questionaire"
function AddZipForm({setFile, file, isLoading, setIsLoading, setShowFileForm}) {
    return (
      <div className="modal">
        <div className="login-container register-container">
                 <div className="cancel-container">
                    <MdCancel onClick={()=>setShowFileForm(false)} style={{cursor:"pointer"}} size={25} color='black'/>
                 </div>
                 <input accept='.xlsx' onChange={({target})=>setFile(target.files[0])}  name="file" type="file" placeholder=" " className="login-field" />
                 { !isLoading &&  <button disabled={!file}  onClick={()=>uploadFile(file,setIsLoading,setShowFileForm)}  className="button button__primary button__full">Upload</button>}
                 { isLoading &&  <Loader/>
                 }
                </div>
                
      </div>
    );
}

export default AddZipForm;