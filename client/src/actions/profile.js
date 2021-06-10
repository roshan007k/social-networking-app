import axios from "axios";

import { setAlert } from "./alert";

import {
    ACCOUNT_DELETED,
    GET_PROFILE,
    PROFILE_ERROR,
    UPDATE_PROFILE,
    CLEAR_PROFILE
} from './types';

//Get current user Profile

export const getCurrentProfile=()=> async dispatch=>{
    try {
        const res=await axios.get('/api/profiles/me/');
        dispatch({
            type:GET_PROFILE,
            payload:res.data
        })
    } catch (err) {
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        })
    }
}

//Create or update profile

export const createProfile=(formData,history,edit=false)=>async dispatch=>{
    try {
        const config={
            headers:{
                'Content-Type': 'application/json'
            }
        }
        const res=await axios.post('/api/profiles',formData,config);
        dispatch({
            type:GET_PROFILE,
            payload:res.data
        });
        dispatch(setAlert(edit ?'Profile Updated':'Profile Created','success'));
        if(!edit){
            history.push('/dashboard');
        }


    } catch (err) {
        const errors=err.response.data.errors
        if(errors){
            errors.forEach(error=>dispatch(setAlert(error.msg,'danger')));
        }
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        })
    }
}


//Add Experience

export const addExperience=(formData,history)=>async dispatch=>{
    try {
        const config={
            headers:{
                'Content-Type': 'application/json'
            }
        }
        const res=await axios.put('/api/profiles/experience',formData,config);
        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data
        });
        dispatch(setAlert('Experience Added','success'));
        history.push('/dashboard');



    } catch (err) {
        const errors=err.response.data.errors
        if(errors){
            errors.forEach(error=>dispatch(setAlert(error.msg,'danger')));
        }
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        })
    }
}

export const addEducation=(formData,history)=>async dispatch=>{
    try {
        const config={
            headers:{
                'Content-Type': 'application/json'
            }
        }
        const res=await axios.put('/api/profiles/education',formData,config);
        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data
        });
        dispatch(setAlert('Education Added','success'));
        history.push('/dashboard');



    } catch (err) {
        const errors=err.response.data.errors
        if(errors){
            errors.forEach(error=>dispatch(setAlert(error.msg,'danger')));
        }
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        })
    }
}

//Delete experience
export const deleteExperience=id=>async dispatch=>{
    try {
        const res=await axios.delete(`/api/profiles/experience/${id}`)

        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data
        });
        dispatch(setAlert('Experience Removed','danger'));
    } catch (err) {
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        })
    }
};

export const deleteEducation=id=>async dispatch=>{
    try {
        const res=await axios.delete(`/api/profiles/education/${id}`)

        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data
        });
        dispatch(setAlert('Education Removed','danger'));
    } catch (err) {
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        })
    }
};

export const deleteAccount=()=>async dispatch=>{
    if(window.confirm('Are you sure?')){
        try {
            const res=await axios.delete('/api/profiles')
    
            dispatch({
                type:CLEAR_PROFILE
            });
            dispatch({
                type:ACCOUNT_DELETED
            });

            dispatch(setAlert('Account Deleted','danger'));
        } catch (err) {
            dispatch({
                type:PROFILE_ERROR,
                payload:{msg:err.response.statusText,status:err.response.status}
            })
        }
    }
    
};