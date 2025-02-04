import React, { useState } from "react";
import data from "./data";
import './styles.css'

const Accordian = () => {
  const [selected, setSelected] = useState(null);
  const [enableMultiSelection, setEnableMultiSelection] = useState(false);
  const [multiple, setMultiple] = useState([]);
  const [button, setButton] = useState("Enable Multi Selection");

  const handleSingleSelect = (getCurrentId) => {
    setSelected(getCurrentId === selected ? null : getCurrentId);
  };
  const handleMultiSelection = (getCurrentId) => {
    let cpymultiple = [...multiple];
    const findIndex = cpymultiple.indexOf(getCurrentId);
    if (findIndex === -1) cpymultiple.push(getCurrentId);
    else cpymultiple.splice(findIndex, 1);

    setMultiple(cpymultiple);
  };

  const handleButton = ()=>{
    const multiSelection = !enableMultiSelection
    setEnableMultiSelection(multiSelection)
    
    multiSelection ? setButton("Disable Multi Selection") :
    setButton("Enable Multi Selection")    
  }
  return (
    <div className="wrapper">
      <button value={button} onClick={handleButton}>
        {button}
      </button>
      <div className="accordian">
        {data && data.length > 0 ? (
          data.map((dataItem) => (
            <div className="item">
              <div
                onClick={() =>
                  enableMultiSelection
                    ? handleMultiSelection(dataItem.id)
                    : handleSingleSelect(dataItem.id)
                }
                className="title"
              >
                <h3>{dataItem.question}</h3>
                <span>+</span>
              </div>
              {enableMultiSelection ? (
                multiple.indexOf(dataItem.id) !== -1 && (
                  <div className="content">{dataItem.answer}</div>
                )
              ) : selected === dataItem.id ? (
                <div className="content">{dataItem.answer}</div>
              ) : null}
            </div>
          ))
        ) : (
          <div>No Data Found</div>
        )}
      </div>
    </div>
  );
};

export default Accordian;
