import React from 'react'
import PeopleListItem from './PeopleListItem';
import { List } from 'antd';

interface PeopleListProps {
    /** Список пользователей */
    users: any[],
    deleteUser: (id: number) => void
}

const PeopleList = ({ users, deleteUser }: PeopleListProps) => {
    const deleteThis = (userId: number) => {
        deleteUser(userId);
    }
    return (
        <List
            itemLayout="horizontal"
            grid={{ gutter: 16, column: 2 }}
            dataSource={users}
            renderItem={item => (
                <PeopleListItem data={item} deleteUser={deleteThis}/>
            )}
        />
    )
};

export default PeopleList;