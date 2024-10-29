import React from 'react';
import ConfigForm from './ConfigForm';

const App = () => {
  return (
    <div className="App" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <h1 style={{ color: '#333', marginBottom: '20px' }}>Generador de Script de Configuración</h1>
      <ConfigForm />
    </div>
  );
};

export default App;
