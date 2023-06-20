import React, {
  type PropsWithChildren,
  type Dispatch,
  useReducer,
} from "react";

type TimeLogSession = {
  activity: {
    id: string;
    name: string;
    category: {
      id: string;
      name: string;
    };
  };
  id?: string;
  start: Date;
};
type DashboardView = "dashboard" | "timerSession" | "new" | "onboarding";

type SetPos = {
  type: "SET_POS";
  payload: { x: number; y: number };
};

type ToggleMenu = {
  type: "TOGGLE_MENU";
  payload?: boolean;
};

type SetView = {
  type: "SET_VIEW";
  payload: DashboardView;
};

type StartSession = {
  type: "START_SESSION";
  payload: TimeLogSession;
};

type SetActiveSession = {
  type: "SET_ACTIVE_SESSION";
  payload: TimeLogSession | null;
};

type EndSession = {
  type: "END_SESSION";
};

type InitialState = {
  view: DashboardView;
  activeSession: TimeLogSession | null;
  isNavOpen: boolean;
  pos: {
    x: number;
    y: number;
  } | null;
};

type Actions =
  | SetView
  | StartSession
  | SetActiveSession
  | EndSession
  | SetPos
  | ToggleMenu;

const initialState: InitialState = {
  view: "dashboard",
  activeSession: null,
  isNavOpen: false,
  pos: null,
};

const Context = React.createContext<{
  state: InitialState;
  dispatch: Dispatch<Actions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const reducer = (state: InitialState = initialState, action: Actions) => {
  switch (action.type) {
    case "SET_VIEW": {
      return { ...state, view: action.payload };
    }
    case "START_SESSION": {
      return {
        ...state,
        view: "timerSession" as DashboardView,
      };
    }
    case "SET_ACTIVE_SESSION": {
      return {
        ...state,
        view: "timerSession" as DashboardView,
        activeSession: action.payload,
      };
    }
    case "END_SESSION": {
      return {
        ...state,
        view: "dashboard" as DashboardView,
        activeSession: null,
      };
    }
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
  const [state, dispatch] = useReducer(reducer, initialState);

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
