import { useContext } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { ChallengesContext } from '../../contexts/ChallengesContext';

export function Profile() {
  const { user } = useAuth();
  const { level, currentExperience } = useContext(ChallengesContext);


  return (
    <section className='user-container-profile'>
      <div className='card-info-profile'>
        <img src={user?.avatar} alt='User Avatar' className='user-avatar' />
        <div className='user-info'>
          <h2 className='text-center'>{user?.name}</h2>
          <span className='text-center'>Level {(user?.level !== undefined && level < user.level) ? user?.level : level}</span>
        </div>
        <div className='xp-container'>
          <div></div>
          <span>{(user?.currentExperience !== undefined && currentExperience < user.currentExperience) ? user?.currentExperience : currentExperience} <b className='text-violet-500'>xp</b></span>
        </div>
      </div>
    </section>
  );
}
