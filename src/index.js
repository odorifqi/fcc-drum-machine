import React from "react";
import ReactDOM from "react-dom";
import "./style.scss";
import { bankOne, bankTwo } from "./sound";
import { PadBank } from "./padBank";

const reducer = (state, action) => {
  switch (action.type) {
    case "displayClipName":
      return { ...state, display: action.payload.display };
    case "selectBank":
      return {
        ...state,
        currentPadBank: action.payload.currentPadBank,
        display: action.payload.display,
        currentPadBankId: action.payload.currentPadBankId,
      };
    case "adjustVolume":
      return {
        ...state,
        sliderVal: action.payload.sliderVal,
        display: action.payload.display,
      };
    case "powerControl":
      return {
        ...state,
        power: action.payload.power,
        display: action.payload.display,
      };
    case "clearDisplay":
      return { ...state, display: action.payload.display };

    default:
      throw new Error();
  }
};

function App() {
  const [state, dispatch] = React.useReducer(reducer, {
    power: true,
    display: String.fromCharCode(160),
    currentPadBank: bankOne,
    currentPadBankId: "Heater Kit",
    sliderVal: 0.3,
  });

  const powerControl = () => {
    dispatch({
      type: "powerControl",
      payload: {
        power: !state.power,
        display: String.fromCharCode(160),
      },
    });
  };

  const selectBank = () => {
    if (state.power) {
      dispatch({
        type: "selectBank",
        payload:
          state.currentPadBankId === "Heater Kit"
            ? {
                currentPadBank: bankTwo,
                display: "Smooth Piano Kit",
                currentPadBankId: "Smooth Piano Kit",
              }
            : {
                currentPadBank: bankOne,
                display: "Heater Kit",
                currentPadBankId: "Heater Kit",
              },
      });
    }
  };

  const displayClipName = (name) => {
    if (state.power) {
      dispatch({
        type: "displayClipName",
        payload: {
          display: name,
        },
      });
    }
  };

  const adjustVolume = (e) => {
    if (state.power) {
      dispatch({
        type: "adjustVolume",
        payload: {
          sliderVal: e.target.value,
          display: "Volume: " + Math.round(e.target.value * 100),
        },
      });

      setTimeout(() => clearDisplay(), 1000);
    }
  };

  const clearDisplay = () => {
    dispatch({
      type: "clearDisplay",
      payload: {
        display: String.fromCharCode(160),
      },
    });
  };

  const powerSlider = state.power
    ? {
        float: "right",
      }
    : {
        float: "left",
        background: "grey",
      };

  const bankSlider =
    state.currentPadBank === bankOne
      ? {
          float: "left",
        }
      : {
          float: "right",
        };

  const clips = [].slice.call(document.getElementsByClassName("clip"));
  clips.forEach((sound) => {
    sound.volume = state.sliderVal;
  });

  return (
    <div className="inner-container" id="drum-machine">
      <PadBank
        clipVolume={state.sliderVal}
        currentPadBank={state.currentPadBank}
        power={state.power}
        updateDisplay={displayClipName}
      />

      <div className="logo">
        <div className="inner-logo ">
          <i class="fas fa-drum"></i>
          {"DRUM MACHINE" + String.fromCharCode(160)}
        </div>
      </div>

      <div className="controls-container">
        <div className="control">
          <p>Power</p>
          <div className="select" onClick={powerControl}>
            <div className="inner" style={powerSlider} />
          </div>
        </div>
        <p id="display">{state.display}</p>
        <div className="volume-slider">
          <input
            max="1"
            min="0"
            onChange={adjustVolume}
            step="0.01"
            type="range"
            value={state.sliderVal}
          />
        </div>
        <div className="control">
          <p>Bank</p>
          <div className="select" onClick={selectBank}>
            <div className="inner" style={bankSlider} />
          </div>
        </div>
      </div>
    </div>
  );
}

const rootDiv = document.getElementById("root");

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootDiv
);

module.hot.accept();
