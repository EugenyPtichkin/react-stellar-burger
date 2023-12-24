import { useEffect } from 'react';
import ErrorBoundary from './../errorboundary/error-boundary';
import Styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import Main from '../main/main';
import { getIngredients } from '../../services/actions/ingredients';
import { useDispatch, useSelector } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from "react-dnd-html5-backend";

import { Route, Routes } from 'react-router-dom';
import { LoginPage, RegisterPage, ForgotPasswordPage, ResetPasswordPage, NotFound404Page } from '../pages';

export const isActive = false;

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients())
  }, [dispatch]);

  const { ingredientsLoading, ingredientsError, ingredientsErrorType } = useSelector(store => store.ingredients);

  return (
    <ErrorBoundary>
      <div className={Styles.app}>
        <AppHeader />
        <DndProvider backend={HTML5Backend}>
          {ingredientsLoading && !ingredientsError && <p className={`text text_type_main-large ${Styles.loading_text}`}>Данные загружаются</p>}
          {ingredientsError && <p className={`text text_type_main-large ${Styles.loading_text}`}>{`Ошибка сервера: ${ingredientsErrorType}`}</p>}
          {!ingredientsLoading && !ingredientsError &&
            <Routes>
              <Route path='/' element={<Main />} />
              <Route path='/login' element={<LoginPage />} />
              <Route path='/register' element={<RegisterPage />} />
              <Route path='/forgot-password' element={<ForgotPasswordPage />} />
              <Route path='/reset-password' element={<ResetPasswordPage />} />
              <Route path='*' element={<NotFound404Page />} />
            </Routes>
          }
        </DndProvider>
      </div>
    </ErrorBoundary>
  );
}

export default App;