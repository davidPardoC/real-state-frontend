import axios from "axios";

async function login({ email, password }: { email: string; password: string }) {
  const { data } = await axios.post(
    "/auth/login",
    { email, password },
    { withCredentials: true, headers: { "Access-Control-Allow-Origin": "*" } }
  );
  return data;
}

const AuthService = { login };

export default AuthService;
