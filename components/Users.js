import {useQuery, gql } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";
import client from "../apollo-client";
import styles from '../styles/Home.module.css'
const getUsers = gql`
query GetUsers {
  getUsers {
    ID
    LOGIN
    AVATAR_URL
  }
}
`;
export default function Users(){
    const {loading, error, data } = useQuery(getUsers,{ pollInterval: 500 });
    async function deleteUser(id) {
      try {
        const result = await client.mutate({
          mutation: gql`
          mutation DeleteUser {
            deleteUser(ID: "${id}") 
            }
          `,
        });
        console.log(result);
      } catch (error) {
        console.log(error.message);
      }
    }
    if (loading) {
        return <h2><a href="#loading" aria-hidden="true" class="aal_anchor" id="loading"><svg aria-hidden="true" class="aal_svg" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Loading...</h2>;
      }
    
      if (error) {
        console.error(error);
        return null;
      }
      console.log(data)
      const users = data.getUsers
      
    console.log(users)
    return(
        <div className={styles.grid}>
            {users.map((el) => {
          return (
            <div key={el.ID} className={styles.card}>
              <h3><Link href={`/user/${el.ID}`}>
                <a>{el.LOGIN}</a>
              </Link></h3>
              <Image
                width={50}
                height={50}
                src={el.AVATAR_URL}
                alt={el.LOGIN}
              />
              <br></br><br></br>
              <button onClick={() => deleteUser(el.ID)}>Delete</button>
            </div>
          );
        })}
        </div>
    )
}