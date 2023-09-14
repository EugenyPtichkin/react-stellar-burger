import Styles from './ingredient-details.module.css';

function IngredientDetails(data) {
  console.log(data);
  return (
    <div className={Styles.ingredient_details}>
      <img className={Styles.ingredient_image} src={data.data.image_large}/>
      <h2 className={Styles.ingredient_name}>{data.data.name}</h2>
      <ul className={Styles.nutrition_values}>
        <li className={Styles.nutrition_value}>
            <h3 className='text text_type_main-default pb-2'>Калории,ккал</h3>
            <p className='text text_type_digits-default'>{data.data.calories}</p>
        </li>
        <li className={Styles.nutrition_value}>
            <h3 className='text text_type_main-default pb-2'>Белки, г</h3>
            <p className='text text_type_digits-default'>{data.data.proteins}</p>
        </li>
        <li className={Styles.nutrition_value}>
            <h3 className='text text_type_main-default pb-2'>Жиры, г</h3>
            <p className='text text_type_digits-default'>{data.data.fat}</p>
        </li>
        <li className={Styles.nutrition_value}>
            <h3 className='text text_type_main-default pb-2'>Углеводы, г</h3>
            <p className='text text_type_digits-default'>{data.data.carbohydrates}</p>
        </li>
      </ul>
    </div>
  );
}

export default IngredientDetails;
