import React, { useState } from 'react'
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
      <div className='text-light bg-dark'>
        <div className='container'>
          <h1>Search for Events!</h1>
          <form onSubmit={handleFormSubmit}>
                <textarea
                  name='searchInput'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="form-input col-12 col-md-9"
                  placeholder='Search for a event'
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
                <div className='card-header'>{event.title}</div>
                <div className='card-body'>
                  <p className='small'>Authors: {event.authors}</p>
                  <p>{event.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default SearchEvent;