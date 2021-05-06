import React, { useState, Suspense } from "react";
import ReactDOM from "react-dom";
import logo from "./logo.png";
import "antd/dist/antd.css";
import "./dashboard.css";
import { Layout, Menu, Breadcrumb,Badge } from "antd";
import { Tooltip } from "antd";
import { connect, useDispatch } from "react-redux";
import { navigateTo } from "../../Redux/actions/app";
import { Switch, Route, Link, useRouteMatch } from "react-router-dom";
import { RouteUsers } from "./UserRoutes/UserRoutes";

import {
  FileOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  CarryOutOutlined,
  PlusCircleOutlined,
  PieChartOutlined,
  LogoutOutlined,
  FullscreenExitOutlined,
} from "@ant-design/icons";

import {fetchTodos, logout} from "../../Redux/actions";
import CreateTodoModal from "./DashPages/Todos/CreateTodoModal";

const { Header, Content, Footer, Sider } = Layout;

function DashBoard(props) {
  const { userFirstName,todosData } = props;
  const [showModal, setShowModal]=useState(false);

  const { path, url } = useRouteMatch();
  const dispatch = useDispatch();
  console.log(path, url);
  const [collapsed, setCollapse] = useState(false);
  const initialValues={};

  let pending=0,complete=0,progress=0;
  todosData.map((todo)=>{
    if(todo.status==="Pending"){
      pending=pending+1
    }
    else if (todo.status==="Progress"){
      progress=progress+1
    }
    else  if (todo.status==="Completed") {
      complete = complete + 1
    }
  });


  const onCollapse = (collapsed) => {
    console.log(collapsed);
    setCollapse(collapsed);
  };

  const badgeStyle={
    color: "white",
  backgroundColor: "#2db7f5",
  boxShadow: "0 0 0 1px #d9d9d9 inset"
  };



  const handleClick = (e) => {
    if (e.key === "7") {
      dispatch(logout()); //////check here
      dispatch(navigateTo("/"));
    }
    if (e.key === "1") {
      setShowModal(true)
    }
  };

  const Loading = () => (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
  );

  return (
      <>
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        theme="light"
        collapsible
        collapsed={collapsed}
        onCollapse={onCollapse}
      >
        <div className="logo" style={{ position: "relative" }}>
          <img
            src={logo}
            alt={"Todo App Logo"}
            style={{ display: "inline", position: "absolute", bottom: "-80px" }}
          />
        </div>

        <Menu theme="light" mode="inline" onClick={(e) => handleClick(e)}>
          <Menu.Item key="1" icon={<PlusCircleOutlined />}>
            <Tooltip title="Adds a new Todo Event to your list">
              <span>
                <Link to="/todos"> Add Todo</Link>
              </span>
            </Tooltip>
          </Menu.Item>

          <Menu.Item key="2" icon={<FullscreenExitOutlined />}>
            <Tooltip title="All Todo">
              <span>
                <Link to="/todos">All Todo</Link>
              </span>
            </Tooltip>
          </Menu.Item>

          <Menu.Item key="3" icon={<ExclamationCircleOutlined />}>
            <Tooltip title="Pending Todo">
              <Badge count={pending}  showZero={true} style={badgeStyle} offset={[13, 0]}>
                <Link to="/todos?todos=pending">Pending</Link>
              </Badge>
            </Tooltip>
          </Menu.Item>

          <Menu.Item key="4" icon={<ClockCircleOutlined />}>
            <Tooltip title="Todo in progress">
              <Badge count={progress} showZero={true} style={badgeStyle} offset={[13, 0]}>
                <Link to="/todos?todos=progress">In-Progress</Link>
              </Badge>
            </Tooltip>
          </Menu.Item>
          <Menu.Item key="5" icon={<CarryOutOutlined />}>
            <Tooltip title="Completed Todo">
              <Badge count={complete} showZero={true} style={badgeStyle} offset={[13, 0]}>
                <Link to="/todos?todos=completed">Completed</Link>
              </Badge>
            </Tooltip>
          </Menu.Item>
          <Menu.Item key="6" icon={<PieChartOutlined />}>
            <Tooltip title="display todo chart">
              <span>
                <Link to="/todoscharts">Todo Chart</Link>
              </span>
            </Tooltip>
          </Menu.Item>
          <Menu.Item key="7" icon={<LogoutOutlined />}>
            LogOut
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <h3 style={{ right: 20, position: "absolute", top: 40 }}>
          Welcome {userFirstName}
        </h3>
        <Content style={{ margin: "0 16px" }}>
          <Suspense fallback={Loading}>
            <Switch>
              {RouteUsers.map((route, idx) => {
                return (
                  <Route
                    key={idx}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    component={route.component}
                  />
                );
              })}
              <Route component={<div>hi</div>} />
            </Switch>
          </Suspense>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          {" "}
          TickTime ©2021 Created by Anjelo.inc
        </Footer>
      </Layout>
    </Layout>
        <CreateTodoModal setShowModal={setShowModal} showModal={showModal} initialValues={initialValues}/>
        </>
  );
}



const mapStateToProps = (state) => ({
  userFirstName: state?.auth?.user?.data?.firstName,
  todosData: state.todos.byList
});

export default connect(mapStateToProps)(DashBoard);
