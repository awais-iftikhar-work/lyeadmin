import Axios from '../../user/interceptor';
import { API_URL } from '../../config/constants/endpoints';
import { getAuth } from '../../modules/auth';
import { IUser } from '../../user/types';

/**
 * Delete Token
 */
export const deleteTokens = async (tokenId: string): Promise<IUser> => {
  return new Promise(async (resolve, reject) => {
    const jwt: any = getAuth();

    try {
      const { data } = await Axios({
        url: `${API_URL}deposit-tokens/${tokenId}`,
        headers: {
          Authorization: jwt,
        },
        method: 'DELETE',
      });
      console.info(data, '---- DELETE Express');
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
