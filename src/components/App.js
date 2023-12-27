// App.js
import React, {useState} from 'react';
import { MDBContainer, MDBInput,  MDBBtn } from 'mdb-react-ui-kit';
import { Link, useNavigate  } from 'react-router-dom';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

const handleSubmit = async () => {
  try {
    const response = await fetch('http://localhost:4000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      // Usuario autenticado
      console.log(data.message);
      navigate('/Inicio');
    }else{
      // Usuario no encontrado
      console.log(data.message);
    }

  } catch (error) {
    console.error('Error al enviar la solicitud:', error);
  }
};

  return (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
      <MDBInput 
      wrapperClass='mb-4'
      label='Username' 
      id='form1' 
      value={username}
      onChange={handleUsernameChange}
      type='email'/>

      <MDBInput 
      wrapperClass='mb-4' 
      label='Password' 
      id='form2' 
      value={password}
      onChange={handlePasswordChange}
      type='password'/>

      <div className="d-flex justify-content-between mx-3 mb-4">
        <a href="!#">Forgot password?</a>
      </div>

      <MDBBtn className="mb-4"
      onClick={handleSubmit}>
          <p className='text-white'>
             Sign in 
          </p>
      </MDBBtn>

      <div className="text-center">
        <p>
          Not a member? <Link to="/registrar">Register</Link>
        </p>
      </div>
    </MDBContainer>
  );
}

export default App;
