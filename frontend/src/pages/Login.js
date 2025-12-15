import '../styles/Login.css';
import GlassSurface from '../components/GlassSurface';
import LoginForm from '../components/loginForm';

const Login = () => {
    return (
      <div className="Login">
        <img className="Background" src="/images/bg.gif" alt="Background"/>
        <GlassSurface className='Panel' width={'500px'} height={'700px'} borderRadius={10} opacity={0.5} blur={5} >
          <LoginForm />
        </GlassSurface>
      </div>
    )
}

export default Login;