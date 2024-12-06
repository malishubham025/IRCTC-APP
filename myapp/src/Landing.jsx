import React from "react";
import Nav from "./Nav";
function Landing(){
    return(
        <div>
            <Nav></Nav>

            <section id="hero">
                <h1>Your Journey Starts Here</h1>
                <p>Book your bus tickets with ease and comfort</p>
                <form id="search-form">
                    <input type="text" id="from" placeholder="From" required/>
                    <input type="text" id="to" placeholder="To" required/>
                    <input type="date" id="date" required/>
                    <button type="submit">Search Buses</button>
                </form>
            </section>
            <section id="popular-routes">
            <h2>Popular Routes</h2>
            <div class="route-cards">
                <div class="route-card">
                    <h3>New York to Washington D.C.</h3>
                    <p>Starting from $30</p>
                    <button>Book Now</button>
                </div>
                <div class="route-card">
                    <h3>Los Angeles to San Francisco</h3>
                    <p>Starting from $45</p>
                    <button>Book Now</button>
                </div>
                <div class="route-card">
                    <h3>Chicago to Detroit</h3>
                    <p>Starting from $25</p>
                    <button>Book Now</button>
                </div>
            </div>
        </section>
        </div>
    )
}
export default Landing;