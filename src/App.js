import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { useEffect, useState } from 'react';
import { fetchUsers } from './store/usersReduser';
import { fetchUser } from './store/profileReduser';
import UserProfile from './store/ProfileUser';

function App() {
  const { users, loading, error } = useSelector((state) => state.users);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  useEffect(() => {
    dispatch(fetchUser())
  }, [dispatch])
  
  const singleUserID = (userId) => {
    setShow(true);
    dispatch(fetchUser(userId));
  };

  return (
    <div className="App">
      <h1>Пользователи</h1>
      {loading && <p>Загрузка...</p>}
      {error && <p>Ошибка {error}</p>}
      {users.length ? <ul>{
        users.map(user => (
          <li key={user.id}>
            {user.name}
            <button onClick={() => singleUserID(user.id)}>
              Посмотреть профиль
            </button>
          </li>
        ))
      }
      </ul> : null}
      {show && <UserProfile />}
      
    </div>
  );
}

export default App;
