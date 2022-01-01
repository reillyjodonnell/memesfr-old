import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faShare,
  faComment,
  faCrown,
  faHeart,
} from '@fortawesome/free-solid-svg-icons';
import '../../CSS Components/Mobile/SideCrownContainer.css';
import { user } from 'firebase-functions/lib/providers/auth';
import { ReactComponent as User } from '../../Assets/SVGs/user.svg';

export default function SideCrownContainer() {
  const currentUser = false;
  const thumbUp = false;
  const toggleThumbUp = () => {};
  const activatePrompt = () => {};
  const likes = 69;
  const comments = 420;
  const shares = 42069;

  return (
    <div className="side-crown-parent-container">
      <div className="side-crown-container">
        {/* <div className="heart-container">

              <HeartIcon
                className={
                  heart
                    ? 'active-heart heart-icon'
                    : 'heart-icon inactive-heart'
                }
                onClick={currentUser ? toggleHeart : activatePrompt}
              />
              <span
                className={
                  heart ? 'active-heart number-of-likes' : 'number-of-likes'
                }
              >
                1
              </span>
            </div> */}

        <div
          onClick={currentUser ? toggleThumbUp : activatePrompt}
          className="side-crown-container-icon-container"
        >
          {/* <LikeIcon
                style={thumbUp ? { fill: 'url(#thumb-grad)' } : null}
                className={thumbUp ? 'active-thumbup' : 'inactive-thumbup'}
                onClick={currentUser ? toggleThumbUp : activatePrompt}
              />
              <span
                className={
                  thumbUp ? 'active-thumbUp number-of-likes' : 'number-of-likes'
                }
              >
                {likes}
              </span> */}
          <span className="side-crown-container-icon">
            <FontAwesomeIcon
              icon={faCrown}
              style={{ width: '38px', height: '38px' }}
            />
          </span>
          <span className="side-crown-container-icon-count">{likes}</span>
        </div>
        {/* <div className="like-container">
                      <FontAwesomeIcon
                        icon={faHeart}
                        style={{ width: '1.5rem', height: '1.5rem' }}
                      />
                      <span className="number-of-likes">{comments}</span>
                    </div> */}

        <div className="side-crown-container-icon-container">
          <FontAwesomeIcon
            icon={faComment}
            style={{ width: '38px', height: '38px' }}
          />
          <span className="side-crown-container-icon-count">{comments}</span>
        </div>
        <div className="side-crown-container-icon-container">
          <FontAwesomeIcon
            icon={faShare}
            style={{ width: '38px', height: '38px' }}
          />
          <span className="side-crown-container-icon-count">{shares}</span>
        </div>
      </div>
    </div>
  );
}
