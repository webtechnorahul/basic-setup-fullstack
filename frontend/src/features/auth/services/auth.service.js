import axios from 'axios'

const api=axios.create({
    baseURL:"api/auth",
    withCredentials:true
})

// Sends registration details to the backend and returns its response data.
export async function userRegisterApi({fullName,email,password}){
    const response=await api.post("/register",{fullName,email,password});
    return response.data;
};

// Sends login credentials to the backend and returns its response data.
export async function userLoginApi({email,password}){
    
        const response=await api.post("/login",{email,password});
        return response.data;
}

// Requests the profile associated with the current authentication cookie.
export async function userGetMeApi(){
    const response=await api.get("/get-me");
    
    return response.data;
}
