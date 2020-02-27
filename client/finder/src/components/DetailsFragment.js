import React from 'react';
import './styles/DetailsFragment.css';
import linkedin from '../resources/linkedin.png'

const DetailsFragment = (props) => {
    return (
        <div className={props.show ? 'df-wrapper show' : 'df-wrapper'}>
            <i id='close' className="material-icons" onClick={() => props.close(false)}>close_circle</i>
            <div className='df-main'>
                <img src={'https://i.pravatar.cc/75'} alt='avatar'/>
                <div className='df-md'>
                    <h3>George Clover</h3>
                    <div className='df-l'>
                        <i className="material-icons close">place</i>
                        <h4>Washington, D.C.</h4>
                    </div>
                </div>
            </div>
            <p>I really want to go get some food but i'm not sure what 
                i should get. Any suggestions ladies and gentleman??
            </p>
            <div className='df-li'>
                <img src={linkedin} alt='linkedin branding'/>
                <h3>View on LinkedIn</h3>
            </div>
        </div>
    );
}

export default DetailsFragment;