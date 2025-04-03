import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PersonState {
  id: number | null;
}

const initialState: PersonState = {
  id: null,
};

const playerReducer = createSlice({
  name: "person",
  initialState,
  reducers: {
    setPlayerId: (state, action: PayloadAction<number>) => {
      state.id = action.payload;
    },
  },
});

export const { setPlayerId } = playerReducer.actions;
export default playerReducer.reducer;
