import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Discussions } from '../../api/discussion/Discussion';
import LoadingSpinner from '../components/LoadingSpinner';
import Discussion from '../components/discussionpage/Discussion';

/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const DiscussionPage = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, discussions } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription = Discussions.subscribeDiscussionAdmin();
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    const discussionsItems = Discussions.find({}, { sort: { owner: 1 } }).fetch();
    return {
      discussions: discussionsItems,
      ready: rdy,
    };
  }, []);
  /** <Card> <Discussion ...../> </Card> -discussion will be set in place and the card need to appear before .map function to print the information cards* */
  return (ready ? (
    <Container className="py-3">
      <h1 className="text-center">UH Manoa Discussions Board</h1>
      <Row>
        <Col>
          <Button href="/addDis">Add</Button>
        </Col>
      </Row>
      <div className="scroll1">{discussions.map((discussion) => <Discussion key={discussion._id} discussion={discussion} />)} </div>
    </Container>
  ) : <LoadingSpinner message="Loading Stuff" />);
};

export default DiscussionPage;
