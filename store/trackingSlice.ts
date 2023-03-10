import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitialState {
  currentTrack: any;
  allTracks: any[];
  status: 'idle' | 'loading' | 'failed';
  error: any;
}

const initialState: InitialState = {
  currentTrack: null,
  allTracks: [],
  status: 'idle',
  error: null,
}

const trackingSlice = createSlice({
  name: 'tracking',
  initialState,
  reducers: {
    updateLocationLocal(state, action: PayloadAction<any>) {
      if (action) {
        state.allTracks = action.payload;
      }
    }
  },
  extraReducers: (builder) => {}
})

export const { updateLocationLocal } = trackingSlice.actions;
export default trackingSlice.reducer;