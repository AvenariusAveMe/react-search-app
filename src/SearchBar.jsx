import { useState, useEffect, useRef } from 'react';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (query.trim() === '') {
      setResults([]);
      return;
    }

    timeoutRef.current = setTimeout(async () => {
      try {
        setLoading(true);
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const allPosts = await response.json();
        
        const filtered = allPosts.filter(post => 
          post.title.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 5);
        
        setResults(filtered);
      } catch (error) {
        console.error('Ошибка поиска:', error);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(timeoutRef.current);
  }, [query]);

  return (
    <div style={{ position: 'relative', width: '300px', margin: '0 auto' }}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Начните вводить текст..."
        style={{
          width: '100%',
          padding: '12px',
          fontSize: '16px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          boxSizing: 'border-box'
        }}
      />
      
      {loading && (
        <div style={{ textAlign: 'center', padding: '10px' }}>
          Загружаем результаты...
        </div>
      )}
      
      {results.length > 0 && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          background: 'white',
          border: '1px solid #ddd',
          borderRadius: '4px',
          marginTop: '5px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          zIndex: 1000
        }}>
          {results.map(post => (
            <div
              key={post.id}
              style={{
                padding: '12px',
                borderBottom: '1px solid #eee',
                cursor: 'pointer',
                transition: 'background 0.2s'
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#f5f5f5'}
              onMouseLeave={e => e.currentTarget.style.background = 'white'}
              onClick={() => {
                setQuery(post.title);
                setResults([]);
                alert(`Выбран пост: ${post.title}`);
              }}
            >
              <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                {post.title}
              </div>
              <div style={{ fontSize: '0.9em', color: '#666' }}>
                {post.body.substring(0, 60)}...
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div style={{ 
        marginTop: '10px', 
        color: '#666', 
        fontSize: '0.9em',
        textAlign: 'center'
      }}>
        Попробуй ввести "aut" или "qui"
      </div>
    </div>
  );
};

export default SearchBar;