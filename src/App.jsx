import { useEffect, useState } from "react";

import { PLUS, MINUS, TIMES, DIVISION, isOperand } from "./modules/operand";
import useCalculation from "./modules/useCalculation";

const displayCalculation = (calculation = []) => {
  return calculation
    .map((item, i) => {
      if (isOperand(item) && calculation[i + 1] == MINUS) {
        return `${item}(`;
      } else if (calculation[i - 1] == MINUS && isOperand(calculation[i - 2])) {
        return `${item})`;
      } else {
        return item;
      }
    })
    .join("");
};

function App() {
  const [calculation, setCalculation] = useCalculation([0]);
  const [prevCalculation, setPrevCalculation] = useState([0]);
  const [evaluated, setEvaluated] = useState(false);

  const handleBtnClick = (e) => {
    // Prevent Default element behavior
    e.preventDefault();
    // Allow only element with class btn
    if (!e.target.classList.contains(`btn`)) return;

    // Reset
    setEvaluated(() => false);
    setPrevCalculation(() => [0]);

    const btn = e.target;

    // ? EQUALS BTN HANDLER
    if (btn.id === `equals`) {
      if (calculation.length <= 1 && calculation[0] === 0) return;
      setEvaluated(() => true);
      return;
    }

    // ? AC BTN HANDLER
    if (btn.id === `clear`) {
      setCalculation.reset();
      return;
    }

    // ? UNDO BTN HANDLER
    if (btn.id === `undo`) {
      setCalculation.undo();
      return;
    }

    // ? SIGNS BTN HANDLER
    if (isOperand(btn.innerText)) {
      setCalculation.operand(btn.innerText);
      return;
    }

    // ? DECIMAL BTN HANDLER
    if (btn.id === `decimal`) {
      setCalculation.decimal();
      return;
    }

    // ? DIGIT BTN HANDLER
    setCalculation.number(btn.innerText);
  };

  useEffect(() => {
    if (evaluated) {
      setPrevCalculation(() => [...calculation]);
      setCalculation.evaluate();
    }
  }, [evaluated]);

  return (
    <div className={`App`}>
      <div id="displayContainer" className={`displayContainer`}>
        <div
          id="calculation"
          className={`display ${
            evaluated
              ? `display-secondary`
              : displayCalculation(calculation).length >= 14
              ? ``
              : `display-primary`
          }`}
        >
          {evaluated
            ? displayCalculation(prevCalculation)
            : displayCalculation(calculation)}
        </div>
        <div
          id="result"
          className={`display ${
            !evaluated
              ? `display-secondary`
              : setCalculation.result
              ? setCalculation.result.length >= 14
                ? ``
                : `display-primary`
              : `display-primary`
          }`}
        >
          {setCalculation.result ? `= ${setCalculation.result}` : ``}
        </div>
      </div>

      <div
        id="buttonContainer"
        className={`buttonContainer`}
        onClick={(e) => handleBtnClick(e)}
      >
        {/* CONTROLS AREA */}
        <div className={`btn order-[1] btn-span-2 btn-secondary`} id="clear">
          {`AC`}
        </div>
        <div className={`btn order-[2] btn-secondary`} id="undo">
          {`<-`}
        </div>
        <div className={`btn order-[17]`} id="decimal">{`.`}</div>
        <div className={`btn order-[18] btn-primary`} id="equals">{`=`}</div>

        {/* OPERATORS AREA */}
        <div className={`btn order-[3] btn-secondary`} id="divide">
          {DIVISION}
        </div>
        <div className={`btn order-[7] btn-secondary`} id="multiply">
          {TIMES}
        </div>
        <div className={`btn order-[11] btn-secondary`} id="subtract">
          {MINUS}
        </div>
        <div className={`btn order-[15] btn-secondary`} id="add">
          {PLUS}
        </div>

        {/* NUMBERS AREA */}
        <div className={`btn order-[16] btn-span-2`} id="zero">
          0
        </div>
        <div className={`btn order-[12]`} id="one">
          1
        </div>
        <div className={`btn order-[13]`} id="two">
          2
        </div>
        <div className={`btn order-[14]`} id="three">
          3
        </div>
        <div className={`btn order-[8]`} id="four">
          4
        </div>
        <div className={`btn order-[9]`} id="five">
          5
        </div>
        <div className={`btn order-[10]`} id="six">
          6
        </div>
        <div className={`btn order-[4]`} id="seven">
          7
        </div>
        <div className={`btn order-[5]`} id="eight">
          8
        </div>
        <div className={`btn order-[6]`} id="nine">
          9
        </div>
      </div>
    </div>
  );
}

export default App;
