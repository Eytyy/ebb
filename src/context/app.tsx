import React, {
  type PropsWithChildren,
  type Dispatch,
  useReducer,
} from "react";

const initialState = {
  pos: null,
  isNavOpen: false,
};

type SetPos = {
  type: "SET_POS";
  payload: { x: number; y: number };
};

type ToggleMenu = {
  type: "TOGGLE_MENU";
  payload?: boolean;
};

type InitialState = {
  isNavOpen: boolean;
  pos: {
    x: number;
    y: number;
  } | null;
};

type Actions = SetPos | ToggleMenu;

const Context = React.createContext<{
  state: InitialState;
  dispatch: Dispatch<Actions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const reducer = (state: InitialState = initialState, action: Actions) => {
  switch (action.type) {
    case "SET_POS":
      return { ...state, pos: action.payload };
    case "TOGGLE_MENU": {
      if (action.payload !== undefined) {
        return { ...state, isNavOpen: action.payload };
      }
      return { ...state, isNavOpen: !state.isNavOpen };
    }
    default:
      return state;
  }
};

export default function AppProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(reducer, {
    pos: null,
    isNavOpen: false,
  });

  return (
    <Context.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export function useApp() {
  const context = React.useContext(Context);
  if (context === null) {
    throw new Error("useApp must be used within a AppProvider");
  }
  return context;
}
