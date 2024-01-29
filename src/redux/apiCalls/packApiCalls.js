import { publicRequest } from "../../requestMethods";
import {
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
} from "../packRedux";

// GET ALL PACKS
export const getPacks = async (dispatch) => {
  dispatch(getPacksStart());
  try {
    const res = await publicRequest.get("/packs");
    dispatch(getPacksSuccess(res.data));
  } catch (err) {
    dispatch(getPacksFailure());
  }
};

// GET ONE PACK
export const getPack = async (name, dispatch) => {
  dispatch(getPackStart());
  try {
    const res = await publicRequest.get(`/packs/${name}`);
    dispatch(getPackSuccess(res.data));
  } catch (err) {
    dispatch(getPackFailure());
  }
};

// DELETE PACK
export const deletePack = async (id, dispatch) => {
  dispatch(deletePackStart());
  try {
    const res = await publicRequest.delete(`/packs/${id}`);
    dispatch(deletePackSuccess(id));
  } catch (err) {
    dispatch(deletePackFailure());
  }
};

// UPDATE PACK
export const updatePack = async (id, pack, dispatch) => {
  dispatch(updatePackStart());
  try {
    dispatch(updatePackSuccess({ id, pack }));
  } catch (err) {
    dispatch(updatePackFailure());
  }
};

// ADD PACK
export const addPack = async (pack, dispatch) => {
  dispatch(addPackStart());
  try {
    const res = await publicRequest.post(`/packs`, pack);
    dispatch(addPackSuccess(res.data));
  } catch (err) {
    dispatch(addPackFailure());
  }
};
