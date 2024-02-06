import { useState, useEffect, useRef } from 'react';
import Styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerContent from './burger-content/burger-content';
import { bunsName, saucesName, mainsName } from '../../utils/data';
import { useSelector } from '../../services/hooks/hooks';
//import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { TIngredient } from '../../services/types/data';

const BurgerIngredients = () => {
  const [bunsCategoryActive, setBunsCategoryActive] = useState<boolean>(true);
  const [saucesCategoryActive, setSaucesCategoryActive] = useState<boolean>(false);
  const [mainsCategoryActive, setMainsCategoryActive] = useState<boolean>(false);
  const [categories, setCategories] = useState<HTMLElement | null>(null);

  const { ingredients } = useSelector(store => store.ingredients);

  const bunNum: number | undefined = ingredients?.filter(item => item.type === 'bun').length;
  const bunPosition: number = 54 + 208 * Math.trunc((bunNum? bunNum + 1 : 0) / 2) + 32 * Math.trunc((bunNum? bunNum - 1 : 0) / 2) + 40; //title+208*items+32*gaps+bottomPadding
  //console.log('bunsNum=', bunNum, ' bunPosition=', bunPosition);

  const sauceNum: number | undefined = ingredients?.filter(item => item.type === 'sauce').length;
  const saucePosition: number = bunPosition + 54 + 208 * Math.trunc((sauceNum? sauceNum + 1 : 0) / 2) + 32 * Math.trunc((sauceNum? sauceNum - 1 : 0) / 2) + 40 ;//bunPos+title+208*items+32*gaps+bottomPadding
  //console.log('sauceNum=', sauceNum, ' saucePosition=', saucePosition);

  const scrollToBunCategory = () => {
    categories?.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };
  const scrollToSauceCategory = () => {
    categories?.scrollTo({
      top: bunPosition,
      left: 0,
      behavior: "smooth",
    });
  };
  const scrollToMainCategory = () => {
    categories?.scrollTo({
      top: saucePosition,
      left: 0,
      behavior: "smooth",
    });
  };

  function ShowTab() {
    return (
      <div className={Styles.tab}>
        <Tab value='Булки' active={bunsCategoryActive} onClick={scrollToBunCategory} >
          {bunsName[1]}
        </Tab>
        <Tab value='Соусы' active={saucesCategoryActive} onClick={scrollToSauceCategory}>
          {saucesName[1]}
        </Tab>
        <Tab value='Начинки' active={mainsCategoryActive} onClick={scrollToMainCategory}>
          {mainsName[1]}
        </Tab>
      </div>
    )
  };

  const DisplayItem = ({ dataSet, productName }: { dataSet: Array<TIngredient>, productName: Array<string> }) => {
    const location = useLocation();

    return (
      <>
        <h2 className={Styles.subtitle}>{productName[1]}</h2>
        <div className={Styles.layout}>  {
          dataSet.map((dataItem) => ((dataItem.type === productName[0]) &&
            < Link
              key={dataItem._id}
              to={`/ingredients/${dataItem._id}`}
              state={{ background: location }}
              className={Styles.link}>
              <BurgerContent dataItem={dataItem} >
                <img src={dataItem.image} alt={dataItem.name} />
              </BurgerContent>
            </Link>
          ))
        }
        </div >
      </>
    );
  };


  useEffect(() => {
    setCategories(document.getElementById("categories"));
    function check() {
      if (categories === null || categories === undefined) {
        return;
      } else {
        categories.addEventListener("scroll", (evt: Event) => {
          const scrollPosition: number | undefined = categories.scrollTop;
          if (scrollPosition? scrollPosition < bunPosition: true) {  //булки
            setBunsCategoryActive(true);
            setSaucesCategoryActive(false);
            setMainsCategoryActive(false);
          }
          else if (scrollPosition? scrollPosition < saucePosition: false) {//соусы
            setBunsCategoryActive(false);
            setSaucesCategoryActive(true);
            setMainsCategoryActive(false);
          }
          else { //начинки
            setBunsCategoryActive(false);
            setSaucesCategoryActive(false);
            setMainsCategoryActive(true);          
          }
        });
      }
    }

    check();
  }, [categories, bunPosition, saucePosition]
  );

  return (
    <section className={Styles.contents}>
      <h1 className={Styles.title}>Соберите бургер</h1>
      <section className={Styles.tab}>
        <ShowTab />
      </section>
      {ingredients &&
        <ul className={Styles.scrollbar} id="categories" >
          <DisplayItem dataSet={ingredients} productName={bunsName} />
          <DisplayItem dataSet={ingredients} productName={saucesName} />
          <DisplayItem dataSet={ingredients} productName={mainsName} />
        </ul>}
    </section>
  );
}
export default BurgerIngredients;