import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  fetchTodo,
  deleteTask,
  todoStatusUpdate,
} from "../../../../Redux/actions/DashPages/todos";
import { connect } from "react-redux";
import { List, Avatar, Button, Tooltip, Tag, Select } from "antd";
import {
  SearchOutlined,
  DoubleLeftOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { upperFirst, startCase, isEmpty } from "lodash";
import { useHistory } from "react-router-dom";
import CreateTaskModal from "./CreateTaskModal";
import moment from "moment"

const View = (props) => {
  const {
    todoData,
    fetchTodo,
    isFetchingTodo,
    deleteTask,
    todoStatusUpdate,
      isUpdatingStatus
  } = props;
  const { id } = useParams();
  const [showTaskModal, setShowTaskModal] = useState(false);

  const [initialValues, setInitialValues] = useState({});
  const [status, setStatus] = useState({});
  const { Option } = Select;

  useEffect(() => {
    fetchTodo(id);
  }, [id]);


  const history = useHistory();
  const style = {
    position: "relative",
    float: "right",
    width: "100px",
    height: "40px",
    bottom: "60px",
  };
  console.log("todoData:::::::", todoData?.status);

  function handleSelectChange(value) {
    console.log(value);
    setStatus(value);
    todoStatusUpdate(value, todoData?._id);
  }

  const filteredStatus = ["Pending", "Completed", "Progress"].filter(
    (status) => status !== todoData?.status
  );
  const optionList = filteredStatus.map((status) => {
    return {
      label: status,
      value: status,
    };
  });

  return (
    <div style={{ marginLeft: 5, padding: 0 }}>
      <Tooltip title="Go back">
        <Button
          type="primary"
          style={{ bottom: 7, position: "relative" }}
          ghost={true}
          size={60}
          shape="circle"
          icon={<DoubleLeftOutlined />}
          onClick={history.goBack}
        />
      </Tooltip>

        <h1 style={{ fontSize: 40, display: "inline", marginLeft: 10 }}>
          {startCase(todoData?.name)}
        </h1>

        {
          /* isFetchingTodo?"": <Tag icon={<CheckCircleOutlined />} color={todoData?.status==="Pending"?"success":"processing"} style={{marginLeft:10,bottom:5,position:"relative"}}>{todoData?.status}</Tag>*/
          <Select
            value={todoData?.status}
            style={{ width: 120, bottom: 8, marginLeft: 10, visibility: isFetchingTodo?"hidden":"visible" }}
            onChange={handleSelectChange}
            loading={isUpdatingStatus}
            disabled={false}
            options={optionList}
          />
        }

        <span
          style={{ fontSize: 15, bottom: 5 , display:"block",marginLeft:42}}
        >
          {startCase(todoData?.description)}
        </span>
      <Button
        style={style}
        type="primary"
        ghost={true}
        size="large"
        shape="round"
        size={60}
        onClick={() => {
          setShowTaskModal(true);
          setInitialValues({});
        }}
      >
        Add Task
      </Button>
      {/* <span style={{fontSize:20,display:"block"}}>School preparation</span>*/}

      <List
        style={{ backgroundColor: "white", padding: 10, top: 20 }}
        bordered={true}
        className="demo-loadmore-list"
        split={true}
        loading={isFetchingTodo}
        itemLayout="horizontal"
        dataSource={todoData?.tasks}
        pagination={true}
        renderItem={(item) => (
          <List.Item
            style={{ marginRight: 200 }}
            actions={[
              <a
                key="list-loadmore-edit"
                style={{ marginRight: 30, marginLeft: 50 }}
                onClick={() => {
                  setInitialValues(item);
                  setShowTaskModal(true);
                }}
              >
                Edit
              </a>,
              <a
                style={{ marginLeft: 30, marginRight: 100 }}
                key="list-loadmore-more"
                onClick={() => deleteTask(item?.todoId, item?._id)}
              >
                Delete
              </a>,
            ]}
          >
            <List.Item.Meta
              title={
                <span>{upperFirst(item.description)}</span>
              }
              description={<span style={{fontWeight:"bold",fontFamily:"Lucida Console"}}>Created: {moment(item.createdAt).format('MMMM Do YYYY')}</span>}
            />
          </List.Item>
        )}
      />
      <CreateTaskModal
        showTaskModal={showTaskModal}
        setShowTaskModal={setShowTaskModal}
        initialValues={initialValues}
        todoData={todoData}
      />
    </div>
  );
};

const mapDispatchToProps = {
  fetchTodo,
  deleteTask,
  todoStatusUpdate,
};

const mapStateToProps = (state) => ({
  todoData: state?.todos?.current,
  isFetchingTodo: state.app.loading["fetchTodo"],
    isUpdatingStatus:state.app.loading["todoStatusUpdate"]
});

export default connect(mapStateToProps, mapDispatchToProps)(View);
