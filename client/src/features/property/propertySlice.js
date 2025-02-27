import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import propertyService from "./propertyService";

const propertySlice = createSlice({
  name: "property",
  initialState: {
    properties: [],
    property: {},
    propertyLoading: false,
    propertySuccess: false,
    propertyError: false,
    propertyErrorMessage: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProperties.pending, (state, action) => {
        state.propertyLoading = true;
        state.propertySuccess = false;
        state.propertyError = false;
      })
      .addCase(getProperties.fulfilled, (state, action) => {
        state.propertyLoading = false;
        state.propertySuccess = true;
        state.propertyError = false;
        state.properties = action.payload;
      })
      .addCase(getProperties.rejected, (state, action) => {
        state.propertyLoading = false;
        state.propertySuccess = false;
        state.propertyError = true;
        state.propertyErrorMessage = action.payload;
      })
      .addCase(getProperty.pending, (state, action) => {
        state.propertyLoading = true;
        state.propertySuccess = false;
        state.propertyError = false;
      })
      .addCase(getProperty.fulfilled, (state, action) => {
        state.propertyLoading = false;
        state.propertySuccess = true;
        state.propertyError = false;
        state.property = action.payload;
      })
      .addCase(getProperty.rejected, (state, action) => {
        state.propertyLoading = false;
        state.propertySuccess = false;
        state.propertyError = true;
        state.propertyErrorMessage = action.payload;
      });
  },
});

export default propertySlice.reducer;

export const bookMarkProperty = createAsyncThunk(
  "BOOKMARK/PROPERTY",
  async (property) => {
    console.log(property);
  }
);

// Get Properties
export const getProperties = createAsyncThunk("FETCH/PROPERTIES", async () => {
  try {
    return await propertyService.fetchProperties();
  } catch (error) {
    console.log(error);
  }
});

// Get Property
export const getProperty = createAsyncThunk("FETCH/PROPERTY", async (id) => {
  try {
    return await propertyService.fetchProperty(id);
  } catch (error) {
    console.log(error);
  }
});
