import React from "react";
//icon
import { ReactComponent as CrossIcon } from "../../icons/cross.svg";
import { ReactComponent as SearchIcon } from "../../icons/search.svg";
//style
import "./PanelSearchName.scss";

export const PanelSearchName = ({ onShow }) => {
  return (
    <div className="overlay-search">
      <div className="panel-search">
        <div className="panel-search__header">
          <input
            autoComplete="off"
            placeholder="Введите страну"
            type="text"
            className="panel-search__control"
          />
          <SearchIcon className="iconSearch" />
          <button className="panel-search__buttonClose" onClick={onShow}>
            <CrossIcon />
          </button>
        </div>
        <div className="panel-search__body"></div>
      </div>
    </div>
  );
};
