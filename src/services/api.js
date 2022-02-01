const axios = require("axios");

const BASE_URL = "https://test.it-planet.org/sso/signup";

export const fetchRegisterUser = async (data) => {
  try {
    const result = await axios.post(BASE_URL, data);
    return result;
  } catch (error) {
    console.log(error.message);
  }
};

export const fetchConfirmEmail = async (data) => {
  try {
    const result = await axios.post(`${BASE_URL}/confirm`, data);
    return result;
  } catch (error) {
    console.log(error.message);
  }
};
