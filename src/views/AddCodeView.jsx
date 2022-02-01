import React, { useState, useEffect } from "react";
//format number
import NumberFormat from "react-number-format";
//router
import { useParams } from "react-router-dom";
//api
import { API } from "../services";

export const AddCodeView = () => {
  const [code, setCode] = useState("");
  const [userId, setUserId] = useState("");
  const params = useParams();
  // console.log("params", params);

  useEffect(() => {
    const { id } = params;
    setUserId(id);
  }, [params]);

  useEffect(() => {
    if (code.length === 7) {
      const cofirmData = {
        userId: Number(userId),
        confirmationCode: code,
      };
      // console.log("cofirmData", cofirmData);
      fetchConfirmEmail(cofirmData);
    }
  }, [code, code.length, userId]);

  const fetchConfirmEmail = async (data) => {
    const result = await API.fetchConfirmEmail(data);

    if (result?.status === 200) {
      console.log("Успех!!!");
    }
  };

  return (
    <div>
      <h2>Введите код подтверждения</h2>
      <p>Мы отправили письмо на masha@zenina.com</p>
      <NumberFormat
        format="###-###"
        placeholder="000-000"
        onValueChange={(values) => {
          // console.log("val", values);
          const { formattedValue } = values;
          setCode(formattedValue.trim());
        }}
      />
    </div>
  );
};
