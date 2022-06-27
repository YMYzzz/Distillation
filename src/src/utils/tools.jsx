// 根据token判断是否已登陆

export const getToken = () => {
    return localStorage.getItem('token')
};

export const setToken = (token) => {
    localStorage.setItem('token', token)
};


export const removeToken = () => {
    localStorage.removeItem("token");
};

export const isLogined = () => (getToken() ? true : false);