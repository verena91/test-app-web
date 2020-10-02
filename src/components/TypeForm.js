import React, { useEffect } from 'react';
import axios from 'axios';
import {Form, Button, Col, Input, Row } from 'antd';

function TypeForm(props) {
    const [form] = Form.useForm(); //De ANT, por debajo usa useStates

    useEffect(() => {
        console.log(props.match.params.typeID)
        if (props.match.params.typeID) {
            axios.get('/ws/rest/types/' + props.match.params.typeID)
                .then((res) => {
                    console.log(res.data);
                    form.setFieldsValue(res.data); //Rellenar campos
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }, []);

    //Envío del formulario: put o post
    const submit = (typeForm) => {
        //Actualizar
        if (props.match.typeID) {
            axios.put('/ws/rest/types/' + props.match.params.typeID, typeForm)
                .then((res) => {
                    console.log(res);
                    props.history.push('/types');
                })
                .catch((err) => {
                    console.log(err);
                })
        }
        //Crear
        else {
            axios.post('/ws/rest/types', typeForm)
                .then((res) => {
                    console.log(res);
                    props.history.push('/types');
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }

    const onFinish = values => {
        console.log('Success:', values);
        submit(values);
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    //Diseño del formulario
    return (
        <Form
            style={{ width: '60%', margin: '0 auto' }}
            form={form}
            layout="vertical"
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Required!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Description"
                name="description"
                rules={[{ required: true, message: 'Required!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Row>
                    <Col span={12}>
                        <Button type="default" onClick={() => props.history.push(`/types`)}>
                            Cancel
                        </Button>
                    </Col>
                    <Col span={12}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Col>
                </Row>
            </Form.Item>
        </Form>
    )
}
export default TypeForm;