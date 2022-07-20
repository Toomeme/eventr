import React, { useState } from 'react';
import { searchAPIEvents } from '../utils/API';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';

const SearchEvents = () => {
  // create state for holding returned google api data
  const [searchedEvents, setSearchedEvents] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');

  const loggedIn = Auth.loggedIn();

  // create method to search for events and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const response = await searchAPIEvents(searchInput);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const { events } = await response.json();
      console.log(events);

      const eventData = events.map((event) => ({
        eventId: event.id,
        venue: event.venue.name || ['No author to display'],
        title: event.title,
        datetime_local: event.datetime_local,
        link: event.url,
        image: event.performers[0].image || '',
      }));

      setSearchedEvents(eventData);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className='text-light bg-dark'>
        <div className='container'>
          <h1>Search for Events!</h1>
          <form onSubmit={handleFormSubmit}>
                <textarea
                  name='searchInput'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="form-input col-12 col-md-9"
                  placeholder='Search for an event'
                />
                <button className="btn col-12 col-md-3" type="submit">
                Submit
                </button>
          </form>
        </div>
      </div>

      <div className='container'>
        <h2>
          {searchedEvents.length
            ? `Viewing ${searchedEvents.length} results:`
            : 'Search for a event to begin'}
        </h2>
        <div className='flex-column'>
          {searchedEvents.map((event) => {
            return (
              <div className='card' key={event.eventId}>
                {event.image ? (
                  <img src={event.image} alt={`The banner for ${event.title}`}/>
                ) : null}
                <a href = {event.link}><div className='card-header'>{event.title}</div></a>
                <div className='card-body'>
                  <p className='small'>Venue: {event.venue}</p>
                  <p>{event.datetime_local}</p>
                </div>
                {loggedIn ? (
                  <Link to={{
                      pathname:`/submit/${event.eventId}`,
                      state:{
                        eventId: event.eventId,
                        venue: event.venue,
                        title: event.title,
                        datetime_local: event.datetime_local,
                        link: event.link,
                        image: event.image,
                      }
                    }}>
                    <button className="btn col-12 col-md-3">
                     Go!
                    </button>
                  </Link>
                ) : (
                  <Link to="/login">
                  <button className="btn col-12 col-md-3">
                  Go!
                  </button>
                  </Link>)}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default SearchEvents;