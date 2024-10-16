import { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import GamerZone from '../../assets/GameZone.svg';
import { Dropdown } from '../Dropdown';

export function Header() {
  const [iconId, setIconId] = useState('');
  const navigate = useNavigate();

  function handleClickIcon(event: React.MouseEvent<HTMLElement, MouseEvent>, icon: string) {
    event.preventDefault();
    setIconId(icon); // seta o id do elemento clicado para ficar com o active

    switch (icon) {
      case 'home-icon':
        navigate('/'); // navega para a página principal
        break;
      case 'bedges-icon':
        navigate('/details'); // navega para a página de detalhes
        break;
      case 'leaderboard-icon':
        navigate('/leaderboard'); // navega para a página de logout
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    const iconElements = document.querySelectorAll('.icon-header');
    iconElements.forEach(item => {
      item.addEventListener('click', () => {
        iconElements.forEach(i => i.classList.remove('active-icon-header')); // remove active de todos os outros elementos
        if (item.id === iconId) {
          item.classList.remove('active-icon-header');
          setIconId(''); // remove o id do elemento clicado para não ficar com o active
        } else {
          item.classList.add('active-icon-header');
        }
      });
    });
  }, [iconId]);

  return (
    <header className={`flex justify-between items-center h-14 mt-6 px-10 mb-6 header`}>
      <div className="logo-header">
        <img src={GamerZone} alt="Gamer Zone Logo" />
      </div>
      <div className="nav-icons">
        <i className='bx bx-home text-4xl hover:text-violet-500 cursor-pointer icon-header ' id='home-icon' onClick={(e) => handleClickIcon(e,'home-icon')} ></i>
        <i className='bx bx-dice-3 text-4xl hover:text-violet-500 cursor-pointer icon-header' id='bedges-icon' onClick={(e) => handleClickIcon(e,'bedges-icon')} ></i>
        <i className='bx bx-award text-4xl hover:text-violet-500 cursor-pointer icon-header' id='leaderboard-icon' onClick={(e) => handleClickIcon(e,'leaderboard-icon')} ></i>
      </div>
      <div className="left-icon">
        <Dropdown icon='bxs-cog' />
      </div>
    </header>
  );
}
