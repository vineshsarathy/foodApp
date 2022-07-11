import { createSlice } from '@reduxjs/toolkit'

export const cart = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addToCart:  (state, action) =>{
        const checkData = state.filter(i=>i.cartItem.index === action.payload.cartItem.index)
        if(checkData.length === 0){
            state.push(action.payload);
        }
          },
    removeCart :(state, action) =>{
            return state.filter((item) => item.cartItem.index!== action.payload);
      },
      deleteALl:(state,action) =>{
        return [];
      }
  },
})

export const { addToCart ,removeCart,deleteALl} = cart.actions

export default cart.reducer
