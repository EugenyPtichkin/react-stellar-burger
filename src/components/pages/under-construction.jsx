import { useNavigate } from 'react-router-dom';
import Styles from './under-construction.module.css';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

export const UnderConstructionPage = () => {

  const navigate = useNavigate();

  const onClick = () => {
    //navigate('/login', {replace: true});
    navigate(-1, { replace: true });
  }

  return (
    <>
      <div className={Styles.content}>
        <p className={Styles.title}>Страница находится в&nbsp;стадии&nbsp;разработки</p>
        <Button htmlType="button" type="primary" size="medium" onClick={onClick}>
          Понятно
        </Button>
      </div>
    </>
  )
};