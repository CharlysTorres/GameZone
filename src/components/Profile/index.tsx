import React from 'react';

export function Profile() {
  return (
    <section className='user-container-profile'>
      <div className='card-info-profile'>
        <img src='https://cdn3.pixelcut.app/1/3/profile_picture_1728ecf2bd.jpg' alt='User Avatar' className='user-avatar' />
        <div className='user-info'>
          <h2 className='text-center'>Alison Santos</h2>
          <span className='text-center'>Level 2</span>
        </div>
        <div className='xp-container'>
          <div></div>
          <span>220 <b className='text-violet-500'>xp</b></span>
        </div>
      </div>
    </section>
  );
}
