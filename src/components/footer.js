import React from 'react'
import "../App.css";
import github from "../github-icon.svg";


export default function Footer(props) {
    return <div className="footer">
        <a href="https://github.com/praaatik/pi-peekaboo">
            <img
                src={github}
                width="30px"
                height="30px"
                className="github-icon"
                alt="github-icon-for-repo"
            />
        </a>
    </div>
}