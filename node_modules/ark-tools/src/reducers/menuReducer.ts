import * as R from "ramda";

const menuReducer = ({ key }: { key: string }) => {
  const TOGGLE_MENU_STATE = `${key}/TOGGLE_MENU_STATE`;
  const TOGGLE_PINNED_STATE = `${key}/TOGGLE_PINNED_STATE`;

  const menuReducerState = { open: false, pinned: false };

  const menuStateReducer = (state = menuReducerState, action: any) => {
    switch (action.type) {
      case TOGGLE_MENU_STATE:
        return R.evolve({ open: R.not }, state);
      case TOGGLE_PINNED_STATE:
        return R.evolve({ pinned: R.not }, state);
      default:
        return menuReducerState;
    }
  };

  const toggleMenu = () => ({ type: TOGGLE_MENU_STATE });
  const togglePinned = () => ({ type: TOGGLE_PINNED_STATE });

  return {
    menuStateReducer,
    toggleMenu,
    togglePinned
  };
};

export default menuReducer;
