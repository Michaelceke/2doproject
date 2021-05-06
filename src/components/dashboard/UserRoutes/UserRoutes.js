import React, {lazy} from "react";

const todos=lazy(() =>import("../DashPages/Todos/Todos"));
const view=lazy(() =>import("../DashPages/Todos/View"));
const charts=lazy(() =>import("../DashPages/Todos/CreateTodosCharts"));


export const RouteUsers=[
    {
        path: '/todos',
        name:"todos",
        exact: true,
        component: todos
    },
    {
        path: '/todos/:id',
        name:"view",
        exact: true,
        component: view
    },

    {
        path: '/todos?todos=completed',
        name: "completed",
        exact:true,
        component: todos,
    },
    {
        path: '/todos?todos=progress',
        name: "progress",
        exact:true,
        component: todos,
    },
    {
        path: '/todos?todos=pending',
        name: "pending",
        exact:true,
        component: todos,
    },

    {
        path: '/todoscharts',
        name: "charts",
        exact:true,
        component: charts
    },


];