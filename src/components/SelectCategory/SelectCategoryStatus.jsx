import React, { useState, useEffect, useRef } from "react";
//style
import "./SelectCategory.scss";
//icon
import { ReactComponent as ArrowIcon } from "../../icons/arrowSelect.svg";

export const SelectCategoryStatus = (props) => {
  const { value, onChange, data, name = "unknow", className = "" } = props;

  const [hiddenList, setHiddenList] = useState(true);
  const [currentValue, setCurrentValue] = useState({
    target: { value: 0, text: "Статус" },
  });
  const [currentColor, setCurrentColor] = useState(false);
  const wrapperRef = useRef();

  useEffect(() => {
    if (value === "Статус") {
      setCurrentValue({ target: { value: 0, text: "Статус" } });
      setCurrentColor(false);
    }
  }, [value]);

  useEffect(() => {
    if (!hiddenList) {
      document.addEventListener("mousedown", handleClickOutside);

      window.addEventListener("keydown", function handleClick(e) {
        if (e.code === "Escape") {
          setHiddenList(true);
          window.removeEventListener("keydown", handleClick);
        }
      });
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [hiddenList]);

  const handleClickOutside = (e) => {
    if (!wrapperRef.current.contains(e.target)) {
      setHiddenList(true);
    }
  };

  const handleShowList = (e) => {
    setHiddenList((prevState) => !prevState);
  };

  const handleChoose = (e) => {
    const newCurrentValue = {
      target: {
        value: e.target.dataset.value,
        text: e.target.textContent,

        name,
      },
    };

    if (newCurrentValue.target.value !== 0) setCurrentColor(true);
    setCurrentValue(newCurrentValue);
    setHiddenList(true);

    if (typeof onChange === "function") onChange(newCurrentValue);
  };

  return (
    <div ref={wrapperRef} className={`select-category ${className}`}>
      <div onClick={handleShowList} className="select-category__header">
        <span
          className={`select-category__currentValue ${
            currentColor && "select-category__currentValue--black"
          }`}
          data-value={currentValue.target.value}
        >
          {currentValue.target.text}
        </span>
        <span
          className={`select-category__icon ${
            hiddenList && "select-category__body--hidden"
          }`}
        >
          <ArrowIcon />
        </span>
      </div>

      <div
        className={`select-category__body ${
          hiddenList && "select-category__body--hidden"
        }`}
      >
        <ul className="select-category__list">
          {data.map(({ id, name }) => {
            return (
              <li
                key={id}
                className="select-category__item"
                data-value={id}
                onClick={handleChoose}
              >
                {name}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
