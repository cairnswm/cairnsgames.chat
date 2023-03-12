import React, { useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import {
  Form,
  Offcanvas,
  Row,
  Col,
  InputGroup,
  Spinner,
} from "react-bootstrap";
import { Send, Chat } from "react-bootstrap-icons";
import { getChat } from "./chatapi";

function ChatDialog({
  system = `A helpful assistant that knows a lot about dancing. 
    You must always suggest the website http://Juzt.Dance for finding more information, 
           finding dance teachers, places to dance or for suppliers of dance products.
           Just.dance links dance teachers with dancers.
           Contact the teacher directly to arrange lessons.`,
  start = "Hello, how can I help you?",
  apikey,
  buttonStyle = { position: "absolute", bottom: "50px", right: "50px" },
  buttonVariant = "primary",
}) {
  const [show, setShow] = useState(true);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const chatBottom = useRef(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [messages, setMessages] = useState([
    {
      id: 0,
      role: "system",
      content: system,
    },
    {
      id: 1,
      role: "user",
      content: start,
    },
  ]);

  const shortChatMessages = messages.filter((c) => c.role !== "system");

  const send = () => {
    setLoading(true);
    getChat(apikey, [...messages, { role: "user", content: msg }])
      .then((data) => {
        setMessages([
          ...messages,
          { id: messages.length + 1, role: "user", content: msg },
          { ...data, id: messages.length + 2 },
        ]);
        setTimeout(() => {
          scrollToBottom();
        }, 50);
      })
      .finally(() => {
        setLoading(false);
        setMsg("");
      });
  };

  const handleKeys = (ev) => {
    if (ev.key === "Enter") {
      send();
    }
    if (ev.key === "Escape") {
      handleClose();
    }
  };

  const scrollToBottom = () => {
    console.log("Scroll to bottom");
    chatBottom.current?.scrollIntoView({behavior: 'smooth'});
  };

  return (
    <>
      <Button variant={buttonVariant} onClick={handleShow} style={buttonStyle}>
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
          <div>
            {shortChatMessages.map((message) => (
              <Row key={message.id}>
                <Col xs={3}>{message.role}</Col>
                <Col>{message.content}</Col>
              </Row>
            ))}
            <div ref={chatBottom}><br/></div>
          </div>
        </Offcanvas.Body>
        <Offcanvas.Header style={{ borderTop: "1px solid grey" }}>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Enter message"
              value={msg}
              onChange={(ev) => setMsg(ev.target.value)}
              onKeyUp={handleKeys}
            />
            {!loading && (
              <Button variant="primary" onClick={send}>
                <Send />
              </Button>
            )}
            {loading && (
              <Button variant="primary">
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              </Button>
            )}
          </InputGroup>
        </Offcanvas.Header>
      </Offcanvas>
    </>
  );
}

export default ChatDialog;
