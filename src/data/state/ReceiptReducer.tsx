import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const receiptReducer = createSlice({
  name: "Receipt",
  initialState: {},
  reducers: {
    setProfile: (
      state: any,
      action: PayloadAction<any>
    ) => {
      state.value = action.payload;
    },
    updateProfile: (state: any, action: PayloadAction<any>) => {
      for ( var property in action.payload ) {
        state.value[property] = action.payload[property]
      }
    },
  },
});

export const ReceiptReducer = receiptReducer.reducer;
export const ReceiptAction = receiptReducer.actions;