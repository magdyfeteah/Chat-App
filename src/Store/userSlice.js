import { createSlice } from "@reduxjs/toolkit";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

const initialState = {
  user: null,
  isLoading: true,
  editUser : false
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      state.isLoading = false;
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    changeUser(state){
      state.editUser= !state.editUser
    }
  },
});

export const fetchUserInfo = (uid) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    if (!uid) {
      dispatch(setUser(null));
      return;
    }
    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        dispatch(setUser(docSnap.data()));
      } else {
        dispatch(setUser(null));
      }
    } catch (error) {
      console.log(error);
      dispatch(setUser(null));
    }
  };
};

export const { setUser, setLoading,changeUser } = userSlice.actions;

export default userSlice;
