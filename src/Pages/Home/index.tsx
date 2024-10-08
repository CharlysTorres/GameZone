import { useState, useEffect } from 'react';

import './styles.css';
import { Profile } from '../../components/Profile';
import { Header } from '../../components/Header';
import { Categories } from '../../components/Categories';
import { GamesList } from '../../components/GamesList';
import { Category } from '../../@types/category';
import { Modal } from '../../components/Modal';

export function Home() {
  const [selectCategory, setSelectCategory] = useState<Category | null>();

  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode | null>(null);

  function showModal() {
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
  }

  function handleModalContent(content: React.ReactNode) {
    setModalContent(content);
  }

  useEffect(() => {
    const categoryItems = document.querySelectorAll('.category-item');
    categoryItems.forEach(item => {
      item.addEventListener('click', () => {
        categoryItems.forEach(i => i.classList.remove('active')); // remove active de todos os outros elementos
        if (item.id === `category-${selectCategory?.id}`) {
          item.classList.remove('active');
          setSelectCategory(null); // remove categoria selecionada
        } else {
          item.classList.add('active');
        }
      });
    });
  }, [selectCategory]);

  return (
    <>
      <Header />
      <div className='container-dashboard'>
        <div className='wrapper-container'>
          <Profile />

          <div className='section-content-dashboard'>
            <Categories handleSelectCategory={(category) => setSelectCategory(category)} />
            <GamesList selectedCategory={selectCategory} showModal={showModal} handleModalContent={(content) => handleModalContent(content)} closeModal={closeModal} />
          </div>
        </div>
      </div>
      <Modal visible={modalOpen} content={modalContent} />
    </>
  );
}
