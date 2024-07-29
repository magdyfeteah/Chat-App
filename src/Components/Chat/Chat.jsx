import React, { useEffect, useRef, useState } from "react";
import "./Chat.css";
import EmojiPicker from "emoji-picker-react";
import {
  onSnapshot,
  doc,
  updateDoc,
  arrayUnion,
  getDoc,
} from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useDispatch, useSelector } from "react-redux";
import upload from "../../lib/upload";
import { uiActions } from "../../Store/uiSlice";
function Chat() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [chat, setChat] = useState();
  const [img, setimg] = useState({
    file: null,
    url: "",
  });

  const {chatId , user , isCurrentUserBlocked ,isReceiverBlocked} = useSelector((state) => state.chat);

  const currentUser = useSelector((state) => state.user.user);
  const endRef = useRef(null);
const dispatch = useDispatch()
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
      setChat(res.data());
    });

    return () => {
      unSub();
    };
  }, [chatId]);
  console.log(chat);
  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji);
    setOpen(false);
  };

  const handleImg = (e) => {
    if (e.target.files[0]) {
      setimg({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };
  const handleSend = async () => {
    if (text === "") return;
    let imgUrl = null;

    try {
      if (img.file) {
        imgUrl = await upload(img.file);
      }

      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          senderId: currentUser.id,
          text,
          createdAt: new Date(),
          ...(imgUrl && { img: imgUrl }),
        }),
      });

      const userIDs = [currentUser.id, user.id];
      userIDs.forEach(async (id) => {
        const userChatRef = doc(db, "userChats", id);
        const userChatSnapshot = await getDoc(userChatRef);

        if (userChatSnapshot.exists()) {
          const userChatData = userChatSnapshot.data();

          const chatIndex = userChatData.chats.findIndex(
            (c) => c.chatId === chatId
          );

          userChatData.chats[chatIndex].lastMessage = text;
          userChatData.chats[chatIndex].isSeen =
            id === currentUser.id ? true : false;
          userChatData.chats[chatIndex].updatedAt = Date.now();

          await updateDoc(userChatRef, {
            chats: userChatData.chats,
          });
        }
      });
    } catch (error) {
      console.log(error);
    }

    setimg({
      file: null,
      url: "",
    });
    setText("");
  };
  return (
    <div className="chat">
      <div className="top">
        <div className="user">
          <img src={user?.avatar ||"./avatar.png" } alt="" />
          <div className="texts">
            <span>{user?.username}</span>
            <p>Lorem ipsum, dolor sit amet.</p>
          </div>
        </div>
        <div className="icons">
          <img src="./phone.png" alt="" />
          <img src="./video.png" alt="" />
          <img src="./info.png" alt=""  onClick={e=> dispatch(uiActions.handleDetail())}/>
        </div>
      </div>
      <div className="center">
        {chat?.messages?.map((message) => (
          <div
            key={message.createAt}
            className={
              message.senderId === currentUser?.id ? "message own" : "message"
            }
          >
            <div className="texts">
              {message.img && <img src={message.img} alt="" />}
              <p>{message.text}</p>
              {/* <span>{message.createAt}</span> */}
            </div>
          </div>
        ))}
        {img.url && (
          <div className="message own">
            <div className="texts">
              <img src={img.url} alt="" />
            </div>
          </div>
        )}
        <div ref={endRef}></div>
      </div>
      <div className="bottom">
        <div className="icons">
          <label htmlFor="file">
            <img src="./img.png" alt="" />
          </label>
          <input
            type="file"
            id="file"
            style={{ display: "none" }}
            onChange={handleImg}
          />
          <img src="./camera.png" alt="" />
          <img src="./mic.png" alt="" />
        </div>
        <input
          type="text"
          name=""
          placeholder={isCurrentUserBlocked ||isReceiverBlocked ? "You cannot send a message" : "Type a message..."}
          onChange={(e) => setText(e.target.value)}
          value={text}
          disabled={isCurrentUserBlocked ||isReceiverBlocked}
        />
        <div className="emoji">
          <img
            src="./emoji.png"
            alt=""
            onClick={() => setOpen((prev) => !prev)}
          />
          <div className="picker">
            <EmojiPicker open={open} onEmojiClick={handleEmoji} />
          </div>
        </div>
        <button className="sendButton" onClick={handleSend} disabled={isCurrentUserBlocked ||isReceiverBlocked}>
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;
