import '../styles/Login.css';
import GlassSurface from '../components/GlassSurface';
import LoginForm from '../components/loginForm';

const API_URL = process.env.REACT_APP_API_URL;

const Login = () => {
    return (
      <div className="Login">
        <img className="Background" src="/images/bg.gif" alt="Background"/>
        <GlassSurface className='Panel' width={'500px'} height={'700px'} borderRadius={10} opacity={0.5} blur={5} >
          <LoginForm API_URL={API_URL}/>
        </GlassSurface>
      </div>
    )
}

export default Login;