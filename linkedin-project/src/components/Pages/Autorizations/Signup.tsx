import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IUser } from "../../../types/interface";
import { useHttp } from "../../../hooks/http.hooks";
import { useHistory } from "react-router-dom";
import {Show} from '../../../helper/Show'

let message: any;
const Signup: React.FC = () => {
  const [login, setLogin] = useState<IUser>({
    username: "",
    email: "",
    password: "",
  });
  const { request, err, setErr, clearError } = useHttp();
  const history = useHistory();
  const {togglePassword, passwordShown} = Show();

  useEffect(() => {
    clearError();
  }, [err, clearError])

  const onChangeHandler = ({ currentTarget: input }: any) => {
    setLogin({
      ...login,
      [input.name]: input.value,
    });
  };

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const form = await request("http://localhost:8080/api/signup", "POST", {
        ...login,
      });
      message = form.message;

      setLogin({
        username: "",
        email: "",
        password: "",
      });

      history.push("/");
    } catch (error: any) {
      setErr(`${error.message}`);
    }
  };

  return (
    <>
      <div className="main">
        <div className="container">
          <div className="sigin__inner">
            <div className="sigin__content">
              <h1 className="sigin__title">Signup</h1>
            </div>
            <form className="form" onSubmit={onSubmitHandler}>
              <div>
                <input
                  type="text"
                  className="input"
                  name="username"
                  placeholder="Username"
                  value={login.username}
                  onChange={onChangeHandler}
                />
              </div>

              <div>
                <input
                  type="email"
                  className="input"
                  name="email"
                  placeholder="Email Address"
                  value={login.email}
                  onChange={onChangeHandler}
                />
              </div>

              <div className="password">
                <input
                  id="password"
                  type={passwordShown ? "text" : "password"}
                  className="input"
                  name="password"
                  placeholder="Password"
                  value={login.password}
                  onChange={onChangeHandler}
                />

                <span
                  className="show__password"
                  onClick={togglePassword}
                >
                  {passwordShown ? 'Show' : 'Hide'}
                </span>
              </div>

              {err ? (
                <div className="error__result">{`${err}`}</div>
              ) : message ? (
                <div className="successfully">{message}</div>
              ) : (
                ""
              )}
              <button className="button">Signup</button>
            </form>
          </div>
          <div className="registration__link">
            <span>Have an Account?</span>
            <Link to={"/"}>Sigin</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
