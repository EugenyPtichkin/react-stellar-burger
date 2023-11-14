import { baseUrl } from "./data";
import { checkResponse } from "./burger-api";

export const getOrderNumber = async (data) => {  //, setData
//  try {
    //console.log(data);
    const res = await fetch(`${baseUrl}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'ingredients': data
      }),      
    });
//    if (!res.ok) {
//        setData({ ...data, isError: true, errorType: res.status});
//        console.log(`Error in answer from the server: ${res.status}`);
//    }
//    const resultData = await checkResponse(res);
     return await checkResponse(res);
/*
    console.log(resultData);
    setData({
      ...data,
      name: resultData.name,
      order: resultData.order.number,
      success: resultData.success,
      isError: false,
      errorType: ''
    });
  }
  catch (err) {
    console.log(err);
  }*/
}