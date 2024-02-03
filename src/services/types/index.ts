import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';
import { store } from '../../index';
import { TBurgerActions } from '../actions/burger';
import { TIngredientsActions } from '../actions/ingredients';
import { TUserActions } from '../actions/user';
import { WsFeedActions } from '../actions/wsFeedActions';
import { WsUserActions } from '../actions/wsUserActions';

type TApplicationActions = 
| TBurgerActions
| TIngredientsActions
| TUserActions
| WsFeedActions
| WsUserActions
;

export type RootState<> = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, Action, RootState, TApplicationActions>
>;