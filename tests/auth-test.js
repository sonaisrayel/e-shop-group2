import axios from "axios";

export const registration = async () => {
  try {
    const url = "http://localhost:4000/auth/registration";

    const inputValues = {
      name: "Armine",
      surname: "Atanesyan",
      username: "armineatanes",
      password: "123456",
      repeatPassword: "1234456",
      email: "armineatanes@gmail.com",
      role: "seller",
      address: {
        street: "Proshyan 3",
        city: "Yerevan",
        region: "Yerevan",
        postalCode: "0054",
        country: "Armenia",
      },
    };
    const options = {
      method: "POST",
      headers: { "content-type": "application/json" },
      data: inputValues,
      url,
    };
    return await axios(options);
  } catch (error) {
    console.log(error);
  }
};

export const login = async () => {
  try {
    const url = "http://localhost:4000/auth/login";

    const inputValues = {
      email: "karaa@gmail.com",
      password: "123456",
    };
    const options = {
      method: "POST",
      headers: { "content-type": "application/json" },
      data: inputValues,
      url,
    };
    const response = await axios(options);
    return response
  } catch (error) {
    console.log(error);
  }
};

export const getToken = async (inputValues) => {
  try {
    const url = "http://localhost:4000/auth/login";
    const options = {
      method: "POST",
      headers: { "content-type": "application/json" },
      data: inputValues,
      url,
    };
    const response = await axios(options);
    return response.data.token;
  } catch (error) {
    console.log(error);
  }
};
