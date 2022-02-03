import http from "./http"
import {toast} from "react-toastify"
 


export const postQuestionnaire = async( values,setIsLoading)=>{
    setIsLoading(true)
    const jwt = localStorage.getItem("token")
    try {
        http.setJwt(jwt)
        const {data} = await http.post("/questions",values)
        toast.info("Data Submitted successfully")
        window.location= "/questionaire"
    } catch ({response}) {
        setIsLoading(false)
        if(response.status < 500)return toast.error(response.data)

        toast.error("Unexpected error! Try again")
    }

}


export const getQuestionnaire = async (setQuestionnaire)=>{
    const jwt = localStorage.getItem("token")
    try {
        http.setJwt(jwt)
        const {data} = await http.get("/questions")
        setQuestionnaire(data)
    } catch ({response}) {
        if(response.status < 500) return toast.error(response.data)

        toast.error("Unexpected error! Try again")
    }
}