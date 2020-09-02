import axios from "axios";
import { UserSubmit, UserResponse } from "./models";

export const conduitApi = axios.create({
  baseURL: "https://conduit.productionready.io/api",
});

export function setJWT(jwt: string) {
  conduitApi.defaults.headers.common["Authorization"] = `Token ${jwt}`;
}

export function clearJWT() {
  delete conduitApi.defaults.headers.common["Authorization"];
}
//this is how you pass in data to log in a user using the interface classes
//found in models.d.ts - UserSubmit is the type of data that is passed in
//as an argument (email and password) and then to define the loginUser function
//type, we put async in front and use Promise<>; the promise should return a user type and that is defined in the UserResponse interface class - this function type may also return undefined if the catch error hits
export async function loginUser(
  user: UserSubmit
): Promise<UserResponse | undefined> {
  try {
    const response = await conduitApi.post("/users/login", {
      user,
    });
    return response.data as UserResponse;
  } catch (e) {
    console.error(e);
  }
}
