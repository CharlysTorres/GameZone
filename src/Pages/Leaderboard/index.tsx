import React from 'react';

import './styles.css'
import { Header } from '../../components/Header';
import LeaderboardItem from '../../components/LeaderboardItem';

export function Leaderboard() {
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
        <LeaderboardItem name='Charlys' image='https://www.github.com/charlystorres.png' completedChallanges={3} level={2} position={1} totalExperience={234} />
      </div>
    </>
  );
}
