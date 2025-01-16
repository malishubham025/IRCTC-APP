import React from "react";
import Nav from "./Nav";
import axios from "axios";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
function Signup(){
    const navigate = useNavigate();
    const [form,setForm]=React.useState({
        email:"",
        password:""
    })
    function handleGoogle(event){
        axios.post("http://localhost:3001/signup-google").then((res)=>{
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
            axios.post("http://localhost:3001/signup",form).then((res)=>{
                
                if(res.status===200){
                    let token=res.data.token;
                    alert("Signup Successfull !");
                    Cookies.set('id', token);
                    navigate("/");
                }
                else{
                    console.log("error !");
                }
            }).catch((err)=>{
                console.log(err);
                if(err.status===404){
                    alert("Email Exist");
                }
                else if(err.status===500){
                    alert("Server error occured !");
                }
                // console.log("Email  exist !",err);
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
            <h1>Signup for free</h1>
            <form id="login-form" method="post" onSubmit={handleLogin}>
                <div class="form-group">
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" onChange={handleChange} required/>
                </div>
                <div class="form-group">
                    <label for="password">Password:</label>
                    <input type="password" id="password" onChange={handleChange} name="password" required/>
                </div>
                <div class="form-group">
                    <button type="submit">Signup</button>
                </div>
            </form>
            <button className="google-signin" onClick={handleGoogle}><img width="28" height="28" src="https://img.icons8.com/color/48/google-logo.png" alt="google-logo"/> SignUp with Google </button>
            <p class="signup-link">Already have an account? <a href="/login">Login</a></p>
        </section>
    

        <footer>
            <p>&copy; 2023 BusBooker. All rights reserved.</p>
        </footer>
        </div>
    )
}
export default Signup;