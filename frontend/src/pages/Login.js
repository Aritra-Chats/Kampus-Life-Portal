import '../styles/Login.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GlassSurface from '../components/GlassSurface';
import LoginForm from '../components/loginForm';
import LoadingScreen from '../components/LoadingScreen';

const API_URL = process.env.REACT_APP_API_URL;

const Login = () => {

  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(`${API_URL}/auth/check`, {
          method: 'GET',
          credentials: 'include'
        });
        if (response.ok)
          navigate('/Home');
      } catch (err) {
        console.log(err.message);
      } finally {
        setChecking(false);
      }
    };
    checkAuth();
  }, [navigate]);

  if(checking)
    return <LoadingScreen text="Loading Assets, Please Wait..." />;

  return (
    <div className="Login">
      <img className="page-bg-image" src="/images/bg.gif" alt="Background"/>
      <GlassSurface className='Panel' width={'500px'} height={'700px'} borderRadius={10} opacity={0.5} blur={5} >
        <LoginForm />
      </GlassSurface>
    </div>
  )
}

export default Login;