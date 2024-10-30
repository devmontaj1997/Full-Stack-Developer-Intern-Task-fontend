// create authApiSlice

import { createAsyncThunk } from "@reduxjs/toolkit";

import API from "../../apiAxiosInstance/api";

// this is creatExerciseApiSlice
export const creatExerciseApiSlice = createAsyncThunk(
  "exerciseslice/creatExerciseApiSlice",
  async (data) => {
    try {
      const response = await API.post("/", data);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
// this is saveExerciseApiSlice
export const saveExerciseApiSlice = createAsyncThunk(
  "exerciseslice/saveExerciseApiSlice",
  async (data) => {
    try {
      const response = await API.post("/save_exercise", data);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
// this is GET ExerciseApiSlice
export const getExerciseApiSlice = createAsyncThunk(
  "exerciseslice/getExerciseApiSlice",
  async () => {
    try {
      const response = await API.get("/");

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
// this is GET SaveExerciseApiSlice
export const getSaveExerciseApiSlice = createAsyncThunk(
  "exerciseslice/getSaveExerciseApiSlice",
  async () => {
    try {
      const response = await API.get("/save_exercise");

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
// this is DELETE ExerciseApiSlice
export const deleteExerciseApiSlice = createAsyncThunk(
  "exerciseslice/deleteExerciseApiSlice",
  async (id) => {
    try {
      const response = await API.delete(`/${id}`);

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
// this is DELETE SaveExerciseApiSlice
export const deleteSaveExerciseApiSlice = createAsyncThunk(
  "exerciseslice/deleteSaveExerciseApiSlice",
  async (id) => {
    try {
      const response = await API.delete(`/save_exercise/${id}`);

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
