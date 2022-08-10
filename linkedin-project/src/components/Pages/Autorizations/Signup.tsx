import React, { useState, useEffect, useMemo } from "react";
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
  const [show, setShow] = useState<String>('Show')
  const { request, err, setErr, clearError } = useHttp();
  const history = useHistory();
  const {showPasswordHandler} = Show();

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
                  type="password"
                  className="input"
                  name="password"
                  placeholder="Password"
                  value={login.password}
                  onChange={onChangeHandler}
                />

                <a
                  className="show__password"
                  onClick={() => showPasswordHandler(setShow)}
                >
                  {show}
                </a>
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
            <span className="or">Or</span>

            <button className="btn" type="submit">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="24"
                viewBox="0 0 22 24"
                fill="none"
              >
                <path
                  d="M12.1354 5.75C14.0004 5.75 15.4794 6.396 16.4204 7.33L19.0744 4.676C17.3544 3 14.9584 2 12.1354 2C8.1984 2 4.8554 4.148 3.1704 7.302L6.2004 9.7C7.0974 7.39 9.3304 5.75 12.1354 5.75Z"
                  fill="#E94435"
                ></path>
                <path
                  d="M5.7708 11.9896C5.7708 11.1806 5.9248 10.4106 6.2008 9.7006L3.1708 7.3016C2.4238 8.7006 1.9998 10.2946 1.9998 11.9896C1.9998 13.7206 2.4098 15.3266 3.1358 16.7256L6.1958 14.3026C5.9248 13.5956 5.7708 12.8206 5.7708 11.9896Z"
                  fill="#F8BB15"
                ></path>
                <path
                  d="M15.8107 17.3084C14.8667 17.8694 13.6267 18.2294 12.0107 18.2294C9.3627 18.2294 7.1007 16.6654 6.1957 14.3034L3.1357 16.7254C4.7837 19.9024 8.0767 22.0004 12.0107 22.0004C14.7537 22.0004 17.0727 21.1524 18.7877 19.6654L15.8107 17.3084Z"
                  fill="#34A751"
                ></path>
                <path
                  d="M22 11.9896C22 11.3086 21.931 10.6436 21.801 9.9996H12V13.9996H18.062L18.018 14.2496C17.784 15.4466 17.068 16.5606 15.811 17.3086L18.788 19.6656C20.818 17.9056 22 15.2466 22 11.9896Z"
                  fill="#547DBE"
                ></path>
              </svg>
              <span>Sigin, using Google</span>
            </button>
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
