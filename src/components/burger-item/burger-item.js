import Styles from './burger-item.module.css';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { useRef } from 'react';
import { useDrop, useDrag } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { deleteIngredient } from './../services/actions/burger';

export const BurgerItem = ({ dataItem, style, lock, index, handleSwitchItems}) => {

  const ref = useRef(null);
  const dispatch = useDispatch();  
  function handleDeleteItem() {
    dispatch(deleteIngredient(dataItem.uuid));
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
    hover(item) {
      const dragIndex = item.index;
      const hoverIndex = index;
      console.log(dragIndex, hoverIndex);
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
        {!lock && < DragIcon />}
          <ConstructorElement
            type={style}
            isLocked={lock}
            text={dataItem.name}
            price={dataItem.price}
            thumbnail={dataItem.image}
            handleClose={handleDeleteItem}
        />
      </div>
    </li>
  );
};

