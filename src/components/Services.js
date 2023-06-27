import React from 'react';
import "../styles/Services.css"
//import {IoColorWandOutline} from "react-icons/io5"
//import {BiCodeAlt} from "react-icons/bi"
import { motion } from "framer-motion";
import resumeData from '../data/ResumeData';

const Services = () => {

   const fade = {
    opacity: 1,
    transition:{
        duration: 1.4
    }
   }

  return (
      <>
          <div className="services" id='services'>
              <div className="container">
                <motion.div whileInView={fade} viewport={{ once: true }} initial={{opacity: 0}} className="heading">
                    <p className="heading-sub-text">What I can do</p>
                    <p className='heading-text'>Services</p>
                </motion.div>
                
                <motion.div className="services-box" whileInView={fade} initial={{opacity: 0}}>
                    
                {resumeData.services.map((S, index) => (
                    <div className="services-card" key={index}>
                        <S.className className='services-icon' />
                        <p className='services-title'>{S.title}</p>
                        <p className='services-desc'>{S.description}</p>
                    </div>
                    ))}
                </motion.div>
              </div>
          </div>
      </>
  )
};

export default Services;
