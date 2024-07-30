import React, { useState } from "react";
import "./UserInfo.css";
import { useSelector, useDispatch } from "react-redux";
import { changeUser } from "../../../Store/userSlice";
import { auth } from "../../../lib/firebase";

function UserInfo() {
  const [showMore, setShowMore] = useState(false);
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.user);

  return (
    <div className="userInfo">
      <div className="user">
        <img src={currentUser?.avatar || "./avatar.png"} alt="" />
        <h2>{currentUser?.username}</h2>
      </div>
      <div className="icons">
        <img
          src="./more.png"
          alt=""
          onClick={() => setShowMore((prev) => !prev)}
        />
        <img src="./edit.png" alt="" onClick={() => dispatch(changeUser())} />
      </div>
      {showMore && (
        <div className="logout">
          <button
            onClick={() => {
              auth.signOut();
            }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default UserInfo;
