import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase";
import moment from "moment";

import { Container, Sender, Receiver, TimeStamp } from "./SingleMessageStyles";

export const SingleMessage = ({ user, message }): JSX.Element => {
  const [userWhoIsLoggedIn] = useAuthState(auth);

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
