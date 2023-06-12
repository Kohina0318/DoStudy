import { createReducer } from '@reduxjs/toolkit'

const initialState = {
  mode: 'light',
  
};

const RootReducer = createReducer(initialState, (builder) => {
  builder.addCase('THEME_CHANGE', (state, action) => {
    state.mode = action.payload;
  })

 

});
export default RootReducer;