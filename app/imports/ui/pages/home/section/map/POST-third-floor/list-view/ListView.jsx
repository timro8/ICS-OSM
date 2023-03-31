import React from 'react';
import { Accordion } from 'react-bootstrap';
import AccordionItem from 'react-bootstrap/AccordionItem';
import AccordionHeader from 'react-bootstrap/AccordionHeader';
import AccordionBody from 'react-bootstrap/AccordionBody';

const ListView = () => (
  <>
    <h2 style={{ margin: '15px 0' }}>List View</h2>
    <Accordion flush>
      <AccordionItem eventKey="0">
        <AccordionHeader>Rooms</AccordionHeader>
        <AccordionBody>
          <Accordion flush>
            <AccordionItem eventKey="0">
              <AccordionHeader>Vacant</AccordionHeader>
              <AccordionBody>Body</AccordionBody>
            </AccordionItem>
            <AccordionItem eventKey="1">
              <AccordionHeader>Occupied</AccordionHeader>
              <AccordionBody>Body</AccordionBody>
            </AccordionItem>
            <AccordionItem eventKey="2">
              <AccordionHeader>Out of Commission</AccordionHeader>
              <AccordionBody>Body</AccordionBody>
            </AccordionItem>
          </Accordion>
        </AccordionBody>
      </AccordionItem>
      <AccordionItem eventKey="1">
        <AccordionHeader>Faculties</AccordionHeader>
        <AccordionBody>
          <Accordion flush>
            <AccordionItem eventKey="0">
              <AccordionHeader>Assigned</AccordionHeader>
              <AccordionBody>Body</AccordionBody>
            </AccordionItem>
            <AccordionItem eventKey="1">
              <AccordionHeader>Unassigned</AccordionHeader>
              <AccordionBody>Body</AccordionBody>
            </AccordionItem>
          </Accordion>
        </AccordionBody>
      </AccordionItem>
    </Accordion>
  </>
);

export default ListView;
