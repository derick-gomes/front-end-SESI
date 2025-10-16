import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [perfil, setPerfil] = useState('coordenador');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (perfil === 'coordenador') {
      navigate('/coord/dashboard');
    } else {
      navigate('/prof/dashboard');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input 
        placeholder="Email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
      />
      <select value={perfil} onChange={(e) => setPerfil(e.target.value)}>
        <option value="coordenador">Coordenador</option>
        <option value="professor">Professor</option>
      </select>
      <button onClick={handleLogin}>Entrar</button>
    </div>
  );
}

export default Login;
