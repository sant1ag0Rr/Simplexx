import React, { useState } from 'react';

const Foro = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: 'Bienvenidos al foro UdeM',
      author: 'Administrador',
      date: '2025-04-11',
      content: 'Este es el espacio para discutir temas académicos y compartir información.',
      comments: [
        {
          id: 1,
          author: 'Estudiante1',
          date: '2025-04-12',
          content: 'Gracias por la bienvenida!'
        }
      ]
    }
  ]);

  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newComment, setNewComment] = useState('');
  const [activePost, setActivePost] = useState(null);

  const handleCreatePost = () => {
    if (!newPostTitle || !newPostContent) return;
    
    const post = {
      id: Date.now(),
      title: newPostTitle,
      author: 'Usuario Actual',
      date: new Date().toISOString().split('T')[0],
      content: newPostContent,
      comments: []
    };
    
    setPosts([post, ...posts]);
    setNewPostTitle('');
    setNewPostContent('');
  };

  const handleAddComment = (postId) => {
    if (!newComment) return;
    
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [
            ...post.comments,
            {
              id: Date.now(),
              author: 'Usuario Actual',
              date: new Date().toISOString().split('T')[0],
              content: newComment
            }
          ]
        };
      }
      return post;
    }));
    
    setNewComment('');
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-6 bg-gradient-to-r from-purple-600 to-purple-800 text-white">
        <h2 className="text-2xl font-bold">Foro Académico</h2>
        <p className="text-purple-100">Comparte y discute temas relevantes</p>
      </div>

      <div className="p-6">
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Crear nueva publicación</h3>
          <div className="space-y-4">
            <input
              type="text"
              value={newPostTitle}
              onChange={(e) => setNewPostTitle(e.target.value)}
              placeholder="Título de la publicación"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
            <textarea
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              rows={4}
              placeholder="Contenido de la publicación"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
            <button
              onClick={handleCreatePost}
              disabled={!newPostTitle || !newPostContent}
              className={`px-4 py-2 rounded-lg transition ${
                newPostTitle && newPostContent
                  ? 'bg-purple-600 text-white hover:bg-purple-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Publicar
            </button>
          </div>
        </div>

        <div className="space-y-8">
          {posts.map((post) => (
            <div key={post.id} className="border-b border-gray-200 pb-6">
              <div className="mb-4">
                <h3 className="text-xl font-semibold">{post.title}</h3>
                <p className="text-sm text-gray-500">
                  Por {post.author} el {post.date}
                </p>
                <p className="mt-2 text-gray-700">{post.content}</p>
              </div>

              <div className="ml-4 space-y-4">
                {post.comments.map((comment) => (
                  <div key={comment.id} className="pl-4 border-l-2 border-purple-200">
                    <p className="text-sm text-gray-500">
                      {comment.author} · {comment.date}
                    </p>
                    <p className="text-gray-700">{comment.content}</p>
                  </div>
                ))}

                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Añadir un comentario..."
                    className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                  <button
                    onClick={() => handleAddComment(post.id)}
                    disabled={!newComment}
                    className={`px-4 py-2 rounded-lg transition ${
                      newComment
                        ? 'bg-purple-600 text-white hover:bg-purple-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Comentar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Foro;

// DONE
