import Axios from '../../user/interceptor';
import { API_URL } from '../../config/constants/endpoints';
import { getAuth } from '../../modules/auth';
import { IUser } from '../../user/types';

/**
 * Fetch Lottery Data.
 */
// export const getPackagesData = async (jwt: string): Promise<IUser> => {
export const getLotteryData = async (): Promise<IUser> => {
  return new Promise(async (resolve, reject) => {
    const jwt: any = getAuth();

    try {
      const { data } = await Axios({
        url: `${API_URL}admin-lottery`,
        headers: {
          Authorization: jwt,
        },
        method: 'GET',
      });
      console.info(data, '---- GET Express');
      resolve({
        ...data,
        message: data.message,
      });
    } catch (error: any) {
      console.error('Failed to post user express interest', error);
      reject(
        typeof error.response.data.message == 'string'
          ? error.response.data.message
          : error.response.data.message[0]
      );
    }
  });
};