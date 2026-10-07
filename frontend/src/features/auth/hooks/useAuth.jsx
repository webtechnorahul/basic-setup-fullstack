import {setError,setLoading,setUser} from '../state/auth.slice';
import { userGetMeApi,userLoginApi,userRegisterApi } from '../services/auth.service';
import { useDispatch, useSelector } from 'react-redux';

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
            dispatch(setError(err.response.data.message));
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
            console.log(response.user);
            dispatch(setUser(response.user));
        }
        catch(err){
            dispatch(setError(err.response.data.message));
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
            dispatch(setError(err.response.data.message));
        }
        finally{
            dispatch(setLoading(false));
        }
    }

    return {
        user,loading,error,Login,Register,getMe,setError,setLoading,setUser
    }
}