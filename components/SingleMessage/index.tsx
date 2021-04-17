import styled from "styled-components";

export const SingleMessage = ({ user, message }): JSX.Element => {
  const Container = styled.div``;
  return (
    <Container>
      <p>{message.message}</p>
    </Container>
  );
};
