import {Tag,Space,Button} from 'antd';
import React from "react";
import { deleteTodo} from "../../../../Redux/actions/DashPages/todos";
import {upperFirst} from "lodash"


export const columnFunction=(dispatch,setShowModal,setInitialValues,navigateTo)=> {

    return  ([
        {
            title: 'Todo Name',
            dataIndex: 'name',
            key: 'name',
            render: text => <span >{upperFirst(text)}</span>,
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Status',
            key: 'status',
            dataIndex: 'status',
            render: (status, _) => (
                <Tag color={status === 'Pending' ? 'red':status === 'Completed' ? 'blue' : 'gold'}>
                    {status}
                </Tag>
            ),
        },
        {
            title: '',
            key: 'action',
            render: (text, record) => {
                return (
                    <Space size="middle">
                        <a onClick={() => dispatch(navigateTo(`/todos/${record._id}`))}>View</a>
                        <a onClick={() => {setShowModal(true); setInitialValues(record) }}>Edit</a>
                        <a onClick={() => dispatch(deleteTodo(record._id))}>Delete</a>
                    </Space>
                )
            },
        },
    ])
};

