import axios from 'axios';
export const getBathrooms = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`http://localhost:3000/bathrooms/getallbathrooms`)
      .then(data => {
        console.log('GET request sent. Return: ', data);
        console.log('Clean Data: ', data.data.payload);
        resolve({ bathrooms: data });
      })
      .catch(err => {
        reject(err);
      });
  });
};
