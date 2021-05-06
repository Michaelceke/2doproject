import { Form, Input, Button} from 'antd';
import React from "react"
import 'antd/dist/antd.css';
import './register.css';
import {useDispatch} from "react-redux"
import {navigateTo, register} from "../../Redux/actions"

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

const Register = () => {
    // const counter = useSelector(state => state.counter)
    const dispatch=useDispatch();

    const onFinish = (values) => {
        console.log('Success:', values);
       dispatch(register(values))
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className="registerForm">
            <Form
                {...layout}
                name="basic"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="First Name"
                    name="firstName"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your firstname!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Last Name"
                    name="lastName"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your lastname!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your email!',
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item {...tailLayout} >
                    <Button type="primary" htmlType="Register" onClick={()=>dispatch(navigateTo("/login"))} >
                        Back
                    </Button>
                    <Button type="primary" htmlType="Register" onFinish={onFinish} >
                        Register
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Register

