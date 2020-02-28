import React from 'react';
import './styles/DetailsFragment.css';
import linkedin from '../resources/linkedin.png';
import { graphql } from 'react-apollo';
import {getFriendDetailsQuery} from '../queries';

const DetailsFragment = (props) => {
    const data = props.data.friendDetails || null;
    
    return data ?
    (
        <div className={props.show ? 'df-wrapper show' : 'df-wrapper'}>
            <i id='close' className="material-icons" onClick={() => props.close(false)}>close_circle</i>
            <div className='df-main'>
                <img src={'https://i.pravatar.cc/75'} alt='avatar'/>
                <div className='df-md'>
                    <h3>{data.name}</h3>
                    <div className='df-l'>
                        <i className="material-icons close">place</i>
                        <h4>{data.city}, {data.state}</h4>
                    </div>
                </div>
            </div>
            <p>{data.notes}</p>
            <div className='df-li'>
                <img src={linkedin} alt='linkedin branding'/>
                <h3>View on LinkedIn</h3>
            </div>
        </div>
    ) : null
}

export default graphql(getFriendDetailsQuery,{
    options: props => {
        return {
            variables: {
                id: props.chosenFriend
            }
        }
    }
})(DetailsFragment);