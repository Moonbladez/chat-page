import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth, db } from "../../firebase";
import { useRouter } from "next/router";
import { Avatar, IconButton } from "@material-ui/core";

import styled from "styled-components";
import { GrMoreVertical } from "react-icons/gr";
import { MdAttachFile, MdInsertEmoticon } from "react-icons/md";
import { FaMicrophoneAlt } from "react-icons/fa";

import { SingleMessage } from "../SingleMessage";

export const ChatScreen = ({ chat, messages }): JSX.Element => {
  const router: { query: any } = useRouter();
  const [user] = useAuthState(auth);

  const [messageSnapshot] = useCollection(
    db.collection("chats").doc(router.query.id).collection("messages").orderBy("timestamp", "asc")
  );

  const Container = styled.div``;

  const Header = styled.header`
    position: sticky;
    background-color: white;
    z-index: 100;
    top: 0;
    display: flex;
    padding: 0.6875rem;
    height: 5rem;
    border-bottom: 1px solid whitesmoke;
  `;

  const HeaderInformation = styled.div`
    margin-left: 1rem;
    flex: 1;

    h3 {
      margin-top: 0;
      margin-bottom: 3px;
    }

    p {
      font-size: 0.875rem;
    }
  `;

  const HeaderIcons = styled.div``;

  const MessageContainer = styled.div`
    padding: 2rem;
    background-color: #e5ded8;
    min-height: 90vh;
  `;

  const EndOfMessage = styled.div``;

  const Message = styled.div`
    border: 1px solid red;
  `;

  const InputContainer = styled.form`
    display: flex;
    align-items: center;
    padding: 10px;
    position: sticky;
    bottom: 0;
    background-color: white;
    z-index: 100;
  `;

  const Input = styled.input`
    flex: 1;
    outline: none;
    border: none;
    border-radius: 10px;
    background-color: whitesmoke;
    padding: 1rem;
    margin-left: 1rem;
    margin-right: 1rem;
  `;

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
    } else {
      return JSON.parse(messages).map((message) => (
        <SingleMessage key={message.id} user={message.user} message={message} />
      ));
    }
  };

  return (
    <Container>
      <Header>
        <Avatar />
        <HeaderInformation>
          <h3>Recipient Email</h3>
          <p>Last Seen: </p>
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
        <Input />
        <FaMicrophoneAlt />
      </InputContainer>
    </Container>
  );
};
