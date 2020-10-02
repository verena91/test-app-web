import { DeleteFilled, EditFilled } from '@ant-design/icons';
import { Button, Space, Table, Tooltip, Row, Col} from 'antd';
import Axios from 'axios';
import React, { useState, useEffect } from 'react';

function TypeList (props){
    const [types, setTypes] = useState([]);


    function getTypes() {
        Axios.get('./ws/rest/types')
            .then((res) => {
                setTypes(res.data);
            });
    }
    useEffect(() => {
        getTypes();
    }) 

    const deleteType = (id) => {
        console.log("ID ELIMINADO")
        //axios.delete('./')
        Axios.delete('./ws/rest/types/')
        .then((res) =>  {
            alert('Type deleted!')
        })
    }

    const columns = [
        {
        title: 'ID',
            dataIndex: 'id',
            key: 'id'
        },
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name'
        },
        {
          title: 'Description',
          dataIndex: 'description',
          key: 'description',
        },
        {
          title: 'Actions',
          key: 'action',
          render: (text, record) => (
            <Space size="middle">
                <Tooltip title="Edit">
                    <Button 
                        type="primary" 
                        shape="circle" 
                        onClick={() => props.history.push(`${props.match.url}/edit/${record.id}`)} 
                        icon={<EditFilled />} />
                </Tooltip>
                <Tooltip title="Delete">
                    <Button 
                        type="danger" 
                        shape="circle" 
                        onClick={() => deleteType(record.id)} 
                        icon={<DeleteFilled />} />
                </Tooltip>
            </Space>
          ),
        }
    ]

    return (
        <div>
        <h1>Type List</h1>
        <Table pagination={{ defaultCurrent:1, pageSize: 5, total:types.length }} columns={columns} dataSource={types} />
        </div>
    )
}


export default TypeList;