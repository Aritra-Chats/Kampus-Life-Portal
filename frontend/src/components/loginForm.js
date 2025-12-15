import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Login = () => {
    const [userid, setUserID] = useState('');
    const [password, setPassword] = useState('');
    const [SLI, setSLI] = useState(false);
    const [emptyFields, setEmptyFields] = useState([]);
    const navigate = useNavigate();

    const API_URL = process.env.REACT_APP_API_URL;

    const handleLogin = async (e) => {
        e.preventDefault();
        const loginDetails = (SLI === true) ? { userid, password, Age: 7 } : { userid, password };
        try{
            console.log('API_URL:', API_URL, typeof API_URL);   
            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginDetails)
            });
            const json = await response.json();
            if(!response.ok) {
                setEmptyFields(json.emptyFields);
            }
            else {
                setEmptyFields([]);
                setUserID('');
                setPassword('');
                setSLI(false);
                console.log('Login Succeded', json);
                navigate('/Home');
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div className="LoginForm">
            <img className="Logo" src="/images/logo.png" alt="Logo"/>
            <form className="FormContainer" onSubmit={handleLogin}>
                <div className="FormGroup">
                    <label htmlFor="userID">User ID </label>
                    <input
                        id="userID"
                        type='text'
                        placeholder='Enter your user id'
                        onChange={((e) => setUserID(e.target.value))}
                        value={userid}
                        className={`FormInput ${emptyFields.includes('userid') ? 'error' : ''}`}
                    />
                </div>
                <div className="FormGroup">
                    <label htmlFor="password">Password </label>
                    <input
                        id="password"
                        type='password'
                        placeholder='Enter Password'
                        onChange={((e) => setPassword(e.target.value))}
                        value={password}
                        className={`FormInput ${emptyFields.includes('password') ? 'error' : ''}`}
                    />
                </div>
                <div className="formGroup">
                    <label htmlFor="loggedin">
                        <input 
                        type="checkbox" 
                        className="Checkbox" 
                        onChange={((e) => setSLI(e.target.checked))} 
                        checked={SLI}/>
                        Stay Logged in
                    </label>
                </div>
                <button className='LoginButton'>Login</button>
            </form>
        </div>
    )
}

export default Login;