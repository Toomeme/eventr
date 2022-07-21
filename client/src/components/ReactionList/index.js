import React from 'react';
import { Link } from 'react-router-dom';

const ReactionList = ({ reactions }) => {
  return (
    <div className="card mb-3">
      <div className="card-header">
        <span className="text-light">Comments:</span>
      </div>
      <div className="card-body">
        {reactions &&
          reactions.map(reaction => (
            <div className="mb-3" key={reaction._id}>
              <Link to={`/profile/${reaction.username}`}>
              <h5 style={{ fontWeight: 300 }}>{reaction.username} on {reaction.createdAt}</h5>
              </Link>
              <p className='text-light'>{reaction.reactionBody}{' '}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ReactionList;
