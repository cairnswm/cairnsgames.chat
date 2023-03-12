import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { Form, Offcanvas, Row, Col, InputGroup } from "react-bootstrap";
import { Send, Chat } from "react-bootstrap-icons";

function ChatDialog({ system, start, apikey, onSend }) {
  const [show, setShow] = useState(true);
  const [msg, setMsg] = useState();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [messages, setMessages] = useState([
    {
      role: "system",
      content:system
    },
    {
      role: "user",
      content: start,
    },
  ]);


  console.log("messages", messages);

  const shortChatMessages = messages.filter((c) => c.role !== "system");
  console.log("shortChatMessages", shortChatMessages);

  const send = () => {
    onSend(msg);
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow} >
        <Chat />
      </Button>

      <Offcanvas
        show={show}
        onHide={handleClose}
        style={{ margin: "50px", borderRadius: "20px" }}
      >
        <Offcanvas.Header
          closeButton
          style={{ borderBottom: "1px solid grey" }}
        >
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {shortChatMessages.map((message) => (
            <Row>
              <Col xs={3}>{message.role}</Col>
              <Col>{message.content}</Col>
            </Row>
          ))}
        </Offcanvas.Body>
        <Offcanvas.Header
          style={{ borderTop: "1px solid grey" }}>
            <InputGroup>
            <Form.Control type="text" placeholder="Enter message" value={msg} onChange={ev => setMsg(ev.target.value)} />
          <Button variant="primary" onClick={send}>
            <Send />
          </Button>
          </InputGroup>
        </Offcanvas.Header>
      </Offcanvas>
    </>
  );
}

export default ChatDialog;
