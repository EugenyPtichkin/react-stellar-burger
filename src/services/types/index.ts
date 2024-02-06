import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';
import { store } from '../../index';
import { TBurgerActions } from '../actions/burger';
import { TIngredientsActions } from '../actions/ingredients';
import { TUserActions } from '../actions/user';
import { TWsFeedActions } from '../actions/wsFeedActions';
import { TWsUserActions } from '../actions/wsUserActions';
import { TGetOrderNumberActions } from '../actions/order';
import { TSingleOrderActions } from '../actions/singleOrder';

type TApplicationActions = 
| TBurgerActions
| TUserActions
| TGetOrderNumberActions
| TSingleOrderActions
| TIngredientsActions
| TWsFeedActions
| TWsUserActions
;

export type RootState<> = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, Action, RootState, TApplicationActions>
>;