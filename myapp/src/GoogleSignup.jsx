import React from "react";
import {useGoogleLogin} from "@react-oauth/google";
import axios from "axios";
import Cookies from 'js-cookie';

function GoogleSignup(){
    async function handleLogin(response){
        try{    
            if(response['code']){
            console.log("response is "+response['code']);
            axios.post("http://localhost:3001/signup-google",{code:response['code']}).then((res)=>{
                let token=res.data.token;
                alert("Signup Successfull !");
                Cookies.set('id', token);
            }).catch((err)=>{
                if(err.status===500){
                    alert("something went wrong");
                }
                else if(err.status===409){
                    alert("Email already exists");
                }
                // console.log(err);
            })
            }
        }
        catch(err){
            console.log(err);
        }
    }
    let login=useGoogleLogin({
        onSuccess:handleLogin,
        onError:handleLogin,
        flow:'auth-code'
    })
    return(
        
            <button onClick={login} className="google-signin"> <img width="28" height="28" src="https://img.icons8.com/color/48/google-logo.png" alt="google-logo"/> Signup with Google</button>
        
    )
}
export default GoogleSignup;