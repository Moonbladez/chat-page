import Head from "next/head";
import React from "react";
import styled from "styled-components";
import { Button } from "@material-ui/core";
import { auth, provider } from "../firebase";

export default function Login() {
  const Container = styled.main`
    display: grid;
    place-items: center;
    height: 100vh;
    background-color: whitesmoke;
  `;

  const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 6.25rem;
    background-color: white;
    border-radius: 5px;
    box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.2);
  `;

  const Logo = styled.img`
    height: 5rem;
    width: 5rem;
    margin-bottom: 2.5rem;
  `;

  const signIn = () => {
    auth.signInWithPopup(provider).catch(alert);
  };

  return (
    <Container>
      <Head>
        <title>Whats App 2.0 | Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LoginContainer>
        <Logo src="https://www.logo.wine/a/logo/WhatsApp/WhatsApp-Logo.wine.svg" />
        <Button variant="outlined" onClick={signIn}>
          Sign in with Google
        </Button>
      </LoginContainer>
    </Container>
  );
}
