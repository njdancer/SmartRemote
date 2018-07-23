const API_ENDPOINT = "http://remote.local/api/ac";


export function fetchAc() {
  return fetch(API_ENDPOINT)
    .then(response => response.json());
};

export function updateAc(payload) {
  return fetch(API_ENDPOINT, {
    method: "PATCH",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  }).then(response => response.json());
};
