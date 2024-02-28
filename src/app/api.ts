import axios from 'axios';

export const getUser = async() => {
  const res = await axios.get('https://randomuser.me/api');
  return res.data.results[0];
};
