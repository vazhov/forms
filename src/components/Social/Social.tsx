import React from "react";
import { Tag } from 'antd';
import './social.scss';

interface SocialProps {
    data: any
}

const PeopleListItem = ({ data } : SocialProps) => {
    return (
        <ul className="social">
            {data.map((item : string) => {
                return (
                    <Tag className="social__item" color="lime">{item}</Tag>
                )
            })}
        </ul>
    )
}

export default PeopleListItem;