const views = ["initial", "timer", "distraction", "submission"] as const;
export type TimerView = (typeof views)[number];

export type InitialState = {
  view: TimerView;
  time: number;
};

export const initialState: InitialState = {
  view: "initial",
  time: 0,
};

type ViewAction = {
  type: "SWITCH_VIEW";
  payload: TimerView;
};

type TimeAction = {
  type: "UPDATE_TIME";
};

type ResetAction = {
  type: "RESET";
};

type Actions = ViewAction | TimeAction | ResetAction;

export const reducer = (state = initialState, action: Actions) => {
  switch (action.type) {
    case "SWITCH_VIEW": {
      return {
        ...state,
        view: action.payload,
      };
    }
    case "RESET": {
      return initialState;
    }
    case "UPDATE_TIME": {
      return {
        ...state,
        time: state.time + 1,
      };
    }
    default:
      return state;
  }
};
