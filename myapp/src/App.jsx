import React from "react";
// import ReactDom from "react-dom";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Landing from "./Landing";
import Login from "./login";
import Signup from "./signup";
import Cookies from 'js-cookie';
import LoginAdmin from "./LoginAdmin";
import AdminPage from "./AdminPage";
// function Child({child}){
//     if(Cookies.get(id)){
//         return child;
//     }
    
// }
function App(){
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Landing/>}></Route>
                <Route path='/login' element={<Login/>}></Route>
                <Route path='/signup' element={<Signup/>}></Route>
                <Route path='/admin' element={<LoginAdmin/>}></Route>
                <Route path='/adminpage' element={<AdminPage/>}></Route>
            </Routes>
        </Router>

    )
}
export default App;