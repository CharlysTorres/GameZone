import React from 'react';
import { Popover, Whisper } from 'rsuite';

import './styles.css';
import badges from '../../../badges.json';
import { Header } from '../../components/Header';
import { useAuth } from '../../hooks/useAuth';
import { ChallengesContext } from '../../contexts/ChallengesContext';

export function Details() {
  const { user } = useAuth();
  const { rank } = React.useContext(ChallengesContext);

  return (
    <div>
      <Header />
      <div className='details-profile-container'>
        <div className='card-details-profile'>
          <div className='wrapper-profiles'>
            <div className='profile-avatar'>
              <img src={user?.avatar} alt={user?.name} />
              <span>{user?.name}</span>
            </div>
            <div className='divider-vertical'></div>
            <div className='profile-rank'>
              <h4>Seu Rank</h4>
              <span className='your-rank font-bold text-4xl'>#<b className='font-bold text-5xl text-violet-500'>{rank}</b></span>
            </div>
          </div>
          <div className='wrapper-achievements'>
            <span className='text-xl font-bold mb-4'>Conquistas</span>
            <div className='achievements-content'>
              {
                badges.map((badge) => {
                  const speaker = (
                    <Popover title={badge.title}>
                      <p className='font-medium'>{badge.description}</p>
                    </Popover>
                  );
                  return (
                    <Whisper placement='bottom' trigger='hover' controlId='control-id-hover' speaker={speaker} key={badge.id}>
                      <img src={badge.badge} alt='' className={`${user?.level >= badge.require.level ? '' : 'hidden'}`} />
                    </Whisper>
                  );
                })
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
