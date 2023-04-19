import React from "react";
import { Link } from "react-router-dom";
import "./auth.css";

function Login(): JSX.Element {
  return (
    <section className="wrapper">
      <div className="home-body">
        <article className="card">
          <h1>Login</h1>

          <p className="card-text">
            Please fill the details to logged into Fire Notes application.
          </p>

          <form method="post">
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
