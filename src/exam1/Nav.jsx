import React from "react";
import { Link } from "react-router-dom";

function Nav () {
    return (
        <nav className="navi">
            <div className="logo">
                <Link to="/">FRUITING</Link>
            </div>
            <ul className="menu">
                <li><Link to="/Recipe">Recipe</Link></li>
                <li><Link to="/Event">Event</Link></li>
                <li><Link to="/Curation">Curation</Link></li>
                <li><Link to="/Scrap">Scrap</Link></li>
                
            </ul>
        </nav>
    )
}

export default Nav 