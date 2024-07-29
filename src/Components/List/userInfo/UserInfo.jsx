import React from 'react'
import './UserInfo.css'
import { useSelector } from 'react-redux'
function UserInfo() {

const currentUser =useSelector(state => state.user.user)

  return (
    <div className='userInfo'>
        <div className="user">
            <img src={currentUser.avatar || "./avatar.png"} alt="" />
            <h2>{currentUser.username}</h2>
        </div>
            <div className="icons">
                <img src="./more.png" alt="" />
                <img src="./video.png" alt="" />
                <img src="./edit.png" alt="" />
            </div>
    </div>
  )
}

export default UserInfo