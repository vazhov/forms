import React, { useState, useEffect } from 'react';
import { Row, Col, Button } from 'antd';
import PeopleForm from './components/PeopleForm'
import PeopleList from './components/PeopleList'
import ApiServiceLocaleStorage from './API/ApiServiceLocaleStorage'
import './App.css';


const App = () => {
  const [users, setUsers] = useState<any[]>([])
  const createUser = (user: object) : void => {
    const userWithId : any = {...user}
    userWithId.id = Date.now()    
    setUsers([...users, userWithId]);
    ApiServiceLocaleStorage.save('users', JSON.stringify([...users, userWithId]))
  };
  
  useEffect(() => {
    const getUsers = ApiServiceLocaleStorage.get('users')
    const users = JSON.parse(getUsers || '[]')
    setUsers(users);
  }, []);

  const clearUsersList = () : void => {
    ApiServiceLocaleStorage.delete('users')
    setUsers([]); 
  };

  const deleteUser = (userId: number) => {
    setUsers(users.filter(item => item.id !== userId));
    ApiServiceLocaleStorage.deleteItem('users', userId);
  };

  return (
    <Row>
      <Col span={8} offset={0}>
        <PeopleForm createUser={createUser} />
      </Col>
      <Col span={12} offset={1}>
        {
          !!users.length &&
          <Button type="primary" danger onClick={clearUsersList}>Удалить всех пользователей</Button>
        }
        <PeopleList users={users} deleteUser={deleteUser} />
      </Col>

    </Row>
    
  );
}

export default App;
