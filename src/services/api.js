const axios = require("axios");

const BASE_URL = "https://test.it-planet.org/sso/";

export const fetchRegisterUser = async (data) => {
  try {
    const result = await axios.post(`${BASE_URL}signup`, data);
    return result;
  } catch (error) {
    console.log(error.message);
  }
};

export const fetchConfirmEmail = async (data) => {
  try {
    const result = await axios.post(`${BASE_URL}signup/confirm`, data);
    return result;
  } catch (error) {
    console.log(error.message);
  }
};

export const fetchActivateProfile = async (data) => {
  try {
    const result = await axios.post(
      `${BASE_URL}signup/activate/personal`,
      data
    );
    return result;
  } catch (error) {
    console.log(error.message);
  }
};

export const fetchLogin = async (data) => {
  try {
    const result = await axios.post(`${BASE_URL}signin`, data);
    return result;
  } catch (error) {
    console.log(error.message);
  }
};
