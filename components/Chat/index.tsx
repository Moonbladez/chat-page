import { Avatar } from "@material-ui/core";
import { getRecipientEmail } from "../../utils/getRecipientEmail";
import { auth, db } from "../../firebase";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";

import { Container, UserAvatar } from "./ChatStyles";

export const Chat = ({ id, users }): JSX.Element => {
  const router = useRouter();
  const [user] = useAuthState(auth);

  const [recipientSnapshot] = useCollection(
    db.collection("users").where("email", "==", getRecipientEmail(users, user))
  );
  const recipientEmail = getRecipientEmail(users, user);

  const recipient = recipientSnapshot?.docs?.[0]?.data();

  //HANDLERS
  const enterChat = () => {
    router.push(`/chat/${id}`);
  };

  return (
    <Container onClick={enterChat}>
      {recipient ? (
        <UserAvatar src={recipient?.photoURL} />
      ) : (
        <UserAvatar color={"#7B1FA2"}>{recipientEmail[0].toUpperCase()}</UserAvatar>
      )}
      <p>{recipientEmail}</p>
    </Container>
  );
};
