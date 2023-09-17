import React from 'react';
import ErrorBoundary from './../errorboundary/error-boundary';
import Styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import Main from '../main/main';
import getIngredientsData from './../../utils/burger-api';

export const isActive = false;

const App = () => {
  const [data, setData] = React.useState({
    ingredientsData: null,
    isLoading: true,
    isError: false,
    errorType: ''
  })

  React.useEffect(() => {
    getIngredientsData(data, setData);
  }, [])

  return (
    <ErrorBoundary>
  {/* <div className='app'>   стиль 'app' не применяется, только через {Styles.app} */}
  {/* <div class='app'>       глобальный стиль также не применяется */}
      <div className={Styles.app}>
        <AppHeader />
        {!data.isLoading && !data.isError && <Main ingredients={data.ingredientsData} />}
        {data.isLoading && !data.isError && <p className={`text text_type_main-large ${Styles.loading_text}`}>Данные загружаются</p>}
        {data.isError && <p className={`text text_type_main-large ${Styles.loading_text}`}>{`Ошибка сервера: ${data.errorType}`}</p>}
      </div>
    </ErrorBoundary>
  );
}

export default App;