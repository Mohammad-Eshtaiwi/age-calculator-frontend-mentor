import { PropTypes } from "prop-types";
import {
  createContext,
  useContext,
  useReducer,
  useMemo,
  useEffect,
} from "react";
import handleChangeStep from "utils/handleChangeStep";
// Auth context
const stepsContext = createContext();
// Setting custom name for the context which is visible on react dev tools
stepsContext.displayName = "Steps Context";

// reducer
function reducer(state, action) {
  switch (action.type) {
    case "INIT": {
      return { ...state, ...action.payload };
    }
    case "STEP_STATE_CHANGE": {
      const newStep = handleChangeStep({
        activeStep: state.activeStep,
        steps: state.steps,
        type: action.payload.type,
        index: action.payload.index,
      });
      return { ...state, activeStep: newStep };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

// context provider
function StepsContextProvider({ children, ...props }) {
  const initialState = {
    steps: [],
    activeStep: "",
    interactiveBullets: true,
  };

  const [controller, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(() => [controller, dispatch], [controller, dispatch]);

  useEffect(() => {
    dispatch({
      type: "INIT",
      payload: {
        steps: props.steps,
        activeStep: props.activeStep,
      },
    });
  }, []);

  return (
    <stepsContext.Provider value={value}>{children}</stepsContext.Provider>
  );
}

// custom hook for using context
function useSteps() {
  const context = useContext(stepsContext);
  if (!context) {
    throw new Error("useSteps should be used inside the StepsContextProvider.");
  }

  return context;
}

// Context module functions

// function clearLoading(dispatch) {
//   dispatch({ type: "STOP_LOADING" });
// }

StepsContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
  steps: PropTypes.array.isRequired,
  activeStep: PropTypes.string.isRequired,
};

export { StepsContextProvider, useSteps };
