import { useState, useEffect } from 'react';
import Styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerContent from './burger-content/burger-content';
import { bunsName, saucesName, mainsName } from './../../utils/data';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

function BurgerIngredients() {
  const [bunsCategoryActive, setBunsCategoryActive] = useState(true);
  const [saucesCategoryActive, setSaucesCategoryActive] = useState(false);
  const [mainsCategoryActive, setMainsCategoryActive] = useState(false);
  const [categories, setCategories] = useState();

  const { ingredients } = useSelector(store => store.ingredients);

  const bunNum = ingredients.filter(item => item.type === 'bun').length;
  const bunPosition = 54 + 208 * Math.trunc((bunNum + 1) / 2) + 32 * Math.trunc((bunNum - 1) / 2) + 40 //title+208*items+32*gaps+bottomPadding
  //console.log('bunsNum=', bunNum, ' bunPosition=', bunPosition);

  const sauceNum = ingredients.filter(item => item.type === 'sauce').length;
  const saucePosition = bunPosition + 54 + 208 * Math.trunc((sauceNum + 1) / 2) + 32 * Math.trunc((sauceNum - 1) / 2) + 40;//bunPos+title+208*items+32*gaps+bottomPadding
  //console.log('sauceNum=', sauceNum, ' saucePosition=', saucePosition);

  const scrollToBunCategory = () => {
    categories.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }

  const scrollToSauceCategory = () => {
    categories.scrollTo({
      top: bunPosition,
      left: 0,
      behavior: "smooth",
    });
  }

  const scrollToMainCategory = () => {
    categories.scrollTo({
      top: saucePosition,
      left: 0,
      behavior: "smooth",
    });
  }

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
  }

  function DisplayItem({ dataSet, productName }) {
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
              <BurgerContent key={dataItem._id} dataItem={dataItem} >
                <img src={dataItem.image} alt={dataItem.name} />
              </BurgerContent>
            </Link>
          ))
        }
        </div >
      </>
    );
  }

  useEffect(() => {
    setCategories(document.getElementById("categories"));
    function check() {
      if (categories === null || categories === undefined) {
        return;
      } else {
        categories.addEventListener("scroll", (evt) => {
          const scrollPosition = evt.target.scrollTop;
          if (scrollPosition < bunPosition) {
            setBunsCategoryActive(true);
            setSaucesCategoryActive(false);
            setMainsCategoryActive(false);
          }
          else if (scrollPosition < saucePosition) {
            setBunsCategoryActive(false);
            setSaucesCategoryActive(true);
            setMainsCategoryActive(false);
          }
          else {
            setBunsCategoryActive(false);
            setSaucesCategoryActive(false);
            setMainsCategoryActive(true);
          }
        });
      }
    }
    check();
  }, [categories]);

  return (
    <section className={Styles.contents}>
      <h1 className={Styles.title}>Соберите бургер</h1>
      <section className={Styles.tab}>
        <ShowTab />
      </section>
      <ul className={Styles.scrollbar} id="categories" >
        <DisplayItem dataSet={ingredients} productName={bunsName} />
        <DisplayItem dataSet={ingredients} productName={saucesName} />
        <DisplayItem dataSet={ingredients} productName={mainsName} />
      </ul>
    </section>
  );
};

export default BurgerIngredients;