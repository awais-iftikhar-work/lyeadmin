import Axios from '../../user/interceptor';
import { API_URL } from '../../config/constants/endpoints';
import { getAuth } from '../../modules/auth';
import { IUser } from '../../user/types';

/**
 * User Reset Password
 */
export const resetPassword = async (
  email: string,
  password: string,
  code: number
): Promise<IUser> => {
  return new Promise(async (resolve, reject) => {
    const jwt: any = getAuth();

    try {
      const { data } = await Axios({
        data: { email, password, code },
        url: `${API_URL}admin/reset-password`,
        headers: {
          Authorization: jwt,
        },
        method: 'POST',
      });
      console.info(data, '---- POST Express');
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
