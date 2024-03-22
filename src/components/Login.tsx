import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import '@/styles/login.less';
import { User } from "@/types/model";
import { login } from "@/api/user";
import Register from "@/components/Register";

const Login: React.FC = () => {
    const [loading, setLoading] = useState(false);
    // 控制当前显示的是登录还是注册
    const [isRegister, setIsRegister] = useState(false);

    const handleLogin = async (values: any) => {
        console.log('接收到登录值:', values);
        setLoading(true);
        const { Username, Password }: User = values;
        try {
            const { data } = await login({ Username, Password });
            console.log('登录成功:', data);
            setLoading(false);
            message.success('登录成功');
        } catch (error) {
            console.error('登录失败:', error);
            setLoading(false);
            message.error('登录失败，请重试');
        }
    };

    const handleRegister = async (values: any) => {
        // 在这里处理注册逻辑
        console.log('接收到注册值:', values);
        // 注册成功后可以进行其他操作，例如关闭注册表单
        setIsRegister(false);
    };

    const onFinish = isRegister ? handleRegister : handleLogin;

    const onFinishFailed = (errorInfo: any) => {
        console.log('失败:', errorInfo);
    };

    return (
        <div className="login-container">
            {isRegister ? (
                <Register onFinish={onFinish} onFinishFailed={onFinishFailed} />
            ) : (
                <Form
                    name="login-form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        name="Username"
                        rules={[{ required: true, message: '请输入用户名!' }]}
                    >
                        <Input prefix={<UserOutlined />} placeholder="用户名" />
                    </Form.Item>
                    <Form.Item
                        name="Password"
                        rules={[{ required: true, message: '请输入密码!' }]}
                    >
                        <Input prefix={<LockOutlined />} type="password" placeholder="密码" />
                    </Form.Item>
                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>记住我</Checkbox>
                        </Form.Item>

                        <a className="login-form-forgot" href="/">
                            忘记密码
                        </a>
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="login-form-button"
                            loading={loading}
                        >
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            )}
        </div>
    );
};

export default Login;
