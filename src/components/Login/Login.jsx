import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Card, Form, Input, Button, Alert, Checkbox } from 'antd';
import { useAuth } from '../../contexts/AuthContext';

   
const Login = ({}) => {
    const { login } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    

    const onFinish = async (values) => {
        if(values.password.length < 6){
            setError('Passwords must be at least 6 characters');
            return
        }
        try {
            setError('');
            setLoading(true);
            await login(values.email, values.password)
            //if successful route user to dashboard
            navigate("/mydashboard");
        }catch {
            setError("Email or password incorrect");
        }
        setLoading(false);
      };
    
      const onFinishFailed = () => {
        setError('Failed to log in');
      };

    return (
        <div className="page-container">
            <Card title="Log In" style={{maxWidth: "350px", margin: "1rem"}} bodyStyle={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                <Form name="login" labelCol={{span: 8,}} wrapperCol={{span: 16,}}initialValues={{remember: true,}}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    onChange={() => setError('')}
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
                        <Button disabled={loading} type="primary" htmlType="submit">
                            Log In
                        </Button>
                    </Form.Item>
                    {error && 
                        <Alert message={error} type="error" />
                    }
                    <Link to="/forgot-password" >
                                <div style={{textDecoration: "underline"}}>Forgot password?</div>
                            </Link>
                    </Form>
            </Card>
            <Link to="/signup" >
                <div >Dont have an account? Sign up!</div>
            </Link>
        </div>
    )
}

export default Login;