import { useRef, useState, useMemo, useEffect} from 'react'; 
import PropTypes from 'prop-types';
import { sglDataPropType } from './../../../utils/prop-types';
import Styles from './burger-content.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from './../../modal/modal';
import IngredientDetails from './../../ingredient-details/ingredient-details';
import { useDispatch, useSelector } from 'react-redux';
import { fillItem, clearItem } from './../../services/actions/ingredient';
import { useDrag } from 'react-dnd';
//import { useInView } from 'react-intersection-observer';
//import { addYCoordinate } from './../../services/actions/position';

const BurgerContent = ({ dataItem, children}) => {   {/* setCurrentTab */}
  const [modalActive, setModalActive] = useState(false);

  const dispatch = useDispatch();

  const [{ isDragging }, dragRef] = useDrag({
    type: 'ingredient',
    item: dataItem,
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  })

  const handleOpen = () => {
    dispatch(fillItem(dataItem));
    setModalActive(true);
  };

  const handleClose = () => {
    dispatch(clearItem(dataItem));
    setModalActive(false);
  };

  /*const ref = useRef();
  const [positionY, setPositionY] = useState(0);
  useEffect(() => {
    setPositionY(ref.current.getBoundingClientRect().top)
  },[ref.current]);
  console.log(positionY); */


  /*const ref = useRef();
  const [bbox, setBbox] = useState({});
  const set = () => setBbox(ref && ref.current ? ref.current.getBoundingClientRect() : {});
    useEffect(() => {
    set();
    window.addEventListener('resize', set);
    return () => window.removeEventListener('resize', set);
  }, []);
  console.log(bbox.top);*/
  
  
/*  const [prevEntry, setPrevEntry] = useState({});
  const {ref, entry} = useInView();  
  if (entry && entry !== prevEntry) {
    setPrevEntry(entry);
//console.log(entry.boundingClientRect.y);  
//dispatch(addYCoordinate(dataItem, entry.boundingClientRect.y));
  if (dataItem.type === 'bun') {
     setCurrentTab('Булки'); 
  } else if (dataItem.type === 'sauce') {
    setCurrentTab('Соусы');   
  } else if (dataItem.type === 'main') {
    setCurrentTab('Начинки');       
  }
  else {}
};*/

  const { bun, ingredients } = useSelector(store => store.burger);

  function CollapsableTextContent({ quantity }) {
    if (quantity === 0) {
      return null;
    }
    return <Counter count={quantity} size="default" extraClass='m-1' />
  }

  return (
    <>
      <section className={isDragging ? `${Styles.item} ${Styles.itemDrag}` : `${Styles.item}`} onClick={handleOpen} ref={dragRef} >
        <div className={Styles.image} > {/*ref={ref}> */}
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
          (dataItem.type === 'bun') && bun && (dataItem._id === bun._id) ? 2 : 0 +
          (dataItem.type !== 'bun') && ingredients.filter(item => item._id === dataItem._id).length} />
      </section>
      {modalActive &&
        <div > {/*  onClick={handleAdd} > */}
          <Modal title="Детали ингредиента" handleClose={handleClose}>
            <IngredientDetails />
          </Modal>
        </div>
      }
    </>
  )
}

BurgerContent.propTypes = {
  dataItem: sglDataPropType.isRequired,
  children: PropTypes.node.isRequired,
};

export default BurgerContent;

