import axiosClient from "./axiosClient";

const productApi = {
  getParams: (url, params) => {
    return axiosClient.get(url, { params });
  },
};

export default productApi;
