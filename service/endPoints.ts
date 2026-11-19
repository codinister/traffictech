import axiosFetch from './axiosFetch';

export const logInEndpoint = ({ ...options }) => {
  const { url, email, password } = options;

  return axiosFetch({
    method: 'POST',
    url,
    data: {
      email,
      password,
    },
  });
};

export const logOutEndpoint = async (url: string) => {
  return await axiosFetch({ url });
};

export const logInStatus = async (url: string) => {
  return await axiosFetch({ url });
};
