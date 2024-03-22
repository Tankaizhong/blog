import React from 'react';
import {Progress} from "antd";
import '../../styles/usercard.less';
const UserCard = () => {
    return (
        <div className="user-card-content">
            你好
            <Progress percent={50} status="active" />
        </div>
    );
};

export default UserCard;