import SearchBar from './SearchBar';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1 style={{ textAlign: 'center' }}>🔍 Поиск постов</h1>
      <p style={{ textAlign: 'center', color: '#845' }}>
        Введите текст для поиска. Результаты появятся через 0.5 секунды
      </p>
      <SearchBar />
    </div>
  );
}

export default App;