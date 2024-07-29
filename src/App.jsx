import React, { useEffect } from "react";
import List from "./Components/List/List";
import Chat from "./Components/Chat/Chat";
import Detail from "./Components/Detail/Detail";
import Login from "./Components/Login/Login";
import Notification from "./Components/Notification/Notification";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserInfo } from "./Store/userSlice";

const App = () => {
  const {cuurentUser,isLoading} = useSelector((state) => state.user);
 
  const chatId = useSelector((state) => state.chat.chatId);
  
  const dispatch = useDispatch();

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      dispatch(fetchUserInfo(user?.uid));
    });

    return () => {
      unSub();
    };
  }, [dispatch]);

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="container">
      {cuurentUser ? (
        <>
          <List />
          {chatId && <Chat />}
          {/* {chatId && <Detail />} */}
        </>
      ) : (
        <Login />
      )}
      <Notification />
    </div>
  );
};

export default App;
