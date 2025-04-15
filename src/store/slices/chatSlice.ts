import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Message {
  id: string;
  content: string;
  isAI: boolean;
  timestamp: number;
}

interface ChatState {
  messages: Message[];
  activeChat: string | null;
}

const initialState: ChatState = {
  messages: [],
  activeChat: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },
    clearChat: (state) => {
      state.messages = [];
    },
    setActiveChat: (state, action: PayloadAction<string>) => {
      state.activeChat = action.payload;
    },
  },
});

export const { addMessage, clearChat, setActiveChat } = chatSlice.actions;
export default chatSlice.reducer;