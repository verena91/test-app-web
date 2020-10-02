import React, { useEffect } from 'react'; 
import axios from 'axios'; 
import {Form, Button, Col, Input, Row } from 'antd'; 
import { formatCountdown } from 'antd/lib/statistic/utils';

function TypeForm (props) {
    const [Form] = Form.useForm();

    useEffect(() => {
        if (props.match.typeID){
            axios.get('/ws/rest/types/'+ props.match.typeID)
                .then((res)=> {
                     console.log(res.date); 
                form.SetFieldsValues(res.data); //rellenar campos
        })
        .catch((err) => {
            console.log(err);
        })
    }
}, []);


//envío del formulario: put o post 

const submit = (TypeForm) => {
    //Actualizar
    if (props.match.typeID){
        axios.put('/ws/rest/types/' + props.match.typeID, typeform)
        .then((res) => {
            console.log(res);
            props.history.push('/types');
        })
        .catch((err) => {
            console.log(err);
        })
    }
    else {
        axios.put('/ws/rest/types/', typeform)
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
    console.log('Success', values);
    submit(values);
};

const onFinishFailed = errorInfo => {
    console.log('Failed', errorInfo);
};

return (
    <Form
        style = {{width: '60%', margin: '0 auto'}}
        form = {form}
        layout = "vertical"
        name = "basic"
        initialValues= {{remember: true}}
        onFinish = {onFinish}
        onFinishFailed = {onFinishFailed}
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
            <Form.item wrapperCol = {{ offset: 8, span: 16 }}>
                <Row>
                    <Col span = {12}>
                        <Button type ="default" onClick = {() => props.history.push('/tasks')}>
                            Cancel 
                        </Button>
                    </Col>
                    <Col span = {12}>
                        <Button type = "primary" htmlType ="submit">
                            submit
                        </Button>
                    </Col>
                </Row>
            </Form.item>
        </Form>
)


}

export default TypeForm;