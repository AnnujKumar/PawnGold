import React,{useState} from 'react'
import { CRow, CCol, CButton, CNavItem, CNavLink, CFormInput } from '@coreui/react'
import {NavLink,useNavigate} from 'react-router-dom'
import axios from "axios"
 const  LoginPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const handleSubmit = async()=>{
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/admin/super-admin/login`,{email,password})

        if(response.status===200){
            localStorage.setItem("token",response.data.token)
            navigate("/home")
        }
        else{
            console.log(response);
        }
    }
  return (
    <>
      <div className="d-flex justify-center h-100vh align-center">
        <CRow>
            <CCol>
                <CFormInput type="text" placeholder="Username" className="mb-2" onChange={(evt)=>setEmail(evt.target.value)} />
                <CFormInput type="password" placeholder="Password" className="mb-2" onChange={(evt)=>setPassword(evt.target.value)}/>
                    <CButton color="primary" className="w-full" onClick={handleSubmit}>Login</CButton>
                </CCol>
        </CRow>
      </div>
    </>
  )
}
export default LoginPage