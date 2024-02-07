import Styles from './burger-content.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from '../../../services/hooks/hooks';
import { useDrag } from 'react-dnd';
import { FC } from 'react';
import { TIngredient } from '../../../services/types/data';

const BurgerContent: FC<{dataItem:TIngredient, children: JSX.Element}> = ({dataItem, children}: {dataItem:TIngredient, children: JSX.Element}) => {
   
  const [{ isDragging }, dragRef] = useDrag({
    type: 'ingredient',
    item: { dataItem },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  })

  const { bun, ingredients } = useSelector(store => store.burger);

  const CollapsableTextContent: FC<{ quantity: number }> = ({quantity}:{ quantity: number })  => {
    if (quantity === 0) {
      return null;
    }
    return <Counter count={quantity} size="default" extraClass='m-1' />
  }

  return (
    <>
      <section className={isDragging ? `${Styles.item} ${Styles.itemDrag}` : `${Styles.item}`}  ref={dragRef} >
        <div className={Styles.image}> {/*} ref={ref}> */}
          {children}
        </div>
        <div className={Styles.price}>
          <div className={Styles.price_value}>
            {dataItem.price}
          </div>
          <CurrencyIcon type="primary"></CurrencyIcon>
        </div>
        <p className={Styles.name}>{dataItem.name}</p>
        <CollapsableTextContent quantity={
          (dataItem.type === 'bun') && bun && (dataItem._id === bun._id) ? 2 :
          (dataItem.type !== 'bun') ? ingredients.filter(item => item._id === dataItem._id).length : 0} />
      </section>
    </>
  )
}

export default BurgerContent;

