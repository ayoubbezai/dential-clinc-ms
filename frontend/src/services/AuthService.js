import api from "./api"

export const AuthService = {
    async login(email , password){
        try{
            const response = await api.post("/auth/login",{email,password});
            if(response.data.success && response.data.token){
            localStorage.setItem("token", response.data.token)
            localStorage.setItem("user", response.data.user)
      return {
        user: response.data.user,
        token: response.data.token,
        error: null,
        message: response.data.message,
      };
        }
        }catch(error){
             return {
               user: null,
               token: null,
               message : null,
               error: error.response.data || { message: "Something went wrong. Please try again." },
             };

        }
        
    }
}