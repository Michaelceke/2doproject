import { Modal, Button, Form, Input, Checkbox, Row, Col } from "antd";
import React, { useState ,useEffect} from "react";
import {createTodo,editTodo} from "../../../../Redux/actions/DashPages/todos";
import {connect} from "react-redux";
import isEmpty from 'lodash/isEmpty';

function CreateTodoModal(props) {
  const { showModal, setShowModal, createTodo,editTodo,isCreatingTodo, initialValues,isEditingTodo } = props;
  const [form] =Form.useForm();

 useEffect(() => {
     console.log("initialvalues oooo",initialValues)
     form.setFieldsValue(initialValues)
      return () =>  form.resetFields();
     }
     ,[initialValues]);
  /* const handleOk = () => {
        onVisible()
    };
    const handleCancel = () => {
       onVisible()
    };*/
    console.log('initialValues::::', initialValues);

  const onFinish = (values) => {
      console.log("values",values);
      if(isEmpty(initialValues)){
          createTodo(values, {onSuccess:() => setShowModal(false)});

      }
      else{
          editTodo( initialValues._id, values, {onSuccess:() => setShowModal(false)});
      }
  };


  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
      /*setShowModal(false);*/
  };

  return (
    <>
      <Modal
        visible={showModal}
        title={isEmpty(initialValues)?"Create Todo":"Edit Todo"}
        onOk={onFinish}
        onCancel={() => setShowModal(false)}
        footer={[
          <Button key="back" onClick={() => setShowModal(false)}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={isEmpty(initialValues)?isCreatingTodo:isEditingTodo}
            onClick={form.submit}
          >
              {isEmpty(initialValues)?"Create Todo":"Edit Todo"}
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
              <h5>Name</h5>
              <Form.Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please input your name!",
                  },
                ]}
              >
                <Input style={{borderRadius:"5px"}}/>
              </Form.Item>
            </Col>
            <Col span={24}>
              <h5>Description</h5>
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
    createTodo,
    editTodo
    /*  createTask,
      editTask,
      deleteTask*/
};

const mapStateToProps = state => ({
    isCreatingTodo: state.app.loading["createTodo"],
    isEditingTodo: state.app.loading["editTodo"]
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateTodoModal);

