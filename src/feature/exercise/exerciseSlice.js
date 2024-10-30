import { createSlice } from "@reduxjs/toolkit";
import { creatExerciseApiSlice, deleteExerciseApiSlice, deleteSaveExerciseApiSlice, getExerciseApiSlice, getSaveExerciseApiSlice, saveExerciseApiSlice } from "./exerciseAPISlice";

const exerciseslice = createSlice({
  name: "exerciseslice",
  initialState: {
    exercise: [],
    saveExercise:[],
    message: null,
    error: null,
    loader: false,
    loaderForSaveExerccise: false,
    deleting: false
  },
  reducers: {
    setEmtyMessage: (state) => {
      state.message = null;
      state.error = null;
    },
   
  },
  extraReducers: (build) => {
    build
      // this is getExerciseApiSlice
      .addCase(getExerciseApiSlice.pending, (state) => {
        state.loader = true;
      })
      .addCase(getExerciseApiSlice.fulfilled, (state, action) => {
        state.loader = false;
        state.exercise = action.payload.allExercises;
      })
      .addCase(getExerciseApiSlice.rejected, (state, action) => {
        state.loader = false;
        state.error = action.error.message;
      })
      // this is getSaveExerciseApiSlice
      .addCase(getSaveExerciseApiSlice.pending, (state) => {
        state.loader = true;
      })
      .addCase(getSaveExerciseApiSlice.fulfilled, (state, action) => {
        state.loader = false;
        state.saveExercise = action.payload.allSaveExercises;
      })
      .addCase(getSaveExerciseApiSlice.rejected, (state, action) => {
        state.loader = false;
        state.error = action.error.message;
      })
      // this is CreateExerciseApiSlice
      .addCase(creatExerciseApiSlice.pending, (state) => {
        state.loader = true;
      })
      .addCase(creatExerciseApiSlice.fulfilled, (state, action) => {
        state.loader = false;
        state.exercise =[...state.exercise, action.payload.createExercise];
        state.message = action.payload.message;
      })
      .addCase(creatExerciseApiSlice.rejected, (state, action) => {
        state.loader = false;
        state.error = action.error.message;
      })
      // this is saveExerciseApiSlice
      .addCase(saveExerciseApiSlice.pending, (state) => {
        state.loaderForSaveExerccise = true;
      })
      .addCase(saveExerciseApiSlice.fulfilled, (state, action) => {
        state.loaderForSaveExerccise = false;
        state.saveExercise =[...state.saveExercise, action.payload.saveExerciseData];
        state.message = action.payload.message;
      })
      .addCase(saveExerciseApiSlice.rejected, (state, action) => {
        state.loaderForSaveExerccise = false;
        state.error = action.error.message;
      })
      // this is deleteExerciseApiSlice
      .addCase(deleteExerciseApiSlice.pending, (state) => {
        state.loader = true;
      })
      .addCase(deleteExerciseApiSlice.fulfilled, (state, action) => {
        state.loader = false;
        state.exercise = state.exercise?.filter(
          (item) => item.id !== action.payload.deletedExercise.id
        );
        
        state.message = action.payload.message;
      })
      .addCase(deleteExerciseApiSlice.rejected, (state, action) => {
        state.loader = false;
        state.error = action.error.message;
      })
      // this is deleteSaveExerciseApiSlice
      .addCase(deleteSaveExerciseApiSlice.pending, (state) => {
        state.deleting = true;
      })
      .addCase(deleteSaveExerciseApiSlice.fulfilled, (state, action) => {
        state.deleting = false;
        state.saveExercise = state.saveExercise?.filter(
          (item) => item.id !== action.payload.deletedSaveExercise.id
        );
        
        state.message = action.payload.message;
      })
      .addCase(deleteSaveExerciseApiSlice.rejected, (state, action) => {
        state.deleting = false;
        state.error = action.error.message;
      });
  },
});

// selector
export const exerciseSelector = (state) => state.exercise;
// export actions
export const { setEmtyMessage,reorderExercise } = exerciseslice.actions;
// export authSlice reducer
export default exerciseslice.reducer;
