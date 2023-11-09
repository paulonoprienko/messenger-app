import React, { useEffect, useState } from "react";
import { useAuthContext } from "../contexts/auth/authContext";
import { useNavigate } from "react-router-dom";
import { Loader } from "@chatscope/chat-ui-kit-react";
import { Tab, Tabs } from "react-bootstrap";

const Login = () => {
  const { logInUser, register, user, error } = useAuthContext();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    if (user) {
      setLoading(false);
      if (user.token) {
        navigate("/");
      }
    }
  }, [user]);

  useEffect(() => {
    if (error) {
      setLoading(false);
      setErrorMsg(error.message);
    }
  }, [error]);

  useEffect(() => {
    setErrorMsg(null);
  }, []);

  return (
    <div className="account">
      <div className="account__wrapper">
        <Tabs defaultActiveKey="login" id="fill-tab-example" fill>
          <Tab eventKey="login" title="Вход" disabled={loading}>
            <div className="account__card">
              <div className="account__profile">
                <p className="account__name">
                  Войдите в ваш аккаунт или пройдите простенькую регистрацию
                </p>
              </div>
              <input
                name="username"
                placeholder="Имя пользователя"
                onInput={(e) => setUsername(e.target.value)}
                className="form-control"
                onFocus={() => setErrorMsg(null)}
              />
              <input
                type="password"
                name="password"
                placeholder="Пароль"
                onInput={(e) => setPassword(e.target.value)}
                className="form-control"
                onFocus={() => setErrorMsg(null)}
              />
              <button
                type="button"
                disabled={loading}
                onClick={() => {
                  logInUser(username, password);
                  setLoading((prev) => !prev);
                }}
                className="btn btn-primary account__btn"
              >
                {!loading ? <span>Войти</span> : <Loader />}
              </button>
              {loading && !error && (
                <span>
                  Пожалуйста, подождите немного, пока сервер запустится. Это
                  займёт не более минуты.
                </span>
              )}
              {errorMsg && (
                <span style={{ fontSize: "0.9em", color: "#c36565" }}>
                  {errorMsg}
                </span>
              )}
            </div>
          </Tab>
          <Tab eventKey="register" title="Регистрация" disabled={loading}>
            <div className="account__card">
              <div className="account__profile">
                <p className="account__name">
                  Придумайте имя пользователя и пароль любой сложности
                </p>
              </div>
              <input
                name="username"
                placeholder="Имя пользователя"
                onInput={(e) => setUsername(e.target.value)}
                className="form-control"
                onFocus={() => setErrorMsg(null)}
              />
              <input
                type="password"
                name="password"
                placeholder="Пароль"
                onInput={(e) => setPassword(e.target.value)}
                className="form-control"
                onFocus={() => setErrorMsg(null)}
              />
              <button
                type="button"
                disabled={loading}
                onClick={() => {
                  register(username, password);
                  setLoading((prev) => !prev);
                }}
                className="btn btn-primary account__btn"
              >
                {!loading ? <span>Войти в новый аккаунт</span> : <Loader />}
              </button>
              {loading && !error && (
                <span>
                  Пожалуйста, подождите немного, пока сервер запустится. Это
                  займёт не более минуты.
                </span>
              )}
              {errorMsg && (
                <span style={{ fontSize: "0.9em", color: "#c36565" }}>
                  {errorMsg}
                </span>
              )}
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default Login;
