import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { authenticatedUser } from "../@types/index.d";

function HomeComponent(): JSX.Element {
  const select: authenticatedUser = useSelector(
    (state: any) => state.authSlicer
  );

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
            {select.uid && select.emailID ? (
              <Link to="/notes">
                <button className="button-main">Notes</button>
              </Link>
            ) : (
              <>
                <Link to="/login">
                  <button className="button-main">Login</button>
                </Link>
                <Link to="/register">
                  <button className="button-main">Register</button>
                </Link>
              </>
            )}
          </div>
        </article>
      </section>
    </>
  );
}

export default HomeComponent;
