import React from 'react';
import {Form, Input, Button, Checkbox, message} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import "@/styles/register.less"
import {User} from "@/types/model";
import {register} from "@/api/user";
import {useNavigate} from "react-router-dom"
import {Rule} from 'antd/lib/form';

const Register: React.FC = () => {
    const navigate = useNavigate();
    const onFinish = async ({ agreement, ...values }: User & { agreement: boolean } ) => {
        //协议验证
        if (!agreement) {
            message.error('请阅读并同意协议后再注册');
            return;
        }
        const result = await register(values as User).then(res => {
            console.log('注册成功:', res);
            navigate('/login')
        })

    };
    //二次密码验证
    const validateConfirmPassword: Rule = ({getFieldValue}) => ({
        validator(_, value) {
            if (!value || getFieldValue('Password') === value) {
                return Promise.resolve();
            }
            return Promise.reject(new Error('您输入的两个密码不匹配!'));
        },
    });

    return (
        <div className="register-container">
            <Form
                name="register-form"
                initialValues={{remember: true}}
                onFinish={onFinish}
            >
                <Form.Item
                    name="Username"
                    rules={[{required: true, message: '请输入用户名!'}]}
                >
                    <Input prefix={<UserOutlined/>} placeholder="用户名"/>
                </Form.Item>
                <Form.Item
                    name="Password"
                    rules={[{required: true, message: '请输入密码!'}]}
                >
                    <Input prefix={<LockOutlined/>} type="password" placeholder="密码"/>
                </Form.Item>
                <Form.Item
                    name="confirm"
                    dependencies={['Password']}
                    hasFeedback
                    rules={[
                        {required: true, message: '请确认密码!'},
                        validateConfirmPassword,
                    ]}
                >
                    <Input.Password prefix={<LockOutlined/>} placeholder="确认密码"/>
                </Form.Item>
                <Form.Item>
                    <Form.Item name="agreement" valuePropName="checked" noStyle>
                        <Checkbox>
                            我已阅读并同意<a href="/">协议</a>
                        </Checkbox>
                    </Form.Item>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="register-button">
                        注册
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Register;
