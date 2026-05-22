import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingScreen from '../components/LoadingScreen';

const API_URL = process.env.REACT_APP_API_URL;

export default function ProtectedRoute({ children }) {
    const navigate = useNavigate();
    const [ok, setOk] = useState(false);
    useEffect(() => {
        let active = true;
        fetch(`${API_URL}/auth/check`, {
            credentials: 'include'
        }).then(res => {
            if (!active) return;
            if (res.ok) setOk(true);
            else navigate('/Login');
        }).catch(() => {
            if(active)
                navigate('/Login');
        });
        return () => {
            active = false;
        };
    }, [navigate]);
    if (!ok) return <LoadingScreen text="Checking session" />;
    return children;
}