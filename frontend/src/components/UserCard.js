import React, { useState } from 'react'
import './UserCard.css'

export default function UserCard(props) {
    const user = props.user;

    // this selects the card that the program user clicks
    function handleClick(e) {
        // this handles cases where the user clicks on a an element inside the div
        let targetElement;
        e.target.tagName === "SPAN" ? targetElement = e.target.parentElement : targetElement = e.target;

        // deselect element if it's already clicked, otherwise select it 
        if (props.selectedUser === user._id) props.selectFunc(undefined);
        else props.selectFunc(targetElement.id);
    }

    return (
        <div className={props.selectedUser === user._id ? 'user-card user-selected' : 'user-card'} id={user._id} onClick={handleClick}>
            <span className='user-card-name'>{user.firstName + " " + user.lastName}</span>
            <span className='user-card-email'>{user.email}</span>
            <span className='user-card-age'>{user.age}</span>
        </div>
    )
}
