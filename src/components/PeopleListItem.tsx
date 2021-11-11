import React from "react";
import Social from "./Social/Social";
import { Avatar, List, Card, Button  } from 'antd';

interface PeopleListItemProps {
    /** Пользователь */
    data: any,
    deleteUser: (userId: number) => void
}

const PeopleListItem = ({ data, deleteUser } : PeopleListItemProps) => {
    const deleteThis = () => {
        deleteUser(data.id);
    }
    return (
        <Card className="item-description" style={{marginRight: 10, marginBottom: 10}}>
            <List.Item.Meta
                avatar={<Avatar size="large">{data.username[0]}</Avatar>}
                title={<a href="https://ant.design">{data.username}</a>}
                description={data.email}
            />
            <div className="item-description__content">
                <p className="item-description__phone">{data.phone}</p>
                <p className="item-description__desc">{data.desription}</p>
                <p className="item-description__gender">Пол: {data.gender ? 'Ж' : 'М'}</p>
                <Social data={data.social} />
            </div>
            <Button type="primary" danger onClick={deleteThis}>Удалить</Button>
        </Card>
    )
}
export default PeopleListItem;