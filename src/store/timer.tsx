import { type NoteProps } from "~/components/timer/ViewDistraction";

const views = ["default", "distraction", "submission"] as const;
export type TimerViews = (typeof views)[number];

export type InitialState = {
  view: TimerViews;
  time: number;
  start?: Date;
  end?: Date;
  description: string;
  distractions: NoteProps[];
  notes: NoteProps[];
  moodId?: string;
  areaId?: string;
};

export const initialState: InitialState = {
  view: "default",
  time: 0,
  description: "",
  distractions: [],
  notes: [],
};

type START_TIMER_ACTION = {
  type: "START_TIMER";
  payload: number;
};

type STOP_TIMER_ACTION = {
  type: "STOP_TIMER";
  payload: Date;
};

type UPDATE_TIME_ACTION = {
  type: "UPDATE_TIME";
};

type SWITCH_VIEW_ACTION = {
  type: "SWITCH_VIEW";
  payload: TimerViews;
};

type ADD_NOTE_ACTION = {
  type: "ADD_NOTE";
  payload: NoteProps & {
    type: "distraction" | "note";
  };
};

type Actions =
  | START_TIMER_ACTION
  | STOP_TIMER_ACTION
  | UPDATE_TIME_ACTION
  | SWITCH_VIEW_ACTION
  | ADD_NOTE_ACTION;

export const reducer = (state = initialState, action: Actions) => {
  switch (action.type) {
    case "START_TIMER": {
      return {
        ...state,
        time: action.payload,
      };
    }
    case "STOP_TIMER": {
      return {
        ...state,
        end: action.payload,
        view: "submission" as TimerViews,
      };
    }
    case "UPDATE_TIME": {
      return {
        ...state,
        time: state.time + 1,
      };
    }
    case "SWITCH_VIEW": {
      return {
        ...state,
        view: action.payload,
      };
    }
    case "ADD_NOTE": {
      const { type, ...rest } = action.payload;
      return {
        ...state,
        [type === "distraction" ? "distractions" : "notes"]: [
          ...state[type === "distraction" ? "distractions" : "notes"],
          rest,
        ],
      };
    }
    default:
      return state;
  }
};
