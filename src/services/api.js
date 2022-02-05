const axios = require("axios");

const BASE_URL = "https://test.it-planet.org/sso/";
const BASE_URL_LOCAL = "https://test.it-planet.org/location/";
const BASE_URL_USER = "https://test.it-planet.org/user/";

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
};

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

export const fetchGetListCountry = async (validToken, data) => {
  try {
    token.set(validToken);

    const result = await axios.post(`${BASE_URL_LOCAL}country`, data);

    return result;
  } catch (error) {
    console.log(error.message);
  }
};

export const fetchGetListRegion = async (validToken, data) => {
  try {
    token.set(validToken);

    const result = await axios.post(`${BASE_URL_LOCAL}region`, data);

    return result;
  } catch (error) {
    console.log(error.message);
  }
};

export const fetchGetListCity = async (validToken, data) => {
  try {
    token.set(validToken);

    const result = await axios.post(`${BASE_URL_LOCAL}city`, data);

    return result;
  } catch (error) {
    console.log(error.message);
  }
};

export const fetchGetProfile = async (validToken) => {
  try {
    token.set(validToken);

    const result = await axios.get(`${BASE_URL_USER}profile/personal`);

    return result;
  } catch (error) {
    console.log(error.message);
  }
};

export const fetchGetListStatus = async (validToken) => {
  try {
    token.set(validToken);

    const result = await axios.get(`${BASE_URL_USER}dict/person-status`);
    return result;
  } catch (error) {
    console.log(error.message);
  }
};
