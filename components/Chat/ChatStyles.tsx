import styled from "styled-components";
import { Avatar } from "@material-ui/core";

export const Container = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 1rem;
  word-break: break-word;
  :hover {
    background-color: #e9eaeb;
  }
`;

export const UserAvatar = styled(Avatar)`
  margin: 5px;
  margin-right: 1rem;
  background-color: ${(props) => (props.color ? props.color : "rebeccapurple")};
`;
