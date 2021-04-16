import styled from "styled-components";

export const SingleMessage = ({ user, message }): JSX.Element => {
  console.log("test");
  const Container = styled.div``;
  return (
    <Container>
      <p>{message}</p>
    </Container>
  );
};
