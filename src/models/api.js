import axios from "axios";

const base_url = "http://13.56.163.152:5000";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoib3FweHpvb2gzZXJxa2R6eiIsImV4cCI6MTY3OTAyOTQyOX0.N-cReqSB6fRGPZ9RZOCsW9C1Y5Fkm7YQnVm-TIPjjl0";

const headers = {
  "Content-Type": "application/json",
  Authorization: token,
};

export const getChatList = () => {
  return axios.post(`${base_url}/api/v1/get_chat_list`, { headers: headers });
};
