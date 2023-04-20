import "./auth.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authenticatedUser, UserData } from "../../@types";
import { authUser } from "../../Redux/authSlice";
import { userLogin } from "../../Firebase/firebaseFunctions";

function Login(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userData, setUserData] = useState<UserData>({
    emailID: "",
    password: "",
  });

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log(userData);

    userLogin(userData)
      .then((res: authenticatedUser) => {
        console.log(res);

        if (res.id !== "" && res.uid !== "" && res.emailID !== "") {
          localStorage.setItem("id", res.id ? res.id : "");
          localStorage.setItem("uid", res.uid ? res.uid : "");
          localStorage.setItem("emailID", res.emailID ? res.emailID : "");

          dispatch(authUser(res));
          navigate("/notes");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <section className="wrapper">
      <div className="home-body">
        <article className="card">
          <h1>Login</h1>

          <p className="card-text">
            Please fill the details to logged into Fire Notes application.
          </p>

          <form method="post" onSubmit={submitHandler}>
            <div
              style={{
                marginBottom: 20,
              }}
            >
              <label htmlFor="emailID">
                Email Address <span style={{ color: "tomato" }}>*</span>
              </label>
              <input
                type="email"
                name="emailID"
                id="emailID"
                placeholder="Enter email address"
                required
                className="form-control"
                onChange={changeHandler}
              />
            </div>

            <div
              style={{
                marginBottom: 20,
              }}
            >
              <label htmlFor="password">
                Password <span style={{ color: "tomato" }}>*</span>
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter password"
                required
                className="form-control"
                onChange={changeHandler}
              />
            </div>

            <div
              style={{
                marginBottom: 20,
              }}
            >
              <p style={{ marginBottom: 10 }}>
                Don't have an account? <Link to="/register">Register</Link>
              </p>
              <button className="button-main" style={{ width: "100%" }}>
                Submit
              </button>
            </div>
          </form>
        </article>
      </div>
    </section>
  );
}

export default Login;
