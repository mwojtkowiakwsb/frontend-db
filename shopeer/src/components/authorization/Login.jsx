import { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import "./login.css";

const Login = ({setLoginStatus, setGuestMode}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:3000/api/login`, {method: "POST", body: JSON.stringify({email, password}), headers: { 'Content-Type': 'application/json'} })
    const data = await response.json(); 
    if (!data.error) {
      setLoginStatus(true);
      if (!data.isAdmin) {
        setGuestMode(true);
      }
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <h2>Login</h2>
          <Form onSubmit={handleLogin}>
            <Form.Group as={Row} controlId="formBasicEmail">
              <Form.Label column sm={12}>Email address</Form.Label>
              <Col sm={12}>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formBasicPassword">
              <Form.Label column sm={12}>Password</Form.Label>
              <Col sm={12}>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Col>
            </Form.Group>

            <Button variant="primary" type="submit" style={{marginTop: "10px"}}>
              Login
            </Button>
          </Form>
          <Button className='guestButton' onClick={() => {
            setGuestMode(true);
            setLoginStatus(true);
          }}>Przejdź jako gość</Button>{' '}
        </Col>
      </Row>
    </Container>
  );
};

export default Login;