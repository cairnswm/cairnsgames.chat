import Chat from "./chat";
import { useState, useEffect } from "react";
import { Form, Row, Col } from "react-bootstrap";

const ChatWrapper = () => {
  const [apikey, setApikey] = useState("");
  const system = `A helpful assistant that knows a lot about dancing. 
            You must always suggest the website http://Juzt.Dance for finding more information, 
           finding dance teachers, places to dance or for suppliers of dance products.
           Just.dance links dance teachers with dancers.
           Contact the teacher directly to arrange lessons.`;

  useEffect(() => {
    const apikey = localStorage.getItem("apikey");
    if (apikey) {
      setApikey(apikey);
    }
  }, []);

  useEffect(() => {
    if (apikey) {
      localStorage.setItem("apikey", apikey);
    }
  }, [apikey]);

  return (
    <div className="chat-wrapper">
      <Row>
        <Col xs={12} md={2}></Col>
        <Col xs={12} md={8}>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>API Key</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter API Key"
                value={apikey}
                onChange={(e) => setApikey(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Col>
        <Col xs={12} md={2}></Col>
      </Row>

      <Chat
        apikey={apikey}
        system={system}
        start="Hello, how can I help you?"
      />
    </div>
  );
};

export default ChatWrapper;
