import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

export default function SignUp() {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const nicknameRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  /*  handle click submit   */
  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Password do not match");
    }

    const user = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
      nickname: nicknameRef.current.value,
    };

    try {
      setError("");
      setLoading(true);
      /*  create user by making post request with input from the user to the server and server put in DynamoDB Aws  */

      await axios
        .post(`${process.env.REACT_APP_URL}/api/users/create`, { user })
        .then((res) => {
          const data = res.data;
          if (data !== null) {
            const user = {
              username: data.user.username,
              password: data.user.password,
            };
            history.push({
              pathname: "/homepage",
              state: { detail: user },
            });
          } else {
            setError("Failed to create an account");
          }
        });
    } catch {
      setError("Failed to create an account");
    }

    setLoading(false);
  }

  /*  rendring Signup page  */
  return (
    <div className="w-100 " style={{ maxWidth: "400px" }}>
      <Card style={{ background: "#fff5ee" }}>
        <Card.Body>
          <h2 className="text-center md-4">Sign Up</h2>
          {/* {JSON.stringify(currentUser)} */}
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="username">
              <Form.Label>User Name</Form.Label>
              <Form.Control type="text" ref={usernameRef} required />
            </Form.Group>

            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>

            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>

            <Form.Group id="nickname">
              <Form.Label>Nick Name</Form.Label>
              <Form.Control type="text" ref={nicknameRef} required />
            </Form.Group>

            <Button
              disabled={loading}
              className="w-100 text-center mt-2"
              type="submit"
            >
              Sign up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to={"/login"}>Log in</Link>
      </div>
    </div>
  );
}
