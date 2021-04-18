import styled from "styled-components";

export const Container = styled.div``;

export const MessageElement = styled.p`
  width: fit-content;
  padding: 1rem;
  border-radius: 0.5rem;
  margin: 10px;
  min-width: 60px;
  padding-bottom: 26px;
  position: relative;
  text-align: right;
`;

export const Sender = styled(MessageElement)`
  margin-left: auto;
  background-color: #dcf8c6;
`;

export const Receiver = styled(MessageElement)`
  text-align: left;
  background-color: whitesmoke;
`;

export const TimeStamp = styled.span`
  color: grey;
  padding: 10px;
  font-size: 9px;
  position: absolute;
  bottom: 0;
  text-align: right;
  right: 0;
`;
