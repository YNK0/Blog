import './App.css'
import React from 'react'
import BodyBlog from './Componentes/BodyBlog'
import { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/')
      .then(response => response.json())
      .then(data => {
        setData(data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <div>
        <h1 className='text-4xl font-bold mt-4 pb-4 ml-4'>Blog</h1>
        <div>
          <div className='flex items-center justify-between'>
            <h3 className='text-2xl mt-8 ml-4'>Ultimas publicaciones</h3>
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-8 mx-5'>
              Agregar publicacion
            </button>
          </div>
          <div>
            <BodyBlog data={data} />
          </div>
        </div>
      </div>      
    </>
  )
}

export default App
