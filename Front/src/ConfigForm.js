import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ConfigForm.css';

const ConfigForm = () => {
  const [configurations, setConfigurations] = useState({
    distributions: [],
    backends: [],
    databases: []
  });
  const [selectedConfig, setSelectedConfig] = useState({
    distribution: '',
    backend: '',
    database: ''
  });
  const [generatedScript, setGeneratedScript] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3000/configurations')
      .then(response => {
        setConfigurations(response.data.data);
      })
      .catch(error => {
        console.error("Error al obtener configuraciones:", error.message);
      });
  }, []);

  const handleChange = (event) => {
    setSelectedConfig({
      ...selectedConfig,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');
    setGeneratedScript('');
    setLoading(true);

    axios.post('http://localhost:3000/generate-script', selectedConfig)
      .then(response => {
        setGeneratedScript(response.data.data.script);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error al generar el script:", error.message);
        setError("Error al generar el script. Intente nuevamente.");
        setLoading(false);
      });
  };

  return (
    <div className="config-form">
      <h2>Configuración de Instalación</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Distribución de Linux:</label>
          <select name="distribution" onChange={handleChange} required>
            <option value="">Seleccione una opción</option>
            {configurations.distributions.map((dist, index) => (
              <option key={index} value={dist}>{dist}</option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label>Plataforma Backend:</label>
          <select name="backend" onChange={handleChange} required>
            <option value="">Seleccione una opción</option>
            {configurations.backends.map((backend, index) => (
              <option key={index} value={backend}>{backend}</option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label>Base de Datos:</label>
          <select name="database" onChange={handleChange} required>
            <option value="">Seleccione una opción</option>
            {configurations.databases.map((db, index) => (
              <option key={index} value={db}>{db}</option>
            ))}
          </select>
        </div>
        
        <button type="submit" className="submit-button">Generar Script</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {loading && <p>Cargando...</p>}
      {generatedScript && (
        <div className="console-output">
          <h3>Script Generado:</h3>
          <pre>{generatedScript}</pre>
        </div>
      )}
    </div>
  );
};

export default ConfigForm;
