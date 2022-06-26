import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Card, Form, Input, Button, Alert } from 'antd';
import { useAuth } from '../../contexts/AuthContext';

const UpdateProfile = ({ metronomeInterval, isPlaying, setIsPlaying}) => {
    const { signup, currentUser } = useAuth();
    const [error, setError] = useState('');
    const [success, setSucess] = useState(false)
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
            await signup(values.email, values.password)
            setSucess(true);
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
            <Card title="Update Profile" style={{maxWidth: "350px", margin: "1rem"}} bodyStyle={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                <Form name="login" labelCol={{span: 8,}} wrapperCol={{span: 16,}}initialValues={{remember: true,}}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    onChange={() => setError('')}
                    autoComplete="off"
                    >
                    <Form.Item
                        label="Email"
                        name="email"
                        defaultValue={currentUser.email}
                        rules={[
                        {
                            required: false,
                        },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        placeholder="Leave blank to keep the same"
                        rules={[
                        {
                            required: false,
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
                            message: 'Leave blank to keep the same',
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

export default UpdateProfile;