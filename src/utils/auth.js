
import {toast} from "react-toastify"
import jwtDecode from "jwt-decode"
import axios from "./http"
export const login = async (values,setIsLoading)=>{
    setIsLoading(true)
    try {
        const {data} = await axios.post("/login",values)
        localStorage.setItem("token",data)
        window.location = "/"
    } catch ({response}) {
        setIsLoading(false)
        if(response.status === 400) return toast.error(response.data)
        
        toast.error("Unexpected error")
    }
}


export const getCurrentUser = ()=>{
  const token = localStorage.getItem("token")
  if(!token) return false
  try {
      const user = jwtDecode(token)
      return user
  } catch (error) {
      return false
  }
}

export const logout = ()=>{
    localStorage.removeItem("token")
    window.location="/"
}