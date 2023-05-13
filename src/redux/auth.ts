import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { APICore } from '../helpers/api/apiCore';
import axios from 'axios';

const api = new APICore();

type UserData = {
    id: number;
    email: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    role: string;
    token: string;
};

enum AuthActionTypes {
    API_RESPONSE_SUCCESS = '@@auth/API_RESPONSE_SUCCESS',
    API_RESPONSE_ERROR = '@@auth/API_RESPONSE_ERROR',

    LOGIN_USER = '@@auth/LOGIN_USER',
    LOGOUT_USER = '@@auth/LOGOUT_USER',
    SIGNUP_USER = '@@auth/SIGNUP_USER',
    FORGOT_PASSWORD = '@@auth/FORGOT_PASSWORD',
    FORGOT_PASSWORD_CHANGE = '@@auth/FORGOT_PASSWORD_CHANGE',

    RESET = '@@auth/RESET',
}

type AuthActionType = {
    type:
        | AuthActionTypes.API_RESPONSE_SUCCESS
        | AuthActionTypes.API_RESPONSE_ERROR
        | AuthActionTypes.LOGIN_USER
        | AuthActionTypes.SIGNUP_USER
        | AuthActionTypes.LOGOUT_USER
        | AuthActionTypes.RESET;
    payload: {
        actionType?: string;
        data?: UserData | {};
        error?: string;
    };
};

const initialState = {
    user: {
        data: null,
        loading: false,
        error: '',
        userSignUp: false,
        userLoggedIn: false,
        passwordReset: false,
        passwordChange: false,
        resetPasswordSuccess: null,
        userLogout: null,
    },
    theme: 'dark',
};

const setAuthorization = (token: string | null) => {
    if (token) axios.defaults.headers.common['Authorization'] = 'JWT ' + token;
    else delete axios.defaults.headers.common['Authorization'];
};

export const login = createAsyncThunk('login', async (params: { email: string; password: string }) => {
    try {
        const response = await axios.post('/login/', params);
        api.setLoggedInUser(response.data);
        return response.data;
    } catch (error: any) {
        api.setLoggedInUser(null);
        setAuthorization(null);
        return error;
    }
});

export const logout = createAsyncThunk('logout', async () => {
    try {
        const response = await axios.post('/logout/', {});
        api.setLoggedInUser(null);
        setAuthorization(null);
        return response.data;
    } catch (error) {
        return error;
    }
});

export const signup = createAsyncThunk(
    'signup',
    async (params: { fullname: string; email: string; password: string }) => {
        try {
            const response = await axios.post('/register/', params);
            // api.setLoggedInUser(user);
            // setAuthorization(user['token']);
            return response.data;
        } catch (error) {
            api.setLoggedInUser(null);
            setAuthorization(null);
            return error;
        }
    }
);

export const forgotPassword = createAsyncThunk('forgotPassword', async (params: { email: string }) => {
    try {
        const response = await axios.post('/forget-password/', params);
        return response.data;
    } catch (error) {
        return error;
    }
});

const Auth = createSlice({
    name: 'Auth',
    initialState,
    reducers: {
        loginUser: (state, action) => {
            console.log(state);
        },
        logoutUser: (state) => {
            console.log(state);
        },
        signupUser: (state, action) => {
            console.log(state);
        },
        resetAuth: (state) => {
            console.log(state);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, ({ user }) => {
            user.loading = true;
            user.error = '';
        });
        builder.addCase(login.fulfilled, ({ user }, { payload }) => {
            user.data = payload;
            user.loading = false;
        });
        builder.addCase(login.rejected, ({ user }) => {
            user.error = 'Kullanıcı yüklenirken hata oluştu.';
            user.loading = false;
        });

        builder.addCase(logout.pending, ({ user }) => {
            user.loading = true;
            user.error = '';
        });
        builder.addCase(logout.fulfilled, ({ user }, { payload }) => {
            user.data = payload;
            user.loading = false;
        });
        builder.addCase(logout.rejected, ({ user }) => {
            user.error = 'Kullanıcı yüklenirken hata oluştu.';
            user.loading = false;
        });

        builder.addCase(signup.pending, ({ user }) => {
            user.loading = true;
            user.error = '';
        });
        builder.addCase(signup.fulfilled, ({ user }, { payload }) => {
            user.data = payload;
            user.loading = false;
        });
        builder.addCase(signup.rejected, ({ user }) => {
            user.error = 'Kullanıcı yüklenirken hata oluştu.';
            user.loading = false;
        });

        builder.addCase(forgotPassword.pending, ({ user }) => {
            user.loading = true;
            user.error = '';
        });
        builder.addCase(forgotPassword.fulfilled, ({ user }, { payload }) => {
            user.data = payload;
            user.loading = false;
        });
        builder.addCase(forgotPassword.rejected, ({ user }) => {
            user.error = 'Kullanıcı yüklenirken hata oluştu.';
            user.loading = false;
        });
    },
});

export const { loginUser, logoutUser, signupUser, resetAuth } = Auth.actions;
export default Auth.reducer;
