import { useMutation } from "@apollo/client";
import classes from "../styles/form.module.css";
import { createUser } from "../lib/graphqlMutations";
import { getUsers } from "../lib/graphqlQueries";
import useForm from "../utility/useForm";
export default function FormAdd() {
  const { inputs, handleChange, clearForm } = useForm({
    LOGIN: "",
    AVATAR_URL: "",
  })
  const [addUser, { data1, loading, error }] = useMutation(createUser, {
    refetchQueries: [
      { query: getUsers }, // DocumentNode object parsed with gql
      "GetUsers", // Query name
    ],
  });
 
  async function sendData(event) {
    event.preventDefault();
    addUser({ variables: { login: inputs.LOGIN, avatarUrl: inputs.AVATAR_URL } });
    clearForm()
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
          value={inputs.LOGIN}
          onChange={handleChange}
        ></input>
      </div>

      <div className={`${classes.input_container} ${classes.ic2}`}>
        <input
          className={classes.input}
          placeholder="Avatar"
          type={"text"}
          name="AVATAR_URL"
          value={inputs.AVATAR_URL}
          onChange={handleChange}
        ></input>
      </div>
      <br></br>
      <button className={classes.submit} type="submit">
        create user
      </button>
    </form>
  );
}
