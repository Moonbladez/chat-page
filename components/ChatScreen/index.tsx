import { useState, ChangeEvent } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth, db } from "../../firebase";
import firebase from "firebase";
import { useRouter } from "next/router";
import { Avatar, IconButton } from "@material-ui/core";
import TimeAgo from "timeago-react";

import {
  Container,
  Header,
  HeaderInformation,
  HeaderIcons,
  MessageContainer,
  Input,
  EndOfMessage,
  InputContainer,
} from "./ChatScreenStyling";
import { GrMoreVertical } from "react-icons/gr";
import { MdAttachFile, MdInsertEmoticon } from "react-icons/md";
import { FaMicrophoneAlt } from "react-icons/fa";

import { SingleMessage } from "../SingleMessage";
import { getRecipientEmail } from "../../utils/getRecipientEmail";

export const ChatScreen = ({ chat, messages }): JSX.Element => {
  const router: { query: any } = useRouter();
  const [user] = useAuthState(auth);
  const [input, setInput] = useState("");

  const [messageSnapshot] = useCollection(
    db.collection("chats").doc(router.query.id).collection("messages").orderBy("timestamp", "asc")
  );
  const [recipientSnapshot] = useCollection(
    db.collection("users").where("email", "==", getRecipientEmail(chat.users, user))
  );

  //HANDLERS
  const showMessages = () => {
    if (messageSnapshot) {
      return messageSnapshot.docs.map((message: any) => (
        <SingleMessage
          key={message.id}
          user={message.data().user}
          message={{
            ...message.data(),
            timestamp: message.data().timestamp?.toDate().getTime(),
          }}
        />
      ));
      //before SSR
    } else {
      return JSON.parse(messages).map((message) => (
        <SingleMessage key={message.id} user={message.user} message={message} />
      ));
    }
  };

  const handleOnChange = (event) => {
    setInput(event.target.value);
  };

  const sendMessage = (event) => {
    event.preventDefault();
    //when user sends message, update last seen
    db.collection("users").doc(user.uid).set(
      {
        lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
    //set message to db
    db.collection("chats").doc(router.query.id).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      user: user.email,
      photoURL: user.photoURL,
    });

    //RESET INPUT
    setInput("");

    //scroll to bottom
  };

  const recipient = recipientSnapshot?.docs?.[0]?.data();
  const recipientEmail = getRecipientEmail(chat.users, user);

  return (
    <Container>
      <Header>
        {recipient ? <Avatar src={recipient?.photoURL} /> : <Avatar>{recipientEmail[0]}</Avatar>}
        <HeaderInformation>
          <h3>{recipientEmail}</h3>
          {recipientSnapshot ? (
            <p>
              {`Last active : ${
                recipient?.lastSeen?.toDate() ? <TimeAgo datetime={recipient?.lastSeen?.toDate()} /> : "Unavailable"
              }`}
            </p>
          ) : (
            <p>Loading Last active...</p>
          )}
        </HeaderInformation>
        <HeaderIcons>
          <IconButton>
            <GrMoreVertical />
          </IconButton>
          <IconButton>
            <MdAttachFile />
          </IconButton>
        </HeaderIcons>
      </Header>
      <MessageContainer>
        {showMessages()}
        <EndOfMessage />
      </MessageContainer>
      <InputContainer>
        <MdInsertEmoticon />
        <Input value={input} name="input" onChange={handleOnChange} />
        <button hidden disabled={!input} type="submit" onClick={sendMessage}>
          send button
        </button>
        <FaMicrophoneAlt />
      </InputContainer>
    </Container>
  );
};
