import Styles from './burger-item.module.css';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC, useRef } from 'react';
import { useDrop, useDrag } from 'react-dnd';
import { useDispatch } from '../../services/hooks/hooks';
import { deleteIngredient } from '../../services/actions/burger';
import { TBurgerItem } from '../../services/types/data';

export const BurgerItem: FC<TBurgerItem> = ({ dataItem, index, handleSwitchItems}: TBurgerItem) => {

  const ref = useRef(null);
  const dispatch = useDispatch();  
  function handleDeleteItem() {
    if(dataItem.uuid) {
      dispatch(deleteIngredient(dataItem.uuid));
    }
  }

  const [{ isMoving }, move] = useDrag({
    type: 'item',
    item: {index},
    collect: monitor => ({
    isMoving: monitor.isDragging()
    })
  })

  const [{ isHover }, drop] = useDrop({
    accept: 'item',
    drop(item: {index: number}) {
      const dragIndex: number = item.index;
      const hoverIndex: number = index;
      handleSwitchItems(dragIndex, hoverIndex);
    },
    collect: monitor => ({
      isHover: monitor.isOver()
    })
  })

  move(drop(ref));

  return (
    <li className={Styles.layout} ref={ref}>
      <div className={isMoving ? `${Styles.chosableItem} ${Styles.isMoving}` :
                      isHover ? `${Styles.chosableItem} ${Styles.isHover}` : `${Styles.chosableItem}`}>
          <DragIcon type='primary'/>
          <ConstructorElement
            isLocked={false}
            text={dataItem.name}
            price={dataItem.price}
            thumbnail={dataItem.image}
            handleClose={handleDeleteItem}
        />
      </div>
    </li>
  );
};