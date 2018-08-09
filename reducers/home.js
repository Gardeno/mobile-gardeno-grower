const defaultState = { isEditing: false };

export default function home(state = defaultState, action) {
  switch (action.type) {
    case 'TOGGLE_EDIT':
      return Object.assign({}, state, {
        isEditing: !state.isEditing,
      });
    default:
      return state;
  }
}