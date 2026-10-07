import {setError,setLoading,setUser} from '../state/auth.slice';
import { userGetMeApi,userLoginApi,userRegisterApi } from '../services/auth.service';
import { useDispatch, useSelector } from 'react-redux';

const getRequestErrorMessage = (error) => {
    const data = error?.response?.data;
    const validationMessages = Array.isArray(data?.errors)
        ? data.errors.flatMap((fieldError) => Object.values(fieldError))
        : [];

    if (data?.message) {
        return validationMessages.length
            ? `${data.message} ${validationMessages.join(' ')}`
            : data.message;
    }

    if (validationMessages.length) {
        return validationMessages.join(' ');
    }

    if (error?.request) {
        return 'Unable to connect to the server. Please try again.';
    }

    return error?.message || 'Something went wrong. Please try again.';
};

// Exposes authentication state and async actions backed by the auth API and Redux.
export const useAuth=()=>{
    const dispatch=useDispatch();
    const {user,loading,error}=useSelector((state)=>state.auth);
    
    // Signs in a user, saves their profile in Redux, and records request errors.
    const Login=async({email,password})=>{
        try{
            dispatch(setError(null));
            dispatch(setLoading(true));
            const response=await userLoginApi({email,password})
            
            dispatch(setUser(response.user));
            
            return response.user;
        }
        catch(err){
            dispatch(setError(getRequestErrorMessage(err)));
            return null;
        }
        finally{
            dispatch(setLoading(false));
        }
    }

    // Registers a user and saves the returned profile in Redux.
    const Register=async({fullName,email,password})=>{
        try{
            dispatch(setError(null));
            dispatch(setLoading(true));
            const response=await userRegisterApi({fullName,email,password})
            dispatch(setUser(response.user));
            return response.user;
        }
        catch(err){
            dispatch(setError(getRequestErrorMessage(err)));
            return null;
        }
        finally{
            dispatch(setLoading(false));
        }
    }

    // Loads the current user's profile using the existing session cookie.
    const getMe=async()=>{
        try{
            dispatch(setError(null));
            dispatch(setLoading(true));
            const response=await userGetMeApi();
            
            dispatch(setUser(response.user));
            
        }
        catch(err){
            dispatch(setError(getRequestErrorMessage(err)));
            return null;
        }
        finally{
            dispatch(setLoading(false));
        }
    }

    return {
        user,loading,error,Login,Register,getMe,setError,setLoading,setUser
    }
}