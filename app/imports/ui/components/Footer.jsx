import React from 'react';
import { Container, Col } from 'react-bootstrap';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => {
  const divStyle = { paddingTop: '15px' };
  return (
    <footer className="bg-light footer mt-auto py-3 pt-1">
      <Container style={divStyle}>
        <Col className="text-center small">
          OSMICS <br />
          University of Hawaii<br />
          <a href="https://ics414t3.github.io/">https://ics414t3.github.io</a>
        </Col>
      </Container>
    </footer>
  );
};

export default Footer;
