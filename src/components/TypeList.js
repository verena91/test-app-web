import React, { useEffect, useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import { Button, Col, Row, Space, Table, Tooltip } from 'antd';
import { DeleteFilled, EditFilled, PlusOutlined } from '@ant-design/icons';


function TypeList(props) {

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

    const deleteType = id_type => {
        axios.delete(`/ws/rest/types/${id_type}`)
            .then(res => {
                alert(`Tarea eliminada correctamente`);
                getTypes();//Actualizar siempre la lista despues de la eliminación
            })
            .catch(err => {
                console.log(err);
            });
    };

    //Para mostrar el contenido de la tabla listada de Types
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id_type', //Atender según BD, creo
            key: 'id_type'
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

        //Parte de botones para editar y eliminar los registros
        {
            title: 'Actions',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Tooltip title="Edit">
                        <Button
                            type="primary"
                            shape="circle"
                            onClick={() => props.history.push(`${props.match.url}/edit/${record.id_type}`)}
                            icon={<EditFilled />} />
                    </Tooltip>
                    <Tooltip title="Delete">
                        <Button
                            type="danger"
                            shape="circle"
                            onClick={() => deleteType(record.id_type)}
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
                        {/*Botón para agregar un nuevo type */}
                        <Button
                            type="primary"
                            shape="round"
                            onClick={() => props.history.push(`${props.match.url}/new`)}
                            icon={<PlusOutlined />}>New Type</Button>
                    </Tooltip>
                </Col>
            </Row>
            <Table pagination={{ defaultCurrent: 1, pageSize: 5, total: types.length }} columns={columns} dataSource={types} />
        </div>
    )

}
export default TypeList;
