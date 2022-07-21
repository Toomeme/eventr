import {React, useEffect,useState} from 'react';
import { useParams } from 'react-router-dom';
import { getAPIEvent} from '../utils/API';
import ReactionList from '../components/ReactionList';
import ReactionForm from '../components/ReactionForm';

import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_THOUGHT } from '../utils/queries';

const SingleThought = (props) => {
  const { id: Id } = useParams();

  const { loading, data } = useQuery(QUERY_THOUGHT, {
    variables: { id: Id },
  });

  const thought = data?.thought || {};

  const [retreivedEvents, setRetreivedEvents] = useState([]);
  // create method to get event by stored ID. Ideally we wouldn't have to make API calls this frequently, but this is fine for proof of concept.
  useEffect(() => {
  async function handleEventID () {
    if (!thought.thoughtImage) {
      return false;
    }

    try {
      const response = await getAPIEvent(thought.thoughtImage);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const { events } = await response.json();
      console.log(events);

      setRetreivedEvents(events);
    } catch (err) {
      console.error(err);
    }
    
  };
  handleEventID();
},[thought.thoughtImage]);


  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="card mb-3 text-light">
        <h2 className="ml-2">{retreivedEvents[0]?.title||"Loading..."}</h2>
        <h5 className="ml-2">{retreivedEvents[0]?.venue.name||"Loading..."}</h5>
        <p className="ml-2">Event Date: {retreivedEvents[0]?.datetime_local||"Loading..."}</p>
        <p className="card-header">
          <span style={{ fontWeight: 700 }} className="text-light">
            {thought.username}
          </span>{' '}
          on {thought.createdAt}
        </p>
        <div className="card-body">
      <a href = {retreivedEvents[0]?.url||"Loading..."}><img src = {retreivedEvents[0]?.performers[0].image||"Loading..."} alt ="Headline for the event"></img></a>
          <p>{thought.thoughtText}</p>
        </div>
      </div>

      {thought.reactionCount > 0 && (
        <ReactionList reactions={thought.reactions} />
      )}

      {Auth.loggedIn() && <ReactionForm Id={thought._id} />}
    </div>
  );
};

export default SingleThought;
