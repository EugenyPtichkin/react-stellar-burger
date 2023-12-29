import Styles from './ingredient-details.module.css';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function IngredientDetails(props) {
  const ingredients = useSelector(store => store.ingredients.ingredients);
  const { ingredientId } = useParams();

  if (!ingredients) {
    return null;
  }
  const dataItem = ingredients.find(item => item._id === ingredientId);

  return (
    <section className={props.isModal ? '' : Styles.ingredient_container}>
      <div className={Styles.ingredient_details}>
        <p className={props.isModal? `${Styles.title} ${Styles.title_modal}`:Styles.title}>Детали ингредиента</p>
        <img className="pl-5 pr-5 pb-4" src={dataItem.image_large} alt={dataItem.name} />
        <h2 className={Styles.ingredient_name}>{dataItem.name}</h2>
        <ul className={Styles.nutrition_values}>
          <li className={Styles.nutrition_value}>
            <h3 className='text text_type_main-default pb-2'>Калории,ккал</h3>
            <p className='text text_type_digits-default'>{dataItem.calories}</p>
          </li>
          <li className={Styles.nutrition_value}>
            <h3 className='text text_type_main-default pb-2'>Белки, г</h3>
            <p className='text text_type_digits-default'>{dataItem.proteins}</p>
          </li>
          <li className={Styles.nutrition_value}>
            <h3 className='text text_type_main-default pb-2'>Жиры, г</h3>
            <p className='text text_type_digits-default'>{dataItem.fat}</p>
          </li>
          <li className={Styles.nutrition_value}>
            <h3 className='text text_type_main-default pb-2'>Углеводы, г</h3>
            <p className='text text_type_digits-default'>{dataItem.carbohydrates}</p>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default IngredientDetails;