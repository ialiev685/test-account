import React, { useState, useEffect } from "react";
//format number
import NumberFormat from "react-number-format";
//router
import { useParams, useLocation, useNavigate } from "react-router-dom";
//api
import { API } from "../services";
//component
import { Container } from "../components/Container";
import { Section } from "../components/Section";

export const AddCodeView = () => {
  const [code, setCode] = useState("");
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");

  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  // console.log("params", params);

  useEffect(() => {
    const { id } = params;
    setUserId(id);
    const { email } = location.state;
    setEmail(email);
  }, [location.state, params]);

  useEffect(() => {
    if (code.length === 7) {
      const cofirmData = {
        userId: Number(userId),
        confirmationCode: code,
      };
      // console.log("cofirmData", cofirmData);
      // fetchConfirmEmail(cofirmData);
      API.fetchConfirmEmail(cofirmData).then((respone) => {
        if (respone?.status === 200) {
          navigate("/activate-profile", { state: { ...cofirmData } });
        }
      });
    }
  }, [code, code.length, navigate, userId]);

  return (
    <Section>
      <Container>
        <div>
          <h2>Введите код подтверждения</h2>
          <p>Мы отправили письмо на {email}</p>
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
      </Container>
    </Section>
  );
};
