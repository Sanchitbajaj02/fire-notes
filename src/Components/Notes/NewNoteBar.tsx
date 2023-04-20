import React, { useState } from "react";
import { useNavigate } from "react-router";
import { authenticatedUser, SingleNote } from "../../@types/index.d";
import { useSelector, useDispatch } from "react-redux";
import { addNote } from "../../Redux/noteSlice";
import { addNoteToDB, googleSignout } from "../../Firebase/firebaseFunctions";

function NewNoteBar(): JSX.Element {
  const colors = ["#fe9b72", "#fec971", " #00d4fe", "#b693fd", "#e4ee91"];

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const select: authenticatedUser = useSelector(
    (state: any) => state.authSlicer
  );

  const [noteData, setNoteData] = useState<SingleNote>({
    uid: select.uid,
    noteTitle: "",
    noteDescription: "",
    color: "",
    createdAt: new Date().toString(),
  });

  const changeNoteHandler = (event: React.ChangeEvent<HTMLElement>) => {
    const { name, value } = event.target as HTMLInputElement;

    setNoteData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const submitNoteHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log(noteData);

    addNoteToDB(noteData)
      .then((resp: boolean) => {
        if (resp) {
          dispatch(addNote(noteData));
        }
        setNoteData({
          uid: select.uid,
          noteTitle: "",
          noteDescription: "",
          color: "",
          createdAt: new Date().toString(),
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const signoutHandler = () => {
    googleSignout()
      .then((res) => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="sidebar">
      <form method="post" onSubmit={submitNoteHandler}>
        <div
          style={{
            marginBottom: 20,
          }}
        >
          <label htmlFor="noteTitle">Enter Note's Title</label>
          <input
            type="text"
            name="noteTitle"
            id="noteTitle"
            placeholder="Enter title"
            className="form-control"
            defaultValue={noteData.noteTitle ? noteData.noteTitle : ""}
            onChange={changeNoteHandler}
          />
        </div>

        <div
          style={{
            marginBottom: 20,
          }}
        >
          <label htmlFor="noteDescription">Enter Description</label>

          <textarea
            name="noteDescription"
            id="noteDescription"
            cols={30}
            rows={5}
            className="form-control"
            placeholder="Enter description"
            defaultValue={
              noteData.noteDescription ? noteData.noteDescription : ""
            }
            onChange={changeNoteHandler}
          ></textarea>
        </div>

        <div
          style={{
            marginBottom: 20,
          }}
        >
          <label htmlFor="color">Choose the note color</label>

          <ul className="sidebar-list">
            {colors.map((item: string, index: number) => (
              <li
                key={index}
                className="sidebar-list-item"
                style={{
                  backgroundColor: item,
                  borderWidth: 1,
                  borderStyle: "solid",
                  borderColor: item === noteData.color ? "#000" : "#fff",
                }}
                onClick={() =>
                  setNoteData((prev) => ({ ...prev, color: item }))
                }
              />
            ))}
          </ul>
        </div>

        <div
          style={{
            marginBottom: 20,
          }}
        >
          <button
            type="submit"
            className="button-main"
            style={{ width: "100%" }}
          >
            Add note
          </button>
        </div>
      </form>

      <div>
        <button
          className="button-main"
          style={{ width: "100%" }}
          onClick={signoutHandler}
        >
          Signout
        </button>
      </div>
    </div>
  );
}

export default NewNoteBar;
