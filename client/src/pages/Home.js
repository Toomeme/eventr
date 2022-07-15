import React from 'react';
import ThoughtList from '../components/ThoughtList';
import { Link } from 'react-router-dom';
import FriendList from '../components/FriendList';

import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_THOUGHTS, QUERY_ME_BASIC } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_THOUGHTS);
  const { data: userData } = useQuery(QUERY_ME_BASIC);
  const thoughts = data?.thoughts || [];

  const loggedIn = Auth.loggedIn();

  return (
    <main>
        <div className='hero'>
        <div className='mt-5'>
        <h1 className='text-yellow'>Play</h1>
        <h2>and</h2>
        <h1 className='text-yellow'>Compete</h1>
        <h2>with</h2>
        <h1 className='text-orange'>Friends!</h1>
        <br></br>
        <div className='align-right-abs'>
        {loggedIn ? (
                    <Link to="/play">
                    <button className="btn col-12 col-md-3">
                     Go!
                    </button>
                    </Link>
          ) : (
            <Link to="/login">
            <button className="btn col-12 col-md-3">
             Go!
            </button>
            </Link>
          )}
        </div>
        </div>
      </div>
      <div className = 'heroborder'></div>
      <div className="flex-row justify-space-between mt-5">
        <div className={`col-12 mb-5 ${loggedIn && 'col-lg-8'}`}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ThoughtList
              thoughts={thoughts}
              title="Latest Events!"
            />
          )}
          <br/>
        </div>
        {loggedIn && userData ? (
          <div className="col-12 col-lg-3 mb-3">
            <FriendList
              username={userData.me.username}
              friendCount={userData.me.friendCount}
              friends={userData.me.friends}
            />
          </div>
        ) : null}
      </div>
    </main>
  );
};

export default Home;
