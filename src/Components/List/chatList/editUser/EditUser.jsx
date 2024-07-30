import React, { useState } from "react";
import "./EditUser.css";
import { useDispatch, useSelector } from "react-redux";
import { changeUser, setUser } from "../../../../Store/userSlice";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db, storage } from "../../../../lib/firebase"; 
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; 
import { toast } from "react-toastify";

function EditUser() {
  const currentUser = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [avatar, setAvatar] = useState({
    file: null,
    url: "",
  });

  const handleAvatar = (e) => {
    if (e.target.files[0]) {
      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get("username");
    let avatarUrl = currentUser.avatar; 

    try {
     
      if (avatar.file) {
        const storageRef = ref(storage, `images/${currentUser.id}/${avatar.file.name}`);
        await uploadBytes(storageRef, avatar.file);
        avatarUrl = await getDownloadURL(storageRef);
      }

  
      const userDocRef = doc(db, "users", currentUser.id);
      await updateDoc(userDocRef, {
        username: username || currentUser.username, 
        avatar: avatarUrl,
      });

      const updatedDocSnap = await getDoc(userDocRef);
      if (updatedDocSnap.exists()) {
        dispatch(setUser(updatedDocSnap.data()));
      }

     toast.success("Profile updated successfully!")
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.")
    }
    setAvatar({ file: null, url: "" });
    dispatch(changeUser())
  };

  return (
    <div className="editUser">
      <form onSubmit={handleSubmit}>
        <h3>Username</h3>
        <input type="text" placeholder={currentUser.username} name="username" />
        <label htmlFor="file">
          <img src={avatar.url || "./avatar.png"} alt="" />
          Upload an image
        </label>
        <input
          type="file"
          id="file"
          style={{ display: "none" }}
          onChange={handleAvatar}
        />
        <button>Edit</button>
        <button type="button" onClick={() => dispatch(changeUser())}>Cancel</button>
      </form>
    </div>
  );
}

export default EditUser;
