import axios from "axios";
const { ADMIN_USERNAME, ADMIN_PASSWORD } = process.env;
export const adminLogin = async () => {
  try {
    const url = "http://localhost:4000/admin/login";
    const response = await axios.post(url, { ADMIN_USERNAME, ADMIN_PASSWORD });
    return response.data.token;
  } catch (error) {
    console.log(error);
  }
};
