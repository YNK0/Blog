import React, { useState } from 'react';

function BodyBlog({ data }) {
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [postIdToDelete, setPostIdToDelete] = useState(null);
    const [selectedPost, setSelectedPost] = useState(null);
    const [postToEdit, setPostToEdit] = useState(null);
    const [editedTitle, setEditedTitle] = useState('');
    const [editedAuthor, setEditedAuthor] = useState('');
    const [editedContent, setEditedContent] = useState('');
    const [editModalOpen, setEditModalOpen] = useState(false);

    const handleEdit = (postId) => {
        const post = data.find(post => post.ID === postId);
        setPostToEdit(post);
        setEditedTitle(post.Titulo);
        setEditedAuthor(post.Autor);
        setEditedContent(post.Contenido);
        setEditModalOpen(true);
    };

    const handleDelete = (postId) => {
        setPostIdToDelete(postId);
        setDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        fetch(`http://localhost:3000/${postIdToDelete}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
            })
            .catch(error => {
                console.log('Error al eliminar la publicación:', error);
            })
            .finally(() => {
                window.location.reload();
            });
        setDeleteModalOpen(false);
        setPostIdToDelete(null);
    };

    const cancelDelete = () => {
        setDeleteModalOpen(false);
        setPostIdToDelete(null);
    };

    const openPostModal = (postId) => {
        const post = data.find(post => post.ID === postId);
        setSelectedPost(post);
    };

    const closePostModal = () => {
        setSelectedPost(null);
    };

    const closeEditModal = () => {
        setEditModalOpen(false);
        setPostToEdit(null);
    };

    const handleEditSubmit = () => {
        fetch(`http://localhost:3000/${postToEdit.ID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                titulo: editedTitle,
                autor: editedAuthor,
                contenido: editedContent,
            }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
            })
            .catch(error => {
                console.log('Error al editar la publicación:', error);
            })
            .finally(() => {
                window.location.reload();
            });

        setEditModalOpen(false);
    };

    return (
        <>
            <div className="grid grid-cols-1 gap-4">
                {data.map((post) => {
                    const formattedDate = new Date(post.fecha).toLocaleDateString();
                    return (
                        <div key={post.ID} id={post.ID} className='bg-white shadow-2xl rounded-2xl px-8 pt-8 pb-5 mb-4 mx-auto' style={{ border: '1px solid #ccc', width: '60%' }}>
                            <div className="flex justify-between items-center">
                                <h2 className='text-2xl font-bold mt-4'>{post.Titulo}</h2>
                                <div className="flex space-x-2">
                                    <button
                                        className="text-gray-600 focus:outline-none hover:text-blue-800"
                                        onClick={() => handleEdit(post.ID)}
                                    >
                                        Editar
                                    </button>
                                    <p>|</p>
                                    <button
                                        className="text-gray-600 hover:text-red-800 focus:outline-none"
                                        onClick={() => handleDelete(post.ID)}
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                            <p className='text-gray-700 text-base mt-1'>{post.Autor} - {formattedDate}</p>
                            <p className='text-gray-400 text-base mt-5'>{post.Contenido.length > 70 ? post.Contenido.slice(0, 70) + ' ...' : post.Contenido}</p>
                            <button
                                className="text-gray-900 hover:underline mt-2"
                                onClick={() => openPostModal(post.ID)}
                            >
                                Ver más
                            </button>
                        </div>
                    );
                })}
            </div>
            {deleteModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-8 w-full max-w-md">
                        <p className="text-lg font-semibold mb-4">¿Estás seguro de que quieres eliminar esta publicación?</p>
                        <div className="flex justify-end">
                            <button
                                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 mr-2"
                                onClick={confirmDelete}
                            >
                                Eliminar
                            </button>
                            <button
                                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                                onClick={cancelDelete}
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {selectedPost && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-8 w-full max-w-3xl">
                        <h2 className="text-xl font-semibold mb-4">{selectedPost.Titulo}</h2>
                        <p className='text-gray-700 text-base mt-1'>{selectedPost.Autor} - {new Date(selectedPost.fecha).toLocaleDateString()}</p>
                        <p className='text-gray-700 text-base mt-5'>{selectedPost.Contenido}</p>
                        <button
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 mt-4"
                            onClick={closePostModal}
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
            {editModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-8 w-1/3 h-2/3  max-h-md">
                        <h2 className="text-xl font-semibold mb-10">Editar Publicación</h2>
                        <form>
                            <div className="mb-4">
                                <label htmlFor="title" className="block text-base font-bold text-gray-700">→ Título</label>
                                <input
                                    type="text"
                                    id="title"
                                    className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 hover:border-gray-500"
                                    value={editedTitle}
                                    onChange={(e) => setEditedTitle(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="author" className="block text-base font-bold text-gray-700 mb-2">→ Autor</label>
                                <input
                                    type="text"
                                    id="author"
                                    className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 hover:border-gray-500"
                                    value={editedAuthor}
                                    onChange={(e) => setEditedAuthor(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="content" className="block text-base font-bold text-gray-700">→ Contenido</label>
                                <textarea
                                    id="content"
                                    className=" resize-none mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 hover:border-gray-500"
                                    rows="10"
                                    value={editedContent}
                                    onChange={(e) => setEditedContent(e.target.value)}
                                    required
                                ></textarea>
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    onClick={handleEditSubmit}
                                >
                                    Guardar
                                </button>
                                <button
                                    type="button"
                                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 ml-2"
                                    onClick={closeEditModal}
                                >
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default BodyBlog;
