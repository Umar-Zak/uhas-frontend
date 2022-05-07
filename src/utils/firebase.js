import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes,getDownloadURL } from "firebase/storage";
import {toast} from "react-toastify"
import http from "./http"


const firebaseConfig = {
    apiKey: "AIzaSyAbWbhcnzQMi52DcKvQzl-QCAmXPOcy3go",
    authDomain: "uhas-d9f8d.firebaseapp.com",
    projectId: "uhas-d9f8d",
    storageBucket: "uhas-d9f8d.appspot.com",
    messagingSenderId: "868034841548",
    appId: "1:868034841548:web:ddc28c2076a222a42c2b69",
    measurementId: "G-6LM0NC3LE8"
  };
  
   
  const app = initializeApp(firebaseConfig);

const storage = getStorage();


export const uploadPaper = async(body,setLoading)=>{
    setLoading(true)
    const jwt = localStorage.getItem("token")
    const storageRef = ref(storage, body.file.name);

    uploadBytes(storageRef, body.file).then((snapshot) => {
        getDownloadURL(ref(storage, body.file.name)).then(async url=>{
            try {
                http.setJwt(jwt)
                await http.post("/paper",{heading:body.heading,file:url,type:body.type, author:body.author})
                window.location = "/dashboard"
            } catch ({response}) {
                setLoading(false)
                if(response.status < 500) return toast.error(response.data)

                toast.error("Unexpected error! Try again")
            }
        })
    });
}


export const uploadZip= async(body,setLoading)=>{
    setLoading(true)
    const jwt = localStorage.getItem("token")
    const storageRef = ref(storage, body.file.name);

    uploadBytes(storageRef, body.file).then((snapshot) => {
        getDownloadURL(ref(storage, body.file.name)).then(async url=>{
            try {
                http.setJwt(jwt)
                await http.post("/zip",{file:url})
                window.location = "/dashboard"
            } catch ({response}) {
                setLoading(false)
                if(response.status < 500) return toast.error(response.data)

                toast.error("Unexpected error! Try again")
            }
        })
    });
}