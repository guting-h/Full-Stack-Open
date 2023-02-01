const filterReducer = (state = '', action) => {
  switch (action.type) {
    case 'FILTER':
      return action.payloader
    default: 
      return state
  }
}

export const setFilter = filter => {
  return {
    type: 'FILTER',
    payloader: filter
  }
}

export default filterReducer