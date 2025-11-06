import React, { createContext, useContext, useState, useEffect } from 'react';
import { getMe } from '../../services/user/userService';

const UserContext = createContext();

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) throw new Error('useUser must be used within UserProvider');
    return context;
};

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            (async () => {
                try {
                    const res = await getMe();
                    if (res.success) setUser(res.user);
                    else setUser(null);
                } catch (err) {
                    setUser(null);
                } finally {
                    setLoading(false);
                }
            })();
        } else {
            setUser(null);
            setLoading(false);
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, loading }}>
            {children}
        </UserContext.Provider>
    );
};