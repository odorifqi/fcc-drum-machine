import React from "react";

const activeStyle = {
  backgroundColor: "orange",
  boxShadow: "0 3px orange",
  height: 77,
  marginTop: 13,
};

const inactiveStyle = {
  backgroundColor: "grey",
  marginTop: 10,
  boxShadow: "3px 3px 5px black",
};

export function PadBank(props) {
  return (
    <div className="pad-bank">
      {props.currentPadBank.map((drumObj, i, padBankArr) => (
        <DrumPad
          key={i}
          clip={props.power ? padBankArr[i].url : "#"}
          clipId={padBankArr[i].id}
          keyCode={padBankArr[i].keyCode}
          keyTrigger={padBankArr[i].keyTrigger}
          power={props.power}
          updateDisplay={props.updateDisplay}
        />
      ))}
    </div>
  );
}

const DrumPad = (props) => {
  const [padStyle, setPadStyle] = React.useState(inactiveStyle);

  React.useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  });

  const handleKeyPress = (e) => {
    if (e.keyCode === props.keyCode) {
      playSound();
    }
  };

  React.useEffect(() => {
    if (props.power) {
      setTimeout(() => {
        setPadStyle(() => inactiveStyle);
      }, 100);
    } else {
      setTimeout(() => {
        setPadStyle(() => inactiveStyle);
      }, 100);
    }
  });

  const activatePad = () => {
    if (props.power) {
      setPadStyle(() => activeStyle);
    } else {
      setPadStyle(() => ({
        height: 77,
        marginTop: 13,
        backgroundColor: "grey",
        boxShadow: "0 3px grey",
      }));
    }
  };

  const playSound = () => {
    const sound = document.getElementById(props.keyTrigger);
    sound.currentTime = 0;
    sound.play();
    activatePad();
    props.updateDisplay(props.clipId.replace(/-/g, " "));
  };

  return (
    <div
      className="drum-pad"
      id={props.clipId}
      onClick={playSound}
      style={padStyle}
    >
      <audio className="clip" id={props.keyTrigger} src={props.clip} />
      {props.keyTrigger}
    </div>
  );
};
