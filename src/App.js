import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { useEffect } from 'react';
import { fetchUsers } from './store/usersReduser';
import { fetchUser } from './store/profileReduser';
import UserProfile from './store/ProfileUser';

function App() {
  const { users, loading, error } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  useEffect(() => {
    dispatch(fetchUser())
  }, [dispatch])
  
  return (
    <div className="App">
      <h1>Пользователи</h1>
      {loading && <p>Загрузка...</p>}
      {error && <p>Ошибка {error}</p>}
      {users.length ? <ul>{
        users.map(user => (
          <li key={user.id}>
            {user.name}
            <button onClick={() => dispatch(fetchUser(user.id))}>
              Посмотреть профиль
            </button>
          </li>
        ))
      }
      </ul> : null}
      <UserProfile />
    </div>
  );
}

export default App;
