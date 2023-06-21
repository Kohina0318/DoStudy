import { createReducer } from '@reduxjs/toolkit'

const initialState = {
  mode: 'light',
  editProfileImage: '',
  
};

const RootReducer = createReducer(initialState, (builder) => {
  builder.addCase('THEME_CHANGE', (state, action) => {
    state.mode = action.payload;
  })

  builder.addCase('EDIT_PROFILE_IMAGE', (state, action) => {
    state.editProfileImage = action.payload;
  })
  builder.addCase('REMOVE_EDIT_PROFILE_IMAGE', (state, action) => {
    state.editProfileImage = '';
  })
 

});
export default RootReducer;