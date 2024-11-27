import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { URLBASE } from './config/apiconfig';


const ObtenerRutas = () => {
  const [rutas, setRutas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/rutas`)
      .then((response) => {
        setRutas(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener las rutas", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Cargando rutas...</div>;
  }

  return (
    <div>
      <h1>Rutas disponibles:</h1>
      <ul>
        {rutas.map((ruta, index) => (
          <li key={index}>
            Ruta: {ruta.ruta}, Métodos: {ruta.metodos}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ObtenerRutas;
