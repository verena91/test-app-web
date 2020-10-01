import React, { useState, useEffect } from 'react';
import { Table, Row, Col, Space, Tooltip, Button } from 'antd';
import { EditFilled, DeleteFilled, PlusOutlined } from '@ant-design/icons';
import moment from 'moment';
import axios from 'axios';

const dummyTasks = [
    {
        // "id": 1,
        // "creationDate": null,
        // "deleted": null,
        // "description": "prueba front",
        // "file": null,
        // "limitDate": 1571951460000,
        // "name": "Verena Ojeda",
        // "updateDate": null,
        // "resuelta": true,
        // "type": {
            "id": 2,
            "deleted": null,
            "description": "tipo2",
            "name": "tipo2"
        //}
    },
    // {
    //     "id": 2,
    //     "creationDate": 1546311600000,
    //     "deleted": null,
    //     "description": "prueba2 cambiada",
    //     "file": null,
    //     "limitDate": 1546311600000,
    //     "name": "prueba2",
    //     "updateDate": 1546311600000,
    //     "resuelta": true,
    //     "type": null
    // },
    // {
    //     "id": 3,
    //     "creationDate": 1546311600000,
    //     "deleted": null,
    //     "description": "prueba2 cambiada",
    //     "file": null,
    //     "limitDate": 1546311600000,
    //     "name": "prueba2",
    //     "updateDate": 1546311600000,
    //     "resuelta": true,
    //     "type": null
    // }
]

function TypeList (props) {

    const [types, setTypes] = useState([]);

    const getTypes = () => {
        // axios.get('ws/rest/types/paginated', { params: { pageSize: 2, first: 0 }})
        axios.get('ws/rest/types')
            .then(res => {
                setTypes(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }

    useEffect(() => {
        getTypes();
    }, [])

    const deleteType = id => {
        axios.delete(`/ws/rest/types/${id}`)
            .then(res => {
                alert(`Tipo con ID: ${id} borrada correctamente`);
                getTypes();
            })
            .catch(err => {
                console.log(err);
            });
    };

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
        // {
        //   title: 'Creation Date',
        //   dataIndex: 'creationDate',
        //   key: 'creationDate',
        //   render: date => moment(date).format('DD/MM/YYYY')
        // },
        // {
        //     title: 'Limit Date',
        //     dataIndex: 'limitDate',
        //     key: 'limitDate',
        //     render: date => moment(date).format('DD/MM/YYYY')
        //   },
        // {
        //   title: 'Type',
        //   key: 'type',
        //   dataIndex: 'type',
        //   render: type => (
        //     <>
        //       {type && type.name}
        //     </>
        //   ),
        // },
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
            <Row style={{ padding: 20 }}>
                <Col span={22}></Col>
                <Col span={2}>
                <Tooltip title="New">
                    <Button 
                        type="primary" 
                        shape="round" 
                        onClick={() => props.history.push(`${props.match.url}/new`)}
                        icon={<PlusOutlined />}>New Type</Button>
                </Tooltip>
                </Col>
            </Row>
            <Table pagination={{ defaultCurrent:1, pageSize: 5, total:tasks.length }} columns={columns} dataSource={tasks} />
        </div>
    )
}

export default TypekList;