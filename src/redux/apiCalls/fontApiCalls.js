import { publicRequest } from "../../requestMethods";
import {
  getFontsStart,
  getFontsSuccess,
  getFontsFailure,
  getFontStart,
  getFontSuccess,
  getFontFailure,
  deleteFontStart,
  deleteFontSuccess,
  deleteFontFailure,
  updateFontStart,
  updateFontSuccess,
  updateFontFailure,
  addFontStart,
  addFontSuccess,
  addFontFailure,
} from "../fontRedux";

// GET ALL FONTS
export const getFonts = async (dispatch) => {
  dispatch(getFontsStart());
  try {
    const res = await publicRequest.get("/fonts");
    dispatch(getFontsSuccess(res.data));
  } catch (err) {
    dispatch(getFontsFailure());
  }
};

// GET ONE FONT
export const getFont = async (name, dispatch) => {
  dispatch(getFontStart());
  try {
    const res = await publicRequest.get(`/fonts/${name}`);
    dispatch(getFontSuccess(res.data));
  } catch (err) {
    dispatch(getFontFailure());
  }
};

// DELETE FONT
export const deleteFont = async (id, dispatch) => {
  dispatch(deleteFontStart());
  try {
    const res = await publicRequest.delete(`/fonts/${id}`);
    dispatch(deleteFontSuccess(id));
  } catch (err) {
    dispatch(deleteFontFailure());
  }
};

// UPDATE FONT
export const updateFont = async (id, font, dispatch) => {
  dispatch(updateFontStart());
  try {
    dispatch(updateFontSuccess({ id, font }));
  } catch (err) {
    dispatch(updateFontFailure());
  }
};

// ADD FONT
export const addFont = async (font, dispatch) => {
  dispatch(addFontStart());
  try {
    const res = await publicRequest.post(`/fonts`, font);
    dispatch(addFontSuccess(res.data));
  } catch (err) {
    dispatch(addFontFailure());
  }
};
