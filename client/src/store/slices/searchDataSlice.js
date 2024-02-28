import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const searchDataSlice = createSlice({
  name: "searchDataSlice",
  initialState: { searchData: [], isLoading: false, error: null },
  reducers: {
    setSearchData: (state, action) => {
      state.searchData = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const fetchSearchData = createAsyncThunk(
  "searchDataSlice/fetchSearchData",
  async (search, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const BASE_URL = process.env.REACT_APP_BASE_URL;
      const response = await axios.post(`${BASE_URL}/search`, { search });
      const data = response.data.data;
      dispatch(setSearchData(data));
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const { setSearchData, setLoading, setError } = searchDataSlice.actions;
export default searchDataSlice.reducer;



