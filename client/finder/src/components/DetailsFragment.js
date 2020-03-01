import React from 'react';
import './styles/DetailsFragment.css';
import linkedin from '../resources/images/linkedin.png';
import { graphql } from 'react-apollo';
import {getFriendDetailsQuery} from '../queries';
import { DotLoader } from 'react-spinners';
import avi from '../resources/images/defaultAvi.png'

const DetailsFragment = (props) => {
    const {friendDetails,loading} = props.data
    
    return(
        <div className={props.show ? 'df-wrapper show' : 'df-wrapper'}>
            <i id='close' className="material-icons" onClick={() => props.close(false)}>close_circle</i>
            {
                !loading && friendDetails ? 
                    <>
                        <div className='df-main'>
                            <img src={avi} alt='avatar'/>
                            <div className='df-md'>
                                <h3>{friendDetails.name}</h3>
                                <div className='df-l'>
                                    <i className="material-icons close">place</i>
                                    <h4>{friendDetails.city}, {friendDetails.state}</h4>
                                </div>
                            </div>
                        </div>
                        <p>{friendDetails.notes}</p>
                        <div className='df-li'>
                            <img src={linkedin} alt='linkedin branding'/>
                            <h3>View on LinkedIn</h3>
                        </div>
                    </>
                : (
                    <div style={{width:'100%',height:'100%',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                        <DotLoader
                            css=""
                            size={50}
                            color={"#F95738"}
                            loading={true}
                        />
                    </div> 
                )
            }
        </div>
    );
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