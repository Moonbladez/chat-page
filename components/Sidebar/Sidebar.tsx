import { MdChat, MdSearch } from "react-icons/md";
import { GrMoreVertical } from "react-icons/gr";
import * as EmailValidator from "email-validator";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { IconButton } from "@material-ui/core";
import { Chat } from "../Chat";
import { auth, db } from "../../firebase";

import { Container, Header, UserAvatar, IconsContainer, Search, SearchInput, SideBarButton } from "./SidebarStyles";

export const Sidebar = () => {
  const [user] = useAuthState(auth);
  const userChatRef = db.collection("chats").where("users", "array-contains", user.email);
  const [chatsSnapshot] = useCollection(userChatRef);

  //HANDLERS
  const createChat = (): void => {
    const input = prompt("Please enter an email address for the user you wish to chat with");

    if (!input) {
      return null;
    }

    if (EmailValidator.validate(input) && !chatAlreadyExists(input) && input !== user.email) {
      //need to add chat into DB chats collection
      db.collection("chats").add({
        //arr containing user logged in and input of prompt
        users: [user.email, input],
      });
    }
  };

  const chatAlreadyExists = (recipientEMail: string) => {
    return !!chatsSnapshot?.docs.find((chat) => chat.data().users.find((user) => user === recipientEMail)?.length > 0);
  };

  return (
    <Container>
      <Header>
        <UserAvatar onClick={() => auth.signOut()} src={user.photoURL} />
        <IconsContainer>
          <IconButton>
            <MdChat />
          </IconButton>
          <IconButton>
            <GrMoreVertical />
          </IconButton>
        </IconsContainer>
      </Header>

      <Search>
        <MdSearch />
        <SearchInput placeholder="search" />
      </Search>
      <SideBarButton onClick={createChat}>New Chat</SideBarButton>

      {/* list of chats */}

      {chatsSnapshot?.docs.map((chat) => {
        return <Chat key={chat.id} id={chat.id} users={chat.data().users} />;
      })}
    </Container>
  );
};
