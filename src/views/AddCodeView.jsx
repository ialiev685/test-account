import React from "react";
//format number
import NumberFormat from "react-number-format";

export const AddCodeView = () => {
  return (
    <div>
      <h2>Введите код подтверждения</h2>
      <p>Мы отправили письмо на masha@zenina.com</p>
      <NumberFormat defaultValue="000000" format="### - ###" />
    </div>
  );
};
