import { useState } from "react";
import { useMutation } from "@apollo/client";
import { editUser } from "../lib/graphqlMutations";
import { getUser } from "../lib/graphqlQueries";
import classes from "../styles/form.module.css";
export default function FormEdit(props) {
  const user = props.user;
  const [EditUser, { data1, loading, error }] = useMutation(editUser, {
    refetchQueries: [
      {
        query: getUser, // DocumentNode object parsed with gql
        variables: { id: user.ID },
      },
      "GetUser", // Query name
    ],
  });

  const [dataForm, setDataForm] = useState({
    ID: user.ID,
    LOGIN: user.LOGIN,
    AVATAR_URL: user.AVATAR_URL,
  });
  const handleInputChange = (event) => {
    setDataForm({
      ...dataForm,
      [event.target.name]: event.target.value,
    });
  };

  async function sendData(event) {
    event.preventDefault();
    EditUser({
      variables: {
        id: dataForm.ID,
        login: dataForm.LOGIN,
        avatarUrl: dataForm.AVATAR_URL,
      },
    });
  }
  return (
    <form onSubmit={sendData} className={classes.form}>
      <div className={classes.title}>Edit user</div>
      <div className={`${classes.input_container} ${classes.ic1}`}>
        <input
          className={classes.input}
          placeholder="Name"
          type={"text"}
          name="LOGIN"
          onChange={handleInputChange}
          defaultValue={user.LOGIN}
        ></input>
      </div>

      <div className={`${classes.input_container} ${classes.ic2}`}>
        <input
          className={classes.input}
          placeholder="Avatar"
          type={"text"}
          name="AVATAR_URL"
          onChange={handleInputChange}
          defaultValue={user.AVATAR_URL}
        ></input>
      </div>
      <br></br>
      <button className={classes.submit} type="submit">
        edit user
      </button>
    </form>
  );
}
