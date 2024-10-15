import React from 'react';
import { ref, orderByChild, query, onValue } from 'firebase/database';

import './styles.css'
import { useAuth } from '../../hooks/useAuth';
import { Header } from '../../components/Header';
import { database } from '../../services/firebase';
import LeaderboardItem from '../../components/LeaderboardItem';
import { ChallengesContext } from '../../contexts/ChallengesContext';

interface User {
  avatar: string;
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  name: string;
  id: string;
}

export function Leaderboard() {
  const { updateRank } = React.useContext(ChallengesContext);

  const { user } = useAuth();
  const [users, setUsers] = React.useState<User[]>([]);

  React.useEffect(() => {
    const usersRef = query(ref(database, 'users'), orderByChild('level'));
    onValue(usersRef, (snapshot) => {
      const usersData = snapshot.val();
      const cloneUsersData = [] as User[];
      Object.keys(snapshot.val()).forEach(userId => {
        cloneUsersData.push(usersData[userId]);
      });
      setUsers(cloneUsersData.sort((a, b) => b.level - a.level));

      if (user?.id !== undefined) {
        const userIndex = cloneUsersData.findIndex(u => u.id === user.id);
        updateRank(userIndex + 1);
      }
    }, {
      onlyOnce: false
    });
  }, []);

  return (
    <>
      <Header />
      <div className='container-leaderboard'>
        <div className='header-leaderboard'>
          <h3>Leaderboard</h3>
          <div className='sub-header-leaderboard'>
            <div className='block-leaderboard'>
              <span>POSIÇÃO</span>
              <span>USUÁRIO</span>
            </div>
            <div className='block-leaderboard'>
              <span>DESAFIOS</span>
              <span>EXPERIÊNCIA</span>
            </div>
          </div>
        </div>
        <div className='scroll-y-transparent'>
          {
            users?.map((userItem) => {
              return (
                <LeaderboardItem
                  key={userItem.id}
                  name={userItem.name}
                  image={userItem.avatar}
                  completedChallanges={userItem.challengesCompleted}
                  level={userItem.level}
                  position={users.indexOf(userItem) + 1}
                  totalExperience={userItem.currentExperience}
                />
              );
            })
          }
        </div>
      </div>
    </>
  );
}
