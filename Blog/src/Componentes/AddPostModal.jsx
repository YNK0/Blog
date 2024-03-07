import React, { useState } from 'react';

function AddPostModal({ closeModal }) {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch('http://localhost:3000/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                titulo: title,
                autor: author,
                fecha: new Date().toISOString(),
                contenido: content,
            }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Post created:', data);
            })
            .catch(error => {
                console.error('Error creating post:', error);
            });
        closeModal();
        window.location.reload();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-5 w-1/3 ">
                <div className="flex justify-end">
                    <button
                        className="text-gray-600 hover:text-gray-800 focus:outline-none text-4xl transition duration-300"
                        onClick={closeModal}
                    >
                        &times;
                    </button>
                </div>
                <h2 className="text-2xl font-bold mb-4">Agregar Nueva Publicación</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">→ Título</label>
                        <input
                            type="text"
                            id="title"
                            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 hover:border-gray-500"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="author" className="block text-sm font-medium text-gray-700">→ Autor</label>
                        <input
                            type="text"
                            id="author"
                            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 hover:border-gray-500"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="content" className="block text-sm font-medium text-gray-700">→ Contenido</label>
                        <textarea
                            id="content"
                            className="resize-none mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 hover:border-gray-500"
                            rows="10"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                        ></textarea>
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300"
                        >
                            Agregar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddPostModal;
