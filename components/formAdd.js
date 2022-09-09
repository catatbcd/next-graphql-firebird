import { useState } from "react";
import client from "../apollo-client";
import { gql } from "@apollo/client";
import classes from '../styles/form.module.css'
export default function FormAdd(props){
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
        try {
          const result = await client.mutate({
            mutation: gql`
            mutation CreateUser {
              createUser(LOGIN: "${data.LOGIN}", AVATAR_URL: "${data.AVATAR_URL}") {
                  ID
                  LOGIN
                  AVATAR_URL
                }
              }
            `,
          });
          console.log(result);
        } catch (error) {
          console.log(error.message);
        }
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
        <button className={classes.submit} type="submit">create user</button>
      </form>
      )
}