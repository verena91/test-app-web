import axios from 'axios';
import React, { useEffect, useState} from 'react';
import { Form, Input, Button, DatePicker, Select, Row, Col } from 'antd';




function TypeForm (props){
    
    const [form] = Form.useForm();
    const [types, setTypes] = useState([]);

        useEffect(() => {
            axios.get('/ws/rest/types')
                .then(res => {
                    setTypes(res.data)
                })
                .catch(err => {
                    console.log(err);
                });
    }, []);
    
    const submit = (formType) => {
        formType.type = {
            id: formType.type
        }
        const { match, history } = props;
        if (match.params.typeId) {
            axios.put(`/ws/rest/types/${match.params.typeId}`, formType)
                .then((rsp) => {
                    alert('exito');
                    history.push('/types');
                });
        } else {
            axios.post(`/ws/rest/types/`, formType)
                .then((rsp) => {
                    alert('exito');
                    history.push('/types');
                });
        }
    }
    
    
    const onFinish = values => {
        console.log('Success:', values);
        submit(values);
    };
    
    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            style={{width: '60%', margin: '0 auto'}}
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
                        <Button type="default" onClick={() => props.history.push(`/type`)}>
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