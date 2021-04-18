import { auth, db } from "../../firebase";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { ChatScreen } from "../../components/ChatScreen";
import Head from "next/head";
import { useAuthState } from "react-firebase-hooks/auth";
import { getRecipientEmail } from "../../utils/getRecipientEmail";

import { Container, ChatContainer } from "./ChatPageStyles";

export default function ChatPage({ chat, messages }) {
  const [user] = useAuthState(auth);

  return (
    <Container>
      <Head>
        <title>Chat with {getRecipientEmail(chat.users, user)}</title>
      </Head>
      <Sidebar />
      <ChatContainer>
        <ChatScreen chat={chat} messages={messages} />
      </ChatContainer>
    </Container>
  );
}

interface Messages {
  id: string;
  user: string;
  timestamp: any;
  photoURL: string;
}

export async function getServerSideProps(context) {
  const ref = db.collection("chats").doc(context.query.id);

  // Prep the Messages...
  const messagesRes = await ref.collection("messages").orderBy("timestamp", "asc").get();

  const messages = messagesRes.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    .map((messages: Messages) => {
      return {
        ...messages,
        timestamp: messages.timestamp.toDate().getTime(),
      };
    });

  // Prep the Chats...
  const chatRes = await ref.get();
  const chat = {
    id: chatRes.id,
    ...chatRes.data(),
  };

  return {
    props: {
      messages: JSON.stringify(messages),
      chat: chat,
    },
  };
}
