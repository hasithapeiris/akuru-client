import { createSlice } from "@reduxjs/toolkit";

export const packSlice = createSlice({
  name: "pack",
  initialState: {
    packs: [],
    pack: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    //GET ALL PACKS
    getPacksStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getPacksSuccess: (state, action) => {
      state.isFetching = false;
      state.packs = action.payload;
    },
    getPacksFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    //GET ONE PACK
    getPackStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getPackSuccess: (state, action) => {
      state.isFetching = false;
      state.pack = action.payload;
    },
    getPackFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    //DELETE PACK
    deletePackStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deletePackSuccess: (state, action) => {
      state.isFetching = false;
      state.packs.splice(
        state.packs.findIndex((item) => item._id === action.payload),
        1
      );
    },
    deletePackFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    //UPDATE PACK
    updatePackStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updatePackSuccess: (state, action) => {
      state.isFetching = false;
      state.packs[
        state.packs.findIndex((item) => item._id === action.payload.id)
      ] = action.payload.font;
    },
    updatePackFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    //ADD PACK
    addPackStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addPackSuccess: (state, action) => {
      state.isFetching = false;
      state.packs.push(action.payload);
    },
    addPackFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getPacksStart,
  getPacksSuccess,
  getPacksFailure,
  getPackStart,
  getPackSuccess,
  getPackFailure,
  deletePackStart,
  deletePackSuccess,
  deletePackFailure,
  updatePackStart,
  updatePackSuccess,
  updatePackFailure,
  addPackStart,
  addPackSuccess,
  addPackFailure,
} = packSlice.actions;

export default packSlice.reducer;
