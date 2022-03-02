import React from 'react'
import {BsFacebook} from "react-icons/bs"
import {AiOutlineTwitter,AiOutlineInstagram} from "react-icons/ai"
const Footer = () => {
    return ( <footer className="footer">
        <p className="footer__text">Copyright UHAS 2022</p>
        <div className="socials">
            <a href="#" className="social">
                <BsFacebook size={25} color="blue" />
            </a>
            <a href="#" className="social">
                <AiOutlineTwitter size={25} color="skyblue" />
            </a> <a href="#" className="social">
                <AiOutlineInstagram size={25} color="pink" />
            </a>
        </div>
    </footer> );
}
 
export default Footer;