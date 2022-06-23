import React from 'react';
import { Layout, Card, Form, Input, Checkbox, Button } from 'antd';

   
const Signup = ({}) => {

    const onFinish = (values) => {
        console.log('Success:', values);
      };
    
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };
 
    return (
        <div className="page-container">
            <Card title="Sign Up" style={{width: "300px", margin: "1rem"}} bodyStyle={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                <Form name="sign-up" labelCol={{span: 8,}} wrapperCol={{span: 16,}}initialValues={{remember: true,}}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                        {
                            required: true,
                            message: 'Please input an email address!',
                        },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                        {
                            required: true,
                            message: 'Please input a password!',
                        },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        name="remember"
                        valuePropName="checked"
                        wrapperCol={{
                        offset: 0,
                        span: 24,
                        }}
                    >
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                        offset: 0,
                        span: 24,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                        Sign Up
                        </Button>
                    </Form.Item>
                    </Form>
            </Card>
        </div>
    )
}

export default Signup;