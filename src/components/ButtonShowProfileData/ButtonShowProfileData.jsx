import React, { useEffect, useState } from "react";
//style
import "./ButtonShowProfileData.scss";

export const ButtonShowProfileData = ({
  onShowDetalis,
  statusEmpty,
  stateShowDetalis,
}) => {
  const [style, setStyle] = useState("");
  const [caption, setCaption] = useState("");
  useEffect(() => {
    if (!statusEmpty) {
      setStyle("buttonProfile--empty");
      setCaption("Заполните профиль");
    }
    if (statusEmpty && stateShowDetalis) {
      setStyle("buttonProfile--noEmpty");
      setCaption("Скрыть подробности");
    }
    if (statusEmpty && !stateShowDetalis) {
      setStyle("buttonProfile--noEmptyHide");
      setCaption("Подробности");
    }
  }, [stateShowDetalis, statusEmpty]);

  return (
    <button
      className={`buttonProfile  ${style}`}
      onClick={() => {
        if (statusEmpty) onShowDetalis((prevState) => !prevState);
      }}
    >
      {caption}
    </button>
  );
};
