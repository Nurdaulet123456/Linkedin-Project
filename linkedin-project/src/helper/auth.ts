import cookie from 'js-cookie';
import { GoogleLogout } from 'react-google-login';

export const setCookie = (key: string, value: any) => {
    if (window !== undefined) {
        cookie.set(key, value, {
            expires: 1
        });
    }
}

export const removeCookie = (key: any) => {
    const pref: any = window
    if (pref !== 'undefined') {
        cookie.remove(key, {
            expires: 1
        });
    }
};

export const getCookie = (key: any) => {
    const pref: any = window
    if (pref !== 'undefined') {
        return cookie.get(key);
    }
};


export const setLocalStorage = (key: string, value: any) => {
    const pref: any = window
    if (pref !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(value));
    }
};

export const removeLocalStorage = (key: string) => {
    const pref: any = window
    if (pref !== 'undefined') {
        localStorage.removeItem(key);
    }
};

export const authenticate = (response: any, next: any) => {
    console.log('AUTHENTICATE HELPER ON SIGNIN RESPONSE', response);
    setCookie('token', response.data.token);
    setLocalStorage('user', response.data.user);
    next();
};

export const isAuth = () => {
    const pref: any = window
    if (pref !== 'undefined') {
        const cookieChecked = getCookie('token');
        if (cookieChecked) {
            if (localStorage.getItem('user')) {
                return JSON.parse(localStorage.getItem('user') || 'Default Value');
            } else {
                return false;
            }
        }
    }
};

export const signout = (next: any) => {
    removeCookie('token');
    removeLocalStorage('user');
    next();
};

export const updateUser = (response: any, next: any) => {
    console.log('UPDATE USER IN LOCALSTORAGE HELPERS', response);
    if (typeof window !== 'undefined') {
        let auth = JSON.parse(localStorage.getItem('user') || 'Default Value');
        auth = response.data;
        localStorage.setItem('user', JSON.stringify(auth));
    }
    next();
};
