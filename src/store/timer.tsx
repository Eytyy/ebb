import { type DistractionProps } from "~/components/timer/distractionView";

const views = ["default", "distraction", "submission"] as const;
export type TimerViews = (typeof views)[number];

export type InitialState = {
  view: TimerViews;
  time: number;
  description: string;
  start: Date | null;
  end: Date | null;
  distractions: DistractionProps[];
  moodId?: string;
  areaId?: string;
};

export const initialState: InitialState = {
  view: "default",
  time: 0,
  description: "",
  start: null,
  end: null,
  distractions: [],
};

type SetEndAction = {
  type: "SET_END";
  payload: Date;
};

type AddDistractionAction = {
  type: "ADD_DISTRACTION";
  payload: DistractionProps;
};

type ViewAction = {
  type: "SWITCH_VIEW";
  payload: TimerViews;
};

type TimeAction = {
  type: "UPDATE_TIME";
};

type SetStartAction = {
  type: "SET_START";
  payload: Date;
};

type Actions =
  | ViewAction
  | TimeAction
  | SetStartAction
  | SetEndAction
  | AddDistractionAction;

export const reducer = (state = initialState, action: Actions) => {
  switch (action.type) {
    case "SET_START": {
      return {
        ...state,
        start: action.payload,
      };
    }
    case "UPDATE_TIME": {
      return {
        ...state,
        time: state.time + 1,
      };
    }
    case "SET_END": {
      return {
        ...state,
        view: "submission" as TimerViews,
        end: action.payload,
      };
    }
    case "ADD_DISTRACTION": {
      return {
        ...state,
        distractions: [...state.distractions, action.payload],
      };
    }
    default:
      return state;
  }
};
