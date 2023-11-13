import { useEffect } from 'react';
import ErrorBoundary from './../errorboundary/error-boundary';
import Styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import Main from '../main/main';
import { getIngredients } from './../services/actions/ingredients';
import { useDispatch, useSelector } from 'react-redux';
export const isActive = false;

 
const App = () => {  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients())
  }, [dispatch]);

  const {ingredientsLoading, ingredientsError, ingredientsErrorType}  = useSelector(store => store.ingredients);

  return (
    <ErrorBoundary>
      <div className={Styles.app}>
        <AppHeader />
        {!ingredientsLoading && !ingredientsError && <Main/>}
        {ingredientsLoading && !ingredientsError && <p className={`text text_type_main-large ${Styles.loading_text}`}>Данные загружаются</p>}
        {ingredientsError && <p className={`text text_type_main-large ${Styles.loading_text}`}>{`Ошибка сервера: ${ingredientsErrorType}`}</p>}         
      </div>
    </ErrorBoundary>
  );
}

export default App;