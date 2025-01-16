import React from "react";
import Nav from "./Nav";
import axios from "axios";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import GoogleLogin from "./GoogleLogin";
import { GoogleOAuthProvider } from "@react-oauth/google";
function Login(){
    const navigate = useNavigate();
    const [form,setForm]=React.useState({
        email:"",
        password:""
    })
    function handleGoogle(event){
        axios.get("http://localhost:3000/login-google").then((res)=>{
            if(res){
                console.log(res);
            }
        }).catch((err)=>{
            console.log(err);
            alert("something went wrong");
        })
        event.preventDefault();
    }
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
                if(err.status===404){
                    alert("User Does not exist !");
                }
                else if(err.status===500){
                    alert("Server error occured !");
                }
                // alert("User does not Exist !");
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
            <GoogleOAuthProvider clientId="617158057506-1uav9kqb9rk9samamteaorv2h9prpjvt.apps.googleusercontent.com">
                <GoogleLogin></GoogleLogin>
            </GoogleOAuthProvider>
            <p class="signup-link">Don't have an account? <a href="/signup">Sign up</a></p>
        </section>
    

        <footer>
            <p>&copy; 2023 BusBooker. All rights reserved.</p>
        </footer>
        </div>
    )
}
export default Login;