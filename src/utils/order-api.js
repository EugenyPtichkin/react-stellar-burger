import { baseUrl } from "./data";
import { checkResponse } from "./burger-api";

const getOrderNumber = async (data, setData) => {
  try {
    const res = await fetch(`${baseUrl}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ingredients: data.ids
      })
      
    });
    const resultData = await checkResponse(res);
    console.log(resultData);
    setData({
      ...data,
      name: resultData.name,
      order: resultData.order.number,
      success: resultData.success
    });
  }
  catch (err) {
    console.log(err);
  }
}
export default getOrderNumber;