import { Avatar } from "@material-ui/core";
import { getRecipientEmail } from "../../utils/getRecipientEmail";
import { auth, db } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 1rem;
  word-break: break-word;
  :hover {
    background-color: #e9eaeb;
  }
`;

const UserAvatar = styled(Avatar)`
  margin: 5px;
  margin-right: 1rem;
  background-color: ${(props) => (props.color ? props.color : "rebeccapurple")};
`;

export const Chat = ({ id, users }): JSX.Element => {
  const [user] = useAuthState(auth);

  const [recipientSnapshot] = useCollection(
    db.collection("users").where("email", "==", getRecipientEmail(users, user))
  );
  const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  const recipientEmail = getRecipientEmail(users, user);

  const recipient = recipientSnapshot?.docs?.[0]?.data();

  return (
    <Container>
      {recipient ? (
        <UserAvatar src={recipient?.photoURL} />
      ) : (
        <UserAvatar color={randomColor}>{recipientEmail[0]}</UserAvatar>
      )}
      <p>{recipientEmail}</p>
    </Container>
  );
};
