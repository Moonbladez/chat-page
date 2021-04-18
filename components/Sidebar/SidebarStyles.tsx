import { Button, Avatar } from "@material-ui/core";
import styled from "styled-components";

export const Container = styled.div`
  flex: 0.45;
  border: 1px solid whitesmoke;
  height: 100vh;
  min-width: 300px;
  max-width: 350px;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export const Header = styled.div`
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

export const UserAvatar = styled(Avatar)`
  cursor: pointer;

  :hover {
    opacity: 0.8;
  }
`;

export const IconsContainer = styled.div``;

export const Search = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 2px;
`;

export const SearchInput = styled.input`
  outline-width: 0;
  border: 0;
  flex: 1;
`;

export const SideBarButton = styled(Button)`
  width: 100%;
  &&& {
    border-bottom: 1px solid whitesmoke;
    border-top: 1px solid whitesmoke;
  }
`;
