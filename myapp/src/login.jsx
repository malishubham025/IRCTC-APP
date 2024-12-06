import React from "react";
import Nav from "./Nav";
import axios from "axios";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
function Login(){
    const navigate = useNavigate();
    const [form,setForm]=React.useState({
        email:"",
        password:""
    })
    function handleLogin(event){
        if(form.email && form.password){
            axios.post("http://localhost:3001/login",form).then((res)=>{
                
                if(res.status===200){
                    let token=res.data.token;
                    alert("Login Successfull !");
                    Cookies.set('id', token);
                    navigate("/");
                }
                else{
                    console.log("error !");
                }
            }).catch((err)=>{
                alert("User does not Exist !");
            })
        }
        else{
            alert("Fill All the Fields");
        }
        event.preventDefault();
    }
    function handleChange(event){
        let name=event.target.name;
        let value=event.target.value;
        if(name==="email"){
            setForm((pvalue)=>{
                return{
                    ...pvalue,
                    email:value
                }
            })

        }
        else{
            setForm((pvalue)=>{
                return{
                    ...pvalue,
                    password:value
                }
            }) 
        }

    }
    return(
        <div>
        <Nav></Nav>

    
        <section id="login-container">
            <h1>Login to Your Account</h1>
            <form id="login-form" method="post" onSubmit={handleLogin}>
                <div class="form-group">
                    <label for="email">Email:</label>
                    <input onChange={handleChange} type="email" id="email" name="email" required/>
                </div>
                <div class="form-group">
                    <label for="password">Password:</label>
                    <input onChange={handleChange} type="password" id="password" name="password" required/>
                </div>
                <div class="form-group">
                    <button type="submit">Login</button>
                </div>
            </form>
            <p class="signup-link">Don't have an account? <a href="/signup">Sign up</a></p>
        </section>
    

        <footer>
            <p>&copy; 2023 BusBooker. All rights reserved.</p>
        </footer>
        </div>
    )
}
export default Login;