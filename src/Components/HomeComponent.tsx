import React from "react";
import { Link } from "react-router-dom";

function HomeComponent(): JSX.Element {
  return (
    <>
      <section className="wrapper">
        <article className="home-body">
          <h1>Welcome to Fire Notes 🔥</h1>
          <div
            style={{
              width: "40%",
              display: "flex",
              justifyContent: "space-evenly",
            }}
          >
            <Link to="/login">
              <button className="button-main">Login</button>
            </Link>
            <Link to="/register">
              <button className="button-main">Register</button>
            </Link>
          </div>
        </article>
      </section>
    </>
  );
}

export default HomeComponent;
