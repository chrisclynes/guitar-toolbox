import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Card, Form, Input, Button, Alert } from 'antd';
import { useAuth } from '../../contexts/AuthContext';

const UpdateProfile = ({ metronomeInterval, isPlaying, setIsPlaying}) => {
    const { currentUser, updateEmail, updatePassword, logout } = useAuth();
    const [error, setError] = useState('');
    const [success, setSucess] = useState(false)
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    

    const onFinish = (values) => {
        if(values.password && values.password.length < 6){
            setSucess(false);
            setError('Passwords must be at least 6 characters');
            return
        }

        const promises = []
        setLoading(true);
        setError("");

        if (values.email !== currentUser.email) {
            promises.push(updateEmail(values.email))
        }
        if (values.password) {
            promises.push(updatePassword(values.password))
        }

        Promise.all(promises).then(() => {
            setSucess(true);
        }).catch(() => {
            setSucess(false)
            setError("Failed to update profile information, logout and try again")
        }).finally(() => {
            setLoading(false);
        })
    }
    
      const onFinishFailed = (errorInfo) => {
        setSucess(false);
        setError("information entered is incorrect");
      }

      const handleLogout = async () => {

        try {
            await logout();
                navigate("/");
        } catch {
            console.log("logout failed")
        }
    }

    return (
        <div className="page-container">
            <Button type="primary" onClick={handleLogout}>
                Log out
            </Button>
            <Card title="Profile" style={{maxWidth: "350px", margin: "1rem"}} bodyStyle={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                <Form name="login" labelCol={{span: 8,}} wrapperCol={{span: 16,}}initialValues={{remember: true,}}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    onChange={() => setError('')}
                    autoComplete="off"
                    >
                    <Form.Item
                        label="Email"
                        name="email"
                        initialValue={currentUser.email}
                        rules={[
                        {
                            required: true,
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
                            required: false,
                        },
                        ]}
                    >
                    <Input.Password placeholder="Leave blank to keep current"/>
                    </Form.Item>
                    <Form.Item
                        label="Confirm"
                        name="confirm"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                        {
                            required: false,
                            message: 'Leave blank to keep current',
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
                            Update Profile
                        </Button>
                    </Form.Item>
                    {error && 
                        <Alert message={error} type="error" />
                    }
                    {success && 
                        <Alert message="Account has been updated" type="success" />
                    }
                    </Form>
            </Card>
            <Link to="/mydashboard" >
                <div >Cancel</div>
            </Link>
        </div>
    )
}

export default UpdateProfile;