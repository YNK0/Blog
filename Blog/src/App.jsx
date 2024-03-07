import React, { useEffect, useState } from 'react';
import BodyBlog from './Componentes/BodyBlog';
import AddPostModal from './Componentes/AddPostModal';

function App() {
  const [originalData, setOriginalData] = useState([]);
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchOption, setSearchOption] = useState('title');

  useEffect(() => {
    fetch('http://localhost:3000/')
      .then(response => response.json())
      .then(data => {
        setOriginalData(data);
        setData(data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSelectChange = (event) => {
    setSearchOption(event.target.value);
  };

  const handleFilterSubmit = (event) => {
    event.preventDefault();
    const urlWay = ["titulo/", "autor/", "contenido/"];

    function getFilterData() {
      if (searchOption === "title") {
        return urlWay[0];
      } else if (searchOption === "author") {
        return urlWay[1];
      } else if (searchOption === "content") {
        return urlWay[2];
      }
    };

    const url = `http://localhost:3000/${getFilterData()}${searchTerm}`;

    fetch(url)
      .then(response => response.json())
      .then(filteredData => {
        console.log(filteredData);
        setData(filteredData);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <>
      <div className="container mx-auto">
        <h1 className='text-4xl font-bold mt-4 pb-4 ml-4'>Blog</h1>
        <div>
          <div className='flex items-center justify-between'>
            <h3 className='text-2xl font-bold mt-8 ml-4'>Ultimas publicaciones</h3>
            <div className="flex items-center mt-8 mx-5">
              <button
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                onClick={openModal}
              >
                Agregar publicación
              </button>
            </div>
          </div>
          <div className="flex justify-center">
            <form onSubmit={handleFilterSubmit} className="flex items-center mt-8 mx-5">
              <select
                value={searchOption}
                onChange={handleSelectChange}
                className="border border-gray-300 rounded-md px-3 py-1 mr-1 focus:outline-none"
              >
                <option value="title">Título</option>
                <option value="content">Contenido</option>
                <option value="author">Autor</option>
              </select>
              <input
                type="text"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={handleSearch}
                className="border border-gray-300 rounded-md px-3 py-1 mr-1 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Filtrar
              </button>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-3'
              >
                ⟳
              </button>
            </form>
          </div>

          <div className='my-4'>
            <BodyBlog data={data} />
          </div>
        </div>
      </div>

      {showModal && <AddPostModal closeModal={closeModal} />}
    </>
  );
}

export default App;
