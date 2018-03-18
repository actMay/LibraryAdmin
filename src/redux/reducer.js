const reducer = (state, action) => {
  switch(action.type) {
    case 'create':
      return { ...state, 'payload': action.payload };
  }
}

export default reducer;
