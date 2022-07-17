import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Card, Form, Input, Button, Alert } from 'antd';
import { useAuth } from '../../contexts/AuthContext';
   
const Login = () => {
    const { resetPassword } = useAuth();
    const [error, setError] = useState('');
    const [success, setSucess] = useState(false)
    const [loading, setLoading] = useState(false);
    

    const onFinish = async (values) => {
        try {
            setError('');
            setLoading(true);
            console.log(values.email)
            await resetPassword(values.email)
            setSucess(true);
        }catch {
            setError("Reset failed");
        }
        setLoading(false);
      };
    
      const onFinishFailed = () => {
        setSucess(false);
        setError('Information incorrect');
      };

    return (
        <div className="page-container">
            <Card title="Password Reset" style={{maxWidth: "350px", margin: "1rem"}} bodyStyle={{display: "flex", justifyContent: "center", alignItems: "center"}}>
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
                        wrapperCol={{
                        offset: 0,
                        span: 24,
                        }}
                    >
                        <Button disabled={loading} type="primary" htmlType="submit">
                            Reset Password
                        </Button>
                    </Form.Item>
                    {error && 
                        <Alert message={error} type="error" />
                    }
                    {success && 
                        <Alert message="Success, check your inbox" type="success" />
                    }
                    </Form> 
            </Card>
            <Link to="/signup" >
                <div >Dont have an account? Sign up!</div>
            </Link>
        </div>
    )
}

export default Login;