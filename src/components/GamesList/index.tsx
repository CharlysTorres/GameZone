import { ReactNode } from 'react';

import gameLists from './games.json';
import { Category } from '../../@types/category';
import { GamesProps } from '../../@types/games';
import { ModalContentGame } from '../ModalContentGame';

interface GameListProps {
  selectedCategory: Category | null | undefined;
  showModal: () => void;
  closeModal: () => void; // Function to close the modal
  handleModalContent: (content: ReactNode) => void;
}

export function GamesList({selectedCategory, showModal, handleModalContent, closeModal}: GameListProps) {
  const popularGames = gameLists.filter(games => games.indication === 1) as GamesProps[];
  const youMayLike = gameLists.filter(games => games.indication === 2) as GamesProps[];
  const recommended = gameLists.filter(games => games.indication === 3) as GamesProps[];

  function handleGameContent(game: GamesProps) {
    showModal();
    handleModalContent(<ModalContentGame game={game} closeModal={closeModal} handleModalContent={handleModalContent} />);
  }

  return (
    <section className='game-lists'>
      <div className='wrapper-game'>
        <h3>Jogos Populares</h3>
        <div className='game-list scroll-y-transparent'>
          {
            popularGames.filter(filter => (!selectedCategory || filter.category === selectedCategory?.title)).map(game => (
              <div key={game.id} className='game-item' onClick={() => handleGameContent(game)}>
                <div className="game-icon">
                  <img src={`/src/assets/${game.icon}?t=1727952054704`} alt={game.name} />
                </div>
                <div className='game-info'>
                  <p>{game.name}</p>
                  <small>{game.category}</small>
                </div>
                <span><i className='bx bx-chevron-right'></i></span>
              </div>
            ))
          }
        </div>
      </div>

      <div className='wrapper-game'>
        <h3>Você pode gostar</h3>
        <div className='game-list scroll-y-transparent'>
          {
            youMayLike.filter(filter => (!selectedCategory || filter.category === selectedCategory?.title)).map(game => (
              <div key={game.id} className='game-item' onClick={() => handleGameContent(game)}>
                <div className="game-icon">
                  <img src={`/src/assets/${game.icon}?t=1727952054704`} alt={game.name} />
                </div>
                <div className='game-info'>
                  <p>{game.name}</p>
                  <small>{game.category}</small>
                </div>
                <span><i className='bx bx-chevron-right'></i></span>
              </div>
            ))
          }
        </div>
      </div>

      <div className='wrapper-game'>
        <h3>Recomendados</h3>
        <div className='game-list scroll-y-transparent'>
          {
            recommended.filter(filter => (!selectedCategory || filter.category === selectedCategory?.title)).map(game => (
              <div key={game.id} className='game-item' onClick={() => handleGameContent(game)}>
                <div className="game-icon">
                  <img src={`/src/assets/${game.icon}?t=1727952054704`} alt={game.name} />
                </div>
                <div className='game-info'>
                  <p>{game.name}</p>
                  <small>{game.category}</small>
                </div>
                <span><i className='bx bx-chevron-right'></i></span>
              </div>
            ))
          }
        </div>
      </div>
    </section>
  );
}
