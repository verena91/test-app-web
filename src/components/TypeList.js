import { DeleteFilled, EditFilled } from '@ant-design/icons';
import { Button, Space, Table, Tooltip } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

function TypeList(props) {

    const [types, setTypes] = useState([]);

    const getTypes = () => {
        axios.get('/ws/rest/types')
            .then(res => {
                setTypes(res.data);
            })
            //.catch(err => {
             //   console.log(err);
           // });

    }
    useEffect(() => {

        getTypes();
    })

    const deleteType = (id)=>{
        console.log('DeleteTask ID: '+ id);
        //otra opcion es:
        //  axios.delete ('/ws/rest/types/$ {id}')
        axios.delete ('/ws/rest/types/' + id)
        .then((res) => {
            alert('Type deleted');
            getTypes();
        })
         .catch(err => {
            alert('No se puede eliminar el Type');
           console.log(err);
        });
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
    ];
    return (
        <div>
            <h1> Type</h1>
            <Table pagination={{ defaultCurrent: 1, pageSize: 3, total: types.length }} columns={columns} dataSource={types} />
        </div>
    )
}

export default TypeList;