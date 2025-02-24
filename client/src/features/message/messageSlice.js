import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: "message",
  initialState: {
    inbox: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
  },
  reducers: {},
  extraReducers: (builder) => {},
});

export default messageSlice.reducer;

// Get Message
export const getMessages = createAsyncThunk("FETCH/MSGS", async () => {
  console.log("Fetching Messages");
});

// Send Message

export const sendMessage = createAsyncThunk("ADD/MSG", (formData) => {
  console.log(formData);
});
