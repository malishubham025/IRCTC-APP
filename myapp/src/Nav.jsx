import React from "react";
function Nav(){
    return(
        <header>
        <nav>
            <div class="logo">BusBooker</div>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="#routes">Routes</a></li>
                <li><a href="/admin">Admin</a></li>
                <li><a href="#contact">Contact</a></li>
                <li><a href="/login">Login</a></li>
            </ul>
        </nav>
        </header>
    )
}
export default Nav;