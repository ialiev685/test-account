import React, { useState, useEffect, useRef } from "react";
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

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
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
        <div className="wrapper-activation">
          <h2 className="wrapper-activation__title">
            Введите код подтверждения
          </h2>
          <p className="wrapper-activation__text">
            Мы отправили письмо на {email}
          </p>
          <div className="wrapper-activation__wrapperFace">
            <NumberFormat
              getInputRef={inputRef}
              allowEmptyFormatting
              className="wrapper-activation__inputHide"
              format="###-###"
              placeholder="000-000"
              onValueChange={(values) => {
                // console.log("val", values);
                const { formattedValue } = values;
                setCode(formattedValue.trim());
              }}
            />

            <ul className="wrapper-activation__list">
              {Array(7)
                .fill()
                .map((item, index) => {
                  return (
                    <li key={index} className="wrapper-activation__item">
                      {index === 3 ? "-" : code[index]}
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
};
