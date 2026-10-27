import { createContext, useState, useContext } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {

    // 토큰 관리
    const [token, setToken] = useState(
        localStorage.getItem("accessToken")
    );

    // 로그인 처리
    function login(accessToken) {
        localStorage.setItem("accessToken", accessToken);
        setToken(accessToken);
    }

    // 로그아웃 처리
    function clearAuth() {
        localStorage.removeItem("accessToken");
        setToken(null);
    }

    return (
        <AuthContext.Provider value={{ token, login, clearAuth }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuthContext() {
    return useContext(AuthContext);
}