import React, { useState } from 'react';
import { Jumbotron, Container, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';
import { searchEvents } from '../utils/API';

const SearchEvent = () => {
  // create state for holding returned api data
  const [searchedEvents, setSearchedEvents] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');


  // create method to search for Events and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const response = await searchEvents(searchInput);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const { items } = await response.json();

      const eventData = items.map((event) => ({
        eventId: event.id,
        authors: event.volumeInfo.authors || ['No author to display'],
        title: event.title,
        description: event.volumeInfo.description,
        url: event.url,
        image: event.volumeInfo.imageLinks?.thumbnail || '',
      }));

      setSearchedEvents(eventData);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Search for Events!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Form.Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name='searchInput'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='Search for a event'
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type='submit' variant='success' size='lg'>
                  Submit Search
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Container>
      </Jumbotron>

      <Container>
        <h2>
          {searchedEvents.length
            ? `Viewing ${searchedEvents.length} results:`
            : 'Search for a event to begin'}
        </h2>
        <CardColumns>
          {searchedEvents.map((event) => {
            return (
              <Card key={event.eventId} border='dark'>
                {event.image ? (
                  <Card.Img src={event.image} alt={`The cover for ${event.title}`} variant='top' />
                ) : null}
                <Card.Body>
                  <Card.Title>{event.title}</Card.Title>
                  <p className='small'>Authors: {event.authors}</p>
                  <Card.Text>{event.description}</Card.Text>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SearchEvent;