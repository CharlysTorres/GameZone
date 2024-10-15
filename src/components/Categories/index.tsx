import categories from './categories.json';
import { Category } from '../../@types/category';

interface CategoryProps {
  handleSelectCategory: (category: Category) => void;
}

export function Categories({handleSelectCategory}: CategoryProps) {
  return (
    <section className='categories'>
      <h3>Categorias</h3>
      <div className='category-grid'>
        {
          categories.map((category) => {
            // const icon = require(`../../assets/${category.icon}`).default;
            const icon = `/src/assets/${category.icon}?t=1727952054704`;
            return (
              <div className='category-item' key={category.id} id={`category-${category.id}`} onClick={() => handleSelectCategory(category)}>
                <img src={icon} alt={category.title} />
                <span>{category.title}</span>
              </div>
            );
          })
        }
      </div>
    </section>
  );
}
