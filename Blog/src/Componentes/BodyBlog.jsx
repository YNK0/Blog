export default function BodyBlog(data) {
    console.log(data)
    return (
        <>
            <div>
                {data.data.map((post) => {
                    const formattedDate = new Date(post.fecha).toLocaleDateString();
                    return (
                        <div key={post.ID} className='bg-white shadow-2xl rounded-2xl px-8 pt-8 pb-8 mb-4 m-6' style={{ border: '1px solid #ccc' }}>
                            <h2 className='text-2xl font-bold mt-4'>{post.Titulo.slice(0, 60)}</h2>
                            <p className='text-gray-700 text-base mt-1'>{post.Autor} - {formattedDate}</p>
                            <p className='text-gray-700 text-base mt-5'>{post.Contenido.slice(0, 60)}</p>
                        </div>
                    )
                })}
            </div>
        </>
    )
}