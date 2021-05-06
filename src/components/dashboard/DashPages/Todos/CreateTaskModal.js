import { Modal, Button, Form, Input, Checkbox, Row, Col } from "antd";
import React, { useState ,useEffect} from "react";
import {createTask,editTask} from "../../../../Redux/actions/DashPages/todos";
import {connect} from "react-redux";
import isEmpty from 'lodash/isEmpty';

function CreateTaskModal(props) {
    const { showTaskModal, setShowTaskModal, initialValues,createTask,editTask,todoData,isCreatingTask,isEditingTask } = props;
    const [form] =Form.useForm();

    useEffect(() => {
            console.log("initialvalues oooo",initialValues);
            form.setFieldsValue(initialValues);
            return () =>  form.resetFields();
        }
        ,[initialValues]);
    /* const handleOk = () => {
          onVisible()
      };
      const handleCancel = () => {
         onVisible()
      };*/
    /*console.log('todoData::::', todoData);*/

    const onFinish = (values) => {
        console.log("values n tododata from task",values, todoData._id);
        if(isEmpty(initialValues)){
            createTask(values, todoData._id ,{onSuccess:() => setShowTaskModal(false)});
        }
       else{
            editTask( values, todoData._id, initialValues._id, {onSuccess:() => setShowTaskModal(false)} );
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
        /*setShowModal(false);*/
    };

    return (
        <>
            <Modal
                visible={showTaskModal}
                title={isEmpty(initialValues)?"Create Task":"Edit Task"}
                onOk={onFinish}
                loading={isCreatingTask}
                onCancel={() => setShowTaskModal(false)}
                footer={[
                    <Button key="back" onClick={() => setShowTaskModal(false)}>
                        Cancel
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        onClick={form.submit}
                        loading={isEmpty(initialValues)?isCreatingTask:isEditingTask}
                        disabled={todoData?.status==="Completed"}
                    >
                        {isEmpty(initialValues)?"Create Task":"Edit Task"}
                    </Button>,
                ]}
            >
                <Form
                    form={form}
                    name="basic"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Row>
                        <Col span={24}>
                            <h5>Task Description</h5>
                            <Form.Item
                                name="description"
                                rules={[
                                    {
                                        required: false,
                                        message: "Please input your description!",
                                    },
                                ]}
                            >
                                <Input style={{borderRadius:"5px"}}/>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
    );
}

const mapDispatchToProps = {
    createTask,
    editTask
};

const mapStateToProps = state => ({
    isCreatingTask: state.app.loading["createTask"],
    isEditingTask:state.app.loading["editTask"]
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateTaskModal);

