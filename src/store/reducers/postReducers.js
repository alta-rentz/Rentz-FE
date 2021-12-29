const initialState = [];

const postReducers = (state = initialState, action) => {
  if(action.type === 'SET_POST') {
    return action.payload;
  }
  return state
}

export default postReducers;