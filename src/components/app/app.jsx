import { useEffect } from 'react';
import ErrorBoundary from './../errorboundary/error-boundary';
import Styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import { getIngredients } from '../../services/actions/ingredients';
import { useDispatch, useSelector } from 'react-redux';

import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import {
  HomePage, LoginPage, RegisterPage, ForgotPasswordPage, ResetPasswordPage,
  NotFound404Page, ProfilePage, ProfileEditPage, OrdersPage, FeedPage, InfoPage
} from '../pages';
import Modal from './../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';

import { checkUserAuth } from '../../services/actions/user';
import { OnlyAuth, OnlyUnAuth } from '../protected-route';

import { WS_CONNECTION_START, WS_CONNECTION_CLOSED } from '../../services/actions/wsActionTypes';

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;

  const handleModalClose = () => {
    navigate(-1);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
    dispatch(checkUserAuth());
  }, [dispatch]);

  
  //Открыть соединение по WS если появился зарегистрированный пользователь
  const { isAuthChecked } = useSelector(store => store.user);
  const { wsConnected } = useSelector(store => store.websocket);
  useEffect(() => {
    if (isAuthChecked && !wsConnected) {
      console.log('WebSocket connection to be established');
      dispatch({ type: WS_CONNECTION_START });
    }
    if (!isAuthChecked && wsConnected) {
      console.log('WebSocket connection to be closed');
      dispatch({ type: WS_CONNECTION_CLOSED });
    }

  }, [isAuthChecked, wsConnected]); // eslint-disable-line react-hooks/exhaustive-deps  

  const { ingredientsLoading, ingredientsError, ingredientsErrorType } = useSelector(store => store.ingredients);

  return (
    <ErrorBoundary>
      <div className={Styles.app}>
        <AppHeader />
        {ingredientsLoading && !ingredientsError && <p className={`text text_type_main-large ${Styles.loading_text}`}>Данные загружаются</p>}
        {ingredientsError && <p className={`text text_type_main-large ${Styles.loading_text}`}>{`Ошибка сервера: ${ingredientsErrorType}`}</p>}
        {!ingredientsLoading && !ingredientsError &&
          <Routes location={background || location}>
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<OnlyUnAuth component={<LoginPage />} />} />
            <Route path='/register' element={<OnlyUnAuth component={<RegisterPage />} />} />
            <Route path='/forgot-password' element={<OnlyUnAuth component={<ForgotPasswordPage />} />} />
            <Route path='/reset-password' element={<OnlyUnAuth component={<ResetPasswordPage />} />} />
            <Route path='/profile' element={<OnlyAuth component={<ProfilePage />} />} >
              <Route index element={<ProfileEditPage />} />
              <Route path='orders' element={<OrdersPage />} />
              <Route path='*' element={<NotFound404Page />} />
            </Route>
            <Route path='/profile/orders/:number' element={<InfoPage />} />
            <Route path='/feed' element={<FeedPage />} />
            <Route path='/feed/:number' element={<InfoPage />} />
            <Route path='/ingredients/:ingredientId' element={<IngredientDetails isModal={false} />} />
            <Route path='*' element={<NotFound404Page />} />
          </Routes>
        }
        {background && (
          <Routes>
            <Route
              path='/ingredients/:ingredientId'
              element={
                <Modal handleClose={handleModalClose}>
                  <IngredientDetails isModal={true} />
                </Modal>
              }
            />
            <Route
              path='/feed/:number'
              element={
                <Modal handleClose={handleModalClose}>
                  <InfoPage isModal={true} />
                </Modal>
              }
            />
            <Route
              path='/profile/orders/:number'
              element={
                <Modal handleClose={handleModalClose}>
                  <InfoPage isModal={true} />
                </Modal>
              }
            />
          </Routes>
        )}
      </div>
    </ErrorBoundary>
  );
}

export default App;