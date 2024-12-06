import React from "react";
import axios from "axios";
function ViewTrains(){
    React.useEffect(()=>{
        axios.get("/alltrains").then((data)=>{
            
        }).catch((err)=>{
            if(err){
                alert("some error occured !");
            }
        })
    },[]);
}
export default ViewTrains;