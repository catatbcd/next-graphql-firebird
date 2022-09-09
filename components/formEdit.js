import { useState } from "react";
import client from "../apollo-client";
import { gql } from "@apollo/client";
import classes from '../styles/form.module.css'
export default function FormEdit(props){
    const user= props.user
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
        try {
          const result = await client.mutate({
            mutation: gql`
              mutation EditUser {
                editUser(ID: "${dataForm.ID}", LOGIN: "${dataForm.LOGIN}", AVATAR_URL: "${dataForm.AVATAR_URL}") {
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
      return(<form onSubmit={sendData} className={classes.form} >
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
        <button  className={classes.submit} type="submit">edit user</button>
      </form>)
}