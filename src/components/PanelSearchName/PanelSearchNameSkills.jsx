import React, { useState, useEffect, useCallback } from "react";

//icon
import { ReactComponent as CrossIcon } from "../../icons/cross.svg";
import { ReactComponent as SearchIcon } from "../../icons/search.svg";
//style
import "./PanelSearchName.scss";
//components
import { API } from "../../services";

//lodash
const debounce = require("lodash.debounce");

export const PanelSearchNameSkills = (props) => {
  const { onShow, getDataLocation } = props;

  const [query, setQuery] = useState("");
  const [token, setToken] = useState("");
  const [data, setData] = useState([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchListSkills = useCallback(
    debounce((value) => {
      API.fetchGetListSkills(token, value).then((response) => {
        if (response?.data) {
          const { skills } = response.data;
          setData(skills);
        }
      });
    }, 800),
    [token]
  );

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setToken(token);
    }
  }, []);

  useEffect(() => {
    if (query && token) {
      fetchListSkills(query);
    }
  }, [fetchListSkills, query, token]);

  const handleBackdropClick = (e) => {
    if (e.currentTarget === e.target) {
      onShow();
    }
  };

  const handleChoose = (e) => {
    // const value = e.target.textContent.trim();
    const idItem = Number(e.target.dataset.id);
    // const dataLocation = {
    //   [curGetLocation]: value,
    //   countryId: id,
    // };

    const dataSend = data.find(({ id }) => id === idItem);
    // getDataLocation(dataLocation);

    getDataLocation(dataSend);
    onShow("skills");
  };

  return (
    <div className="overlay-search" onClick={handleBackdropClick}>
      <div className="panel-search">
        <div className="panel-search__header">
          <input
            autoFocus={true}
            autoComplete="off"
            placeholder="Введите навык"
            type="text"
            className="panel-search__control"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <SearchIcon className="iconSearch" />
          <button className="panel-search__buttonClose" onClick={onShow}>
            <CrossIcon />
          </button>
        </div>
        <div className="panel-search__body">
          <ul className="panel-search__list">
            {data.map(({ id, name }) => {
              return (
                <li
                  className="panel-search__item"
                  key={id}
                  onClick={handleChoose}
                  data-id={id}
                >
                  {name}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};
