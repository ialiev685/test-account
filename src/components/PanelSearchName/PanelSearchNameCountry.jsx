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

export const PanelSearchNameCountry = (props) => {
  const { onShow, getDataLocation } = props;

  const [query, setQuery] = useState("");
  const [token, setToken] = useState("");
  const [data, setData] = useState([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchListCountry = useCallback(
    debounce((value) => {
      const queryData = {
        name: value,
        languageCode: "RU",
      };

      API.fetchGetListCountry(token, queryData).then((response) => {
        if (response?.data) {
          const { data } = response.data;
          setData(data);
        }
      });
    }, 800),
    []
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  }, []);

  useEffect(() => {
    if (query && token) {
      fetchListCountry(query);
    }
  }, [fetchListCountry, query, token]);

  const handleBackdropClick = (e) => {
    if (e.currentTarget === e.target) {
      onShow();
    }
  };

  const handleChoose = (e) => {
    // const value = e.target.textContent.trim();
    const id = e.target.dataset.id;
    // const dataLocation = {
    //   [curGetLocation]: value,
    //   countryId: id,
    // };

    const dataSend = data.find(({ wikiDataId }) => wikiDataId === id);
    // getDataLocation(dataLocation);
    getDataLocation(dataSend);
    onShow();
  };

  return (
    <div className="overlay-search" onClick={handleBackdropClick}>
      <div className="panel-search">
        <div className="panel-search__header">
          <input
            autoFocus={true}
            autoComplete="off"
            placeholder="Введите страну"
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
            {data.map(({ wikiDataId, name }) => {
              return (
                <li
                  className="panel-search__item"
                  key={wikiDataId}
                  onClick={handleChoose}
                  data-id={wikiDataId}
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
