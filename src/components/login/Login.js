import { Form, Input, Button, Checkbox } from 'antd';
import React from "react"
import 'antd/dist/antd.css';
import './login.css';
import {useDispatch} from "react-redux"
/*import {login} from "../../Redux/actions"*/
import {navigateTo} from "../../Redux/actions/app"
import {Link} from "react-router-dom";
import {login} from "../../Redux/actions"

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

const Login = () => {
   // const counter = useSelector(state => state.counter)
    const dispatch=useDispatch();

    const onFinish = (values) => {
        console.log('Success:', values);
        dispatch(login(values))
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (

        <div className="loginForm" >
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
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your email!',
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
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit" onFinish={onFinish}>
                        Sign In
                    </Button>
                    <Button type="primary" htmlType="Register" onClick={()=>dispatch(navigateTo("/register"))}>
                        Register
                    </Button>
                </Form.Item>
            </Form>
            </div>
    );
};


export default Login


