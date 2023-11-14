import Styles from './ingredient-details.module.css';
import {useSelector} from 'react-redux';

function IngredientDetails() { //data

  const { image_large, name, calories, proteins, fat, carbohydrates } = useSelector(store => store.ingredient);  

  return (
    <div className={Styles.ingredient_details}>
      <img className="pl-5 pr-5 pb-4" src={image_large}/>  {/*data.data.image_large*/}
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