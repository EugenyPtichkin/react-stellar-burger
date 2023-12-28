import Styles from './ingredient-details.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { fillItem, clearItem } from '../../services/actions/ingredient';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

function IngredientDetails() {
  const dispatch = useDispatch();
  
  const ingredients = useSelector(store => store.ingredients.ingredients);
  console.log(ingredients);
  const { ingredientId } = useParams();
  console.log(ingredientId);
   
  if (!ingredients) {
    return null;
  }
  
  const dataItem = ingredients.find(item => item._id === ingredientId);
  console.log(dataItem);

  /*useEffect(() => {
    dispatch(fillItem(dataItem));
    return () => {
      dispatch(clearItem(dataItem));
    }
  }, [dispatch, dataItem]);*/

  /*const { image_large, name, calories, proteins, fat, carbohydrates } = useSelector(store => store.ingredient);*/
  const image_large = dataItem.image_large;
  const name = dataItem.name;
  const calories = dataItem.calories;
  const proteins = dataItem.proteins;
  const fat = dataItem.fat;
  const carbohydrates = dataItem.carbohydrates; 

  return (
    <div className={Styles.ingredient_details}>
      <img className="pl-5 pr-5 pb-4" src={image_large} alt={name} />
      <h2 className={Styles.ingredient_name}>{name}</h2>
      <ul className={Styles.nutrition_values}>
        <li className={Styles.nutrition_value}>
          <h3 className='text text_type_main-default pb-2'>Калории,ккал</h3>
          <p className='text text_type_digits-default'>{calories}</p>
        </li>
        <li className={Styles.nutrition_value}>
          <h3 className='text text_type_main-default pb-2'>Белки, г</h3>
          <p className='text text_type_digits-default'>{proteins}</p>
        </li>
        <li className={Styles.nutrition_value}>
          <h3 className='text text_type_main-default pb-2'>Жиры, г</h3>
          <p className='text text_type_digits-default'>{fat}</p>
        </li>
        <li className={Styles.nutrition_value}>
          <h3 className='text text_type_main-default pb-2'>Углеводы, г</h3>
          <p className='text text_type_digits-default'>{carbohydrates}</p>
        </li>
      </ul>
    </div>
  );
}

export default IngredientDetails;