import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./auth.css";
import auth_logo from "./auth-logo.jpg";
import { auth } from "../../config/firebase-config";
import { provider } from "../../config/firebase-config";
import { signInWithPopup } from "firebase/auth";
import { json } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";

const Auth = () => {
  const navigate = useNavigate();
  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    console.log(result); //it will give us info about logged in user
    const authInfo = {
      userID: result.user.id,
      name: result.user.displayName,
      email: result.user.email,
      profilePhoto: result.user.photoURL,
      isAuth: true,
    };
    //
    //every js application has local storage assocaited with it(check in inspect-browser-application)
    //we are going to store userInfo in local storage to check contionously whether users is still logged in or not
    //but in local storage we can only store string and not object
    //so we use ---json.stringlify used to convert js object to string
    localStorage.setItem("auth", JSON.stringify(authInfo));
    navigate("/exp-tracker");

    //instead of local storage we should make use of cookies for checking user-auth status
  };
  return (
    <div className="container-fluid d-flex justify-content-center align-items-center auth-page">
      <Card style={{ width: "25rem" }} className="auth-card">
        <Card.Img variant="top" src={auth_logo} className="auth-logo" />
        <Card.Body>
          <Card.Title className="fs-3 title text-center">
            Budget Buddy
          </Card.Title>
          <Card.Text>Sign in with Google</Card.Text>
          <Button
            variant="danger"
            className="login-google"
            onClick={signInWithGoogle}
          >
            Google
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Auth;
