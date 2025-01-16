import React from "react";
import {useGoogleLogin} from "@react-oauth/google";
import axios from "axios";

function GoogleLogin(){
    async function handleLogin(response){
        try{    
            if(response['code']){
            console.log("response is "+response['code']);
            axios.post("http://localhost:3001/login-google",{code:response['code']}).then((res)=>{
                console.log(res);
            }).catch((err)=>{
                console.log(err);
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
        
            <button onClick={login} className="google-signin"> <img width="28" height="28" src="https://img.icons8.com/color/48/google-logo.png" alt="google-logo"/> Login with Google</button>
        
    )
}
export default GoogleLogin;