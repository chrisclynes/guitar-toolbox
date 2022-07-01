import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Card, Form, Input, Button, Alert } from 'antd';
import { useAuth } from '../../contexts/AuthContext';

   
const Signup = ({ setMenuArray }) => {
    const { signup } = useAuth();
    const [error, setError] = useState('');
    const [success, setSucess] = useState(false)
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    

    const onFinish = async (values) => {
        if(values.password.length < 6){
            setError('Passwords must be at least 6 characters');
            return
        }
        if(values.username.length > 20){
            setError('Username is too long');
            return
        }
        try {
            setError('');
            setLoading(true);
            await signup(values.email, values.password, values.username);
            setSucess(true);
            setMenuArray(["dashboard"]);
            setTimeout(() => navigate("/mydashboard"), 1500);
        }catch {
            setError('Account could not be created');
        }
        setLoading(false);
      };
    
      const onFinishFailed = (errorInfo) => {
        setSucess(false);
        setError("information entered is incorrect");
      };
 
      
    return (
        <div className="page-container">
            <Card 
                title="Sign Up" 
                style={{maxWidth: "350px", margin: "1rem"}} 
                bodyStyle={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                <Form name="signup" labelCol={{span: 8,}} wrapperCol={{span: 16,}}initialValues={{remember: true,}}
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
                            type: 'email',
                            required: true,
                            message: 'Please enter a valid email address!',
                        },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                        {
                            required: true,
                            message: 'Please create a username!',
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
                        label="Confirm"
                        name="confirm"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                              if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                              }
                
                              return Promise.reject(new Error('The two passwords that you entered do not match!'));
                            },
                          }),
                        ]}
                    >
                        <Input.Password placeholder="confirm password"/>
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                        offset: 0,
                        span: 24,
                        }}
                    >
                        <Button 
                            disabled={loading} 
                            type="primary" 
                            htmlType="submit">
                                Sign Up
                        </Button>
                    </Form.Item>
                    {error && <Alert message={error} type="error" />}
                    {success && <Alert message="Success" type="success" />}
                </Form>  
            </Card>
            <Link to="/login" >
                Already have an account? Log in
            </Link>
        </div>
    )
}

export default Signup;