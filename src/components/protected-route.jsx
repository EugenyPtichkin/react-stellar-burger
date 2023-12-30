import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const Protected = ({ onlyUnAuth = false, component }) => {
  // isAuthChecked это флаг, показывающий что проверка токена произведена
  // при этом результат этой проверки не имеет значения, важно только,
  // что сам факт проверки имел место.
  const isAuthChecked = useSelector((store) => store.user.isAuthChecked);
  const user = useSelector((store) => store.user.user);
  const location = useLocation();

  if (!isAuthChecked) {
    // Запрос еще выполняется
    // Выводим прелоадер в ПР
    return null;
  }

  if (onlyUnAuth && user) {    
    // Пользователь авторизован, но роут предназначен для неавторизованного пользователя
    // Делаем редирект на главную страницу или на тот адрес, что записан в location.state.from
    //console.log(`user: ${user}, onlyUnAuth: ${onlyUnAuth}`);
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }
  // Пользователь не авторизован, роут предназначен для авторизованного пользователя
  // Делаем редирект на страницу логин
  if (!onlyUnAuth && !user) {
    //console.log(`user: ${user}, onlyUnAuth: ${onlyUnAuth}`);
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // !onlyUnAuth && user Пользователь авторизован и роут для авторизованного пользователя
  // onlyUnAuth && !user Пользователь не авторизован и роут для не авторизованного пользователя
  //console.log(`user: ${user}, onlyUnAuth: ${onlyUnAuth}`);
  return component;
};

export const OnlyAuth = Protected;
export const OnlyUnAuth = ({ component }) => (
  <Protected onlyUnAuth={true} component={component} />
);