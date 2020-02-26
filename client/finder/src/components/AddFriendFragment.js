import React from 'react';
import './styles/AddFriendFragment.css'

const AddFriendFragment = (props) => {
    return (
        <div className={props.show ? 'aff-wrapper show' : 'aff-wrapper'}></div>
    );
}

export default AddFriendFragment;