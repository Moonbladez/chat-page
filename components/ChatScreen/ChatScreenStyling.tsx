import styled from "styled-components";

export const Container = styled.div``;

export const Header = styled.header`
  position: sticky;
  background-color: white;
  z-index: 100;
  top: 0;
  display: flex;
  padding: 0.6875rem;
  height: 5rem;
  border-bottom: 1px solid whitesmoke;
`;

export const HeaderInformation = styled.div`
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

export const HeaderIcons = styled.div``;

export const MessageContainer = styled.div`
  padding: 2rem;
  background-color: #e5ded8;
  min-height: 90vh;
`;

export const StartOfMessage = styled.div`
  margin-top: 50px;
`;

export const EndOfMessage = styled.div`
  margin-bottom: 50px;
`;

export const Message = styled.div`
  border: 1px solid red;
`;

export const InputContainer = styled.form`
  display: flex;
  align-items: center;
  padding: 10px;
  position: sticky;
  bottom: 0;
  background-color: white;
  z-index: 100;
`;

export const Input = styled.input`
  flex: 1;
  outline: none;
  border: none;
  border-radius: 10px;
  background-color: whitesmoke;
  padding: 1rem;
  margin-left: 1rem;
  margin-right: 1rem;
`;
