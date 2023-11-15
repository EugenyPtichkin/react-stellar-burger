import { useState, useEffect }  from 'react';
import Styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerContent from './burger-content/burger-content';
import { bunsName, saucesName, mainsName } from './../../utils/data';
import { sglDataPropType } from './../../utils/prop-types';
import { useSelector } from 'react-redux';
import { bunPosition, saucePosition } from './../../utils/data';

function BurgerIngredients() {

  const [bunsCategoryActive, setBunsCategoryActive] = useState(true);
  const [saucesCategoryActive, setSaucesCategoryActive] = useState(false);
  const [mainsCategoryActive, setMainsCategoryActive] = useState(false);
  const [categories, setCategories] = useState();

  const { ingredients } = useSelector(store => store.ingredients);

  function ShowTab() {    
    return (
      <div style={{ display: 'flex' }}>
        <Tab value='Булки' active={bunsCategoryActive}  >  {/* onClick={setBunsCategoryActive} */}
          {bunsName[1]}
        </Tab>
        <Tab value='Соусы' active={saucesCategoryActive} > {/*  onClick={setSaucesCategoryActive}> */}
          {saucesName[1]}
        </Tab>
        <Tab value='Начинки' active={mainsCategoryActive} > {/*  onClick={setMainsCategoryActive}> */}
          {mainsName[1]}
        </Tab>
      </div>
    )
  }

  function DisplayItem({ dataSet, productName}) {
    return (
      <>
        <h2 className={Styles.subtitle}>{productName[1]}</h2>
        <div className={Styles.layout}>  {
          dataSet.map((dataItem) => ((dataItem.type === productName[0]) &&
            <BurgerContent key={dataItem._id} dataItem={dataItem}>
              <img src={dataItem.image} alt={dataItem.name} />
            </BurgerContent>
          ))
        }
        </div>
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
          //console.log('scrollPosition:', scrollPosition)
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

BurgerContent.propTypes = {
  dataItem: sglDataPropType.isRequired
}

export default BurgerIngredients;