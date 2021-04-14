import styled from "styled-components";
import { MdChat, MdSearch } from "react-icons/md";
import { GrMoreVertical } from "react-icons/gr";
import * as EmailValidator from "email-validator";

import { Avatar, IconButton, Button } from "@material-ui/core";
import React from "react";

export const Sidebar = () => {
  const Container = styled.div``;

  const Header = styled.div`
    display: flex;
    position: sticky;
    top: 0;
    background-color: white;
    z-index: 1;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    height: 80px;
    border-bottom: 1px solid whitesmoke;
  `;

  const UserAvatar = styled(Avatar)`
    cursor: pointer;

    :hover {
      opacity: 0.8;
    }
  `;

  const IconsContainer = styled.div``;

  const Search = styled.div`
    display: flex;
    align-items: center;
    padding: 20px;
    border-radius: 2px;
  `;

  const SearchInput = styled.input`
    outline-width: 0;
    border: 0;
    flex: 1;
  `;

  const SideBarButton = styled(Button)`
    width: 100%;
    &&& {
      border-bottom: 1px solid whitesmoke;
      border-top: 1px solid whitesmoke;
    }
  `;

  //HANDLERS
  const createChat = () => {
    const input = prompt("Please enter an email address for the user you wish to chat with");

    if (!input) {
      return null;
    }

    if (EmailValidator.validate(input)) {
      //need to add chat into DB chats collection
    }
  };

  return (
    <Container>
      <Header>
        <UserAvatar />
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
      <SideBarButton onClick={createChat}>Start new Buton</SideBarButton>

      {/* list of chats */}
    </Container>
  );
};
