import React from 'react';
import './Testimonial.scss'

export const Testimonial = ({title, img, text}) => {
    return (
        <div className="testimonial-box">
            <img src={img} alt=" " />
            <h3>Testimonio</h3>
            <p>Tfasf fasfmof mfalsm fsalmf falsmfaso famslfaso amslfmas flmasf slfsa fasf</p>
        </div>
    )
}
