import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Col, Container, Row, Table, Card } from 'react-bootstrap';
import { Stuffs } from '../../api/stuff/StuffCollection';
import StuffItemAdmin from '../components/StuffItemAdmin';
import LoadingSpinner from '../components/LoadingSpinner';
import { PAGE_IDS } from '../utilities/PageIDs';

/* Renders a table containing all of the Stuff documents. Use <StuffItemAdmin> to render each row. */
const ListStuffAdmin = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { stuffs, ready } = useTracker(() => {
    // Get access to Stuff documents.
    const subscription = Stuffs.subscribeStuffAdmin();
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    const items = Stuffs.find({}).fetch();
    return {
      stuffs: items,
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <Container id={PAGE_IDS.LIST_STUFF_ADMIN} className="py-3">
      <Row className="justify-content-center">
        <Col md={7}>
          <Card>
            <Card.Header>
              <Col className="text-center"><h2>Admin</h2></Col>
            </Card.Header>
            <Card.Body>
              <div className="scroll">
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Owner</th>
                      <th> </th>
                    </tr>
                  </thead>
                  <tbody>
                    {stuffs.map((stuff) => <StuffItemAdmin key={stuff._id} stuff={stuff} />)}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default ListStuffAdmin;
