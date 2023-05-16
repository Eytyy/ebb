import { type DistractionProps } from "~/components/time/distractionView";

const views = ["widget", "list"] as const;
type View = (typeof views)[number];

type InitialState = {
  active: boolean;
  view: View;
  submitting: boolean;
  timer: {
    description: string;
    start: Date | null;
    end: Date | null;
    distractions?: DistractionProps[];
    moodId?: string;
    areaId?: string;
  };
};

export const initialState: InitialState = {
  active: false,
  view: "widget",
  submitting: false,
  timer: {
    description: "",
    start: null,
    end: null,
    distractions: [],
  },
};

type SetStartAction = {
  type: "SET_START";
  payload: Date;
};

type SetEndAction = {
  type: "SET_END";
  payload: Date;
};

type AddDistractionAction = {
  type: "ADD_DISTRACTION";
  payload: DistractionProps;
};

type SwitchView = {
  type: "SWITCH_VIEW";
};

type ResetAction = {
  type: "RESET";
};

type SetSubmitActions = {
  type: "SET_SUBMIT";
};

type TrackTimeActions =
  | SetStartAction
  | SetEndAction
  | AddDistractionAction
  | SwitchView
  | SetSubmitActions
  | ResetAction;

export const reducer = (
  state = initialState,
  action: TrackTimeActions
): InitialState => {
  const { type } = action;

  switch (type) {
    case "SWITCH_VIEW": {
      const currentIdx = views.indexOf(state.view);
      const nextIdx = currentIdx === views.length - 1 ? 0 : currentIdx + 1;
      const nextView = views[nextIdx] as View;

      return {
        ...state,
        view: nextView,
      };
    }
    case "SET_START": {
      return {
        ...state,
        active: true,
        timer: {
          ...state.timer,
          start: action.payload,
        },
      };
    }
    case "SET_END": {
      return {
        ...state,
        active: true,
        timer: {
          ...state.timer,
          end: action.payload,
        },
      };
    }

    case "SET_SUBMIT": {
      return {
        ...state,
        submitting: true,
      };
    }
    case "RESET": {
      return initialState;
    }
    case "ADD_DISTRACTION": {
      return {
        ...state,
        timer: {
          ...state.timer,
          distractions: state.timer.distractions
            ? [...state.timer.distractions, action.payload]
            : [action.payload],
        },
      };
    }
    default:
      return state;
  }
};
