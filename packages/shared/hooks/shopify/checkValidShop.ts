import axios from 'axios';
import { appProperties } from './appProperties';

export const checkValidShop = async (shop: string) => {
  const { data } = await axios.get(`${appProperties.BACKEND_URL}/check-valid-shop?shop=${shop}`);
  return data;
};
