import React from 'react';
import styles from './app.module.css';
import Header from '../header/header';
import Main from '../main/main';

export const isActive = false;
const baseUrl = "https://norma.nomoreparties.space/api/ingredients";

const App = () => {
  const [data, setData] = React.useState({
    ingredientsData: null,
    isLoading: true
  })

  React.useEffect(() => {
    const getIngredientsData = async () => {
      try {
        setData({ ...data, isLoading: true });
        const res = await fetch(baseUrl);
        const resultData = await res.json();
        setData({
          ...data,
          ingredientsData: resultData.data,
          isLoading: false
        });
      }
      catch (err) {
        console.log(err);
      }
    }
    getIngredientsData();
  }, [])
  console.log(data.isLoading);
  console.log(data.ingredientsData);

  return (
    <div className={styles.app}>
      <Header />
      {!data.isLoading && <Main ingredients={data.ingredientsData}/>}
      {data.isLoading && <p>Данные загружаются</p>}
    </div> 
  );
}

export default App;