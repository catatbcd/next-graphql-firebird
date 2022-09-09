import { useState } from "react";
import { useMutation } from "@apollo/client";
import classes from "../styles/form.module.css";
import { createUser } from "../lib/graphqlMutations";
import { getUsers } from "../lib/graphqlQueries";
export default function FormAdd(props) {
  const [addUser, { data1, loading, error }] = useMutation(createUser, {
    refetchQueries: [
      { query: getUsers }, // DocumentNode object parsed with gql
      "GetUsers", // Query name
    ],
  });
  const [data, setData] = useState({
    LOGIN: "",
    AVATAR_URL: "",
  });
  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };
  async function sendData(event) {
    event.preventDefault();
    addUser({ variables: { login: data.LOGIN, avatarUrl: data.AVATAR_URL } });
  }
  return (
    <form onSubmit={sendData} className={classes.form}>
      <div className={classes.title}>New user</div>
      <div className={`${classes.input_container} ${classes.ic1}`}>
        <input
          className={classes.input}
          placeholder="Name"
          type={"text"}
          name="LOGIN"
          onChange={handleInputChange}
        ></input>
      </div>

      <div className={`${classes.input_container} ${classes.ic2}`}>
        <input
          className={classes.input}
          placeholder="Avatar"
          type={"text"}
          name="AVATAR_URL"
          onChange={handleInputChange}
        ></input>
      </div>
      <br></br>
      <button className={classes.submit} type="submit">
        create user
      </button>
    </form>
  );
}
