import { createSlice } from "@reduxjs/toolkit";

export const qty = createSlice({
  name: "qty",
  initialState: {},
  reducers: {
    addQty: (state, action) => {
      return { ...state, totalItem: action.payload };
    },
    menuItems: (state, action) => {
        return { ...state, menu: action.payload };
     
    },
    pastOrders: (state, action) => {
        return { ...state, orders: action.payload };
    },
    totalAmount:(state, action)=>{
      // console.log(action.payload)
      return { ...state, amount: action.payload }
    }
  },
});

export const { addQty, menuItems, pastOrders,totalAmount } = qty.actions;

export default qty.reducer;
