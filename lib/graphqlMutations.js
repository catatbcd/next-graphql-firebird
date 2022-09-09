import { gql } from "@apollo/client";
const delUser = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(ID: $id)
  }
`;
const createUser = gql`
  mutation CreateUser($login: String!, $avatarUrl: String) {
    createUser(LOGIN: $login, AVATAR_URL: $avatarUrl) {
      ID
      LOGIN
      AVATAR_URL
    }
  }
`;
const editUser = gql`
  mutation EditUser($id: ID!, $login: String, $avatarUrl: String) {
    editUser(ID: $id, LOGIN: $login, AVATAR_URL: $avatarUrl) {
      ID
      LOGIN
      AVATAR_URL
    }
  }
`;
export { delUser, createUser, editUser };
