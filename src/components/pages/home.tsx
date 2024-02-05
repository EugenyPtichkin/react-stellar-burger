import Styles from './home.module.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from "react-dnd-html5-backend";
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

export const HomePage = () => {
  return (
    <main className={Styles.home}>
      <DndProvider backend={HTML5Backend} >
        <BurgerIngredients />
        <BurgerConstructor />
      </DndProvider>
    </main>
  )
}