import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase";
import moment from "moment";

import styled from "styled-components";

export const SingleMessage = ({ user, message }): JSX.Element => {
  const [userWhoIsLoggedIn] = useAuthState(auth);

  const Container = styled.div``;

  const MessageElement = styled.p`
    width: fit-content;
    padding: 1rem;
    border-radius: 0.5rem;
    margin: 10px;
    min-width: 60px;
    padding-bottom: 26px;
    position: relative;
    text-align: right;
  `;

  const Sender = styled(MessageElement)`
    margin-left: auto;
    background-color: #dcf8c6;
  `;

  const Receiver = styled(MessageElement)`
    text-align: left;
    background-color: whitesmoke;
  `;

  const TimeStamp = styled.span`
    color: grey;
    padding: 10px;
    font-size: 9px;
    position: absolute;
    bottom: 0;
    text-align: right;
    right: 0;
  `;

  const TypeOfUser = user === userWhoIsLoggedIn.email ? Sender : Receiver;
  return (
    <Container>
      <TypeOfUser>
        {message.message}
        <TimeStamp> {message.timestamp ? moment(message.timestamp).format("LT") : "..."}</TimeStamp>
      </TypeOfUser>
    </Container>
  );
};
