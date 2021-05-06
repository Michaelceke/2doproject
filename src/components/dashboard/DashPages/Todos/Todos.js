import React,{useEffect,useState} from 'react';
/*import {columns} from "./util";*/
import {columnFunction} from "./util";
import {Table,Button,size} from "antd";
import { connect, useDispatch } from "react-redux";
import {fetchTodos} from "../../../../Redux/actions/DashPages/todos";
import { PlusSquareOutlined,LoadingOutlined } from '@ant-design/icons';
import CreateTodoModal from "./CreateTodoModal"
import View from "./View"
import {upperFirst} from "lodash"
import {navigateTo} from "../../../../Redux/actions/app";
import {
    useLocation
} from "react-router-dom";




function useQuery(){
    return new URLSearchParams(useLocation().search)
}


function Todos (props) {
    const {fetchTodos, todosData, isFetchingTodos} = props;
    const [showModal, setShowModal]=useState(false);
    const [initialValues, setInitialValues]=useState({});
    const dispatch = useDispatch();
    const query=useQuery();
    const queryStrings=upperFirst(query.get("todos"));


    const antIcon = <LoadingOutlined style={{ fontSize: 80 }} spin />;
    const tableLoading = {
        spinning: isFetchingTodos,
        indicator: antIcon,
    };

    useEffect(() => {
       fetchTodos()
    }, [fetchTodos]);

    const style={
        position:"relative",
        float:"right",
        width:"100px",
        height:"40px",
        top:"10px"
    };

   function filterTodoData(query,todosData){
       console.log("todosData", todosData)
       let dataSource;
        if(query){
            dataSource=todosData.filter(todo=> todo?.status===query);
        }
        else {
             dataSource=todosData;
        }
        return dataSource
    }

    const dataSource=filterTodoData(queryStrings,todosData)

    return (
       <>
        <div>
                    <div>
                        <h1 style={{fontSize:40,display:"inline"}}>Todos</h1>
                        <Button style={style} type="primary"  ghost={true} size="large" shape="round"  size={60} onClick={()=>{setInitialValues({});setShowModal(true)}}>
                            Add Todos
                        </Button>
                        <Table columns={columnFunction(dispatch, setShowModal, setInitialValues,navigateTo)} dataSource={dataSource} loading={tableLoading}/>
                        <CreateTodoModal setShowModal={setShowModal} showModal={showModal} initialValues={initialValues}/>
                    </div>
        </div>
       </>
    );
}

const mapDispatchToProps = {
    fetchTodos,
  /*  createTask,
    editTask,
    deleteTask*/
};

const mapStateToProps = state => ({
    todosData: state.todos.byList,
    isFetchingTodos: state.app.loading["fetchTodos"],
});

export default connect(mapStateToProps, mapDispatchToProps)(Todos);
