/* eslint-disable @typescript-eslint/no-explicit-any */
import * as types from "../actionTypes/users";
import axios from "axios";
import { BASE_URL } from "../constant/constants";
import {
  GET_PAGE_DETAILS,
  LOADING,
  NO_INSTITUTES,
} from "../actionTypes/verifications";

export const fetchInstitutes = (payload: never[]) => {
  return {
    type: types.FETCH_INSTITUTIONS,
    payload,
  };
};

export const setPageInfo = (payload: { totalDocs?: any; totalPages?: any; hasPrevPage?: any; hasNextPage?: any; page?: any; }) => {
  return {
    type: GET_PAGE_DETAILS,
    payload,
  };
};

export const setLoading = (payload: any) => {
  return {
    type: LOADING,
    payload,
  };
};

export const noInstitute = (payload: boolean) => {
  return {
    type: NO_INSTITUTES,
    payload,
  };
};

export const getAllInstitutions = () => (dispatch: (arg0: { type: string; payload: any; }) => void) => {
  axios
    .get(`${BASE_URL}/api/v1/institutions`)
    .then(({ data }) => {
      dispatch(fetchInstitutes(data.institution));
    })
    .catch((err) => {
      return err;
    });
};
