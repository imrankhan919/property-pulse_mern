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
    edit: {
      property: {},
      isEdit: false,
    },
  },
  reducers: {
    edit: (state, action) => {
      return {
        ...state,
        edit: { property: action.payload, isEdit: true },
      };
    },
  },
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
      })
      .addCase(createProperty.pending, (state, action) => {
        state.propertyLoading = true;
        state.propertySuccess = false;
        state.propertyError = false;
      })
      .addCase(createProperty.fulfilled, (state, action) => {
        state.propertyLoading = false;
        state.propertySuccess = true;
        state.propertyError = false;
        state.properties = [action.payload, ...state.properties];
      })
      .addCase(createProperty.rejected, (state, action) => {
        state.propertyLoading = false;
        state.propertySuccess = false;
        state.propertyError = true;
        state.propertyErrorMessage = action.payload;
      })
      .addCase(getUserProperty.pending, (state, action) => {
        state.propertyLoading = true;
        state.propertySuccess = false;
        state.propertyError = false;
      })
      .addCase(getUserProperty.fulfilled, (state, action) => {
        state.propertyLoading = false;
        state.propertySuccess = true;
        state.propertyError = false;
        state.properties = action.payload;
      })
      .addCase(getUserProperty.rejected, (state, action) => {
        state.propertyLoading = false;
        state.propertySuccess = false;
        state.propertyError = true;
        state.propertyErrorMessage = action.payload;
      })
      .addCase(removeProperty.pending, (state, action) => {
        state.propertyLoading = true;
        state.propertySuccess = false;
        state.propertyError = false;
      })
      .addCase(removeProperty.fulfilled, (state, action) => {
        state.propertyLoading = false;
        state.propertySuccess = true;
        state.propertyError = false;
        state.properties = state.properties.filter(
          (item) => item._id !== action.payload.id
        );
      })
      .addCase(removeProperty.rejected, (state, action) => {
        state.propertyLoading = false;
        state.propertySuccess = false;
        state.propertyError = true;
        state.propertyErrorMessage = action.payload;
      });
  },
});

export const { edit } = propertySlice.actions;

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

// Get Property
export const getUserProperty = createAsyncThunk(
  "FETCH/USER_PROPERTY",
  async (_, thunkAPI) => {
    let token = thunkAPI.getState().auth.user.token;
    try {
      return await propertyService.fetchUsersProperty(token);
    } catch (error) {
      console.log(error);
    }
  }
);

// Add Property
export const createProperty = createAsyncThunk(
  "ADD/PROPERTY",
  async (formData, thunkAPI) => {
    let token = thunkAPI.getState().auth.user.token;

    try {
      return await propertyService.addProperty(formData, token);
    } catch (error) {
      console.log(error);
    }
  }
);

// Remove Property
export const removeProperty = createAsyncThunk(
  "REMOVE/PROPERTY",
  async (id, thunkAPI) => {
    let token = thunkAPI.getState().auth.user.token;
    try {
      return await propertyService.removeUserProperty(id, token);
    } catch (error) {
      console.log(error);
    }
  }
);
