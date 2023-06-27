import React from 'react';
import { Link } from 'react-router-dom';
import { FaLinkedin, FaTwitter, FaWhatsapp} from "react-icons/fa"
import {BiEnvelope} from "react-icons/bi"
import {BsGithub} from "react-icons/bs"
import resumeData from '../../data/ResumeData';

const NavLinks = ({handleNav}) => {
  return (
    <ul className='nav-links'>
        <li onClick={handleNav} ><Link  to={`//www.linkedin.com/in/${resumeData.linkedinId}`} target='_blank' className='nav-link'><FaLinkedin /></Link></li>
        <li onClick={handleNav} ><Link  to={`//github.com/${resumeData.gitId}`} target='_blank' className='nav-link'><BsGithub /></Link></li>
        <li onClick={handleNav} ><Link  to={`//twitter.com/${resumeData.twitterId}`} target='_blank' className='nav-link'><FaTwitter /></Link></li>
        <li onClick={handleNav} ><Link  to={`//wa.me/${resumeData.phone}`} target='_blank' className='nav-link'><FaWhatsapp /></Link></li>
        <li onClick={handleNav} ><a href={`mailto:${resumeData.mail}`} target="_blank" className="nav-link"><BiEnvelope /></a></li>

  </ul>
  )
};

export default NavLinks;
