import axios from "axios";

const http = {
  post: function(url, params) {
    return new Promise((resolve, reject) => {
      axios
        .post(url, params)
        .then(res => {
          resolve(res.data.Content);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  get: function(url, params) {
    return new Promise((resolve, reject) => {
      axios
        .get(url, { params: params })
        .then(res => {
          resolve(res.data.Content);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
};

export default http;
