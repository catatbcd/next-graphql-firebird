import { gql } from "@apollo/client";
const getUsers = gql`
  query GetUsers {
    getUsers {
      ID
      LOGIN
      AVATAR_URL
    }
  }
`;
const getUser = gql`
  query GetUser($id: ID!) {
    getUser(ID: $id) {
      ID
      LOGIN
      AVATAR_URL
    }
  }
`;
export { getUsers, getUser };
