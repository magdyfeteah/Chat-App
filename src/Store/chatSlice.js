import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  chatId: null,
  user: null,
  isCurrentUserBlocked: false,
  isReceiverBlocked: false,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    changeChat(state, action) {
      const { chatId, user, currentUser } = action.payload;

      if (user.blocked.includes(currentUser.id)) {
        state.chatId = chatId;
        state.user = null;
        state.isCurrentUserBlocked = true;
        state.isReceiverBlocked = false;
      } else if (currentUser.blocked.includes(user.id)) {
        state.chatId = chatId;
        state.user = user;
        state.isCurrentUserBlocked = false;
        state.isReceiverBlocked = true;
      } else {
        state.chatId = chatId;
        state.user = user;
        state.isCurrentUserBlocked = false;
        state.isReceiverBlocked = false;
      }
    },
    changeBlock(state) {
      state.isReceiverBlocked = !state.isReceiverBlocked;
    },
  },
});

export const chatAction = chatSlice.actions;
export default chatSlice;



