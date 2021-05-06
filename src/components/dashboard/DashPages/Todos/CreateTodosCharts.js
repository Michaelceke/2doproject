import React,{useEffect,useState} from 'react';
import {Table,Button,size} from "antd";
import { connect, useDispatch } from "react-redux";
import {fetchTodos} from "../../../../Redux/actions/DashPages/todos";
import {upperFirst} from "lodash"
import {navigateTo} from "../../../../Redux/actions/app";
import { PieChart, Pie, Legend, Tooltip,ResponsiveContainer,Cell,BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";



function CreateTodosCharts (props) {
    const {todosData,fetchTodos} = props;

    useEffect(() => {
        fetchTodos()
    }, [fetchTodos]);

    const dispatch = useDispatch();
  console.log("todosData chart",todosData)
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

   const chartData=[
       {
           name:"Todo Pending",
           value: pending
       },
       {
           name:"Todo Completed",
           value: complete
       },
       {
           name:"Todo in Progress",
           value: progress
       }
   ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

   console.log(`shoe them all pending ${progress} ${pending}  ${complete}`);  // take off

    return (
        <>
            <h1 style={{fontSize:40}}>Todo Chart</h1>
                <div style={{width:400, height:400, marginLeft:100, display:"inline-block"}}>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart width={400} height={400}>
                            <Pie
                                data={chartData}
                                isAnimationActive={false}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={renderCustomizedLabel}
                                outerRadius={180}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend verticalAlign="bottom" height={36} style={{marginTop:20}}/>
                        </PieChart>
                    </ResponsiveContainer>





                <h1 style={{marginLeft:60, marginTop:40}}>Pie Chart Representing Data</h1>
                </div>

                <div style={{width:400, height:400, marginLeft:10, display:"inline-block"}}>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            width={500}
                            height={400}
                            data={chartData}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 50,
                                bottom: 5,
                            }}
                            barSize={35}
                        >
                            <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <CartesianGrid strokeDasharray="3 3" />
                            <Bar dataKey="value" fill="#8884d8" background={{ fill: '#eee' }} />
                        </BarChart>
                    </ResponsiveContainer>
                    <h1 style={{marginLeft:60,  marginTop:40}}>Bar Chart Representing Data</h1>
                </div>

        </>
    );
}

const mapDispatchToProps = {
    fetchTodos,
};

const mapStateToProps = state => ({
    todosData: state.todos.byList
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateTodosCharts);
