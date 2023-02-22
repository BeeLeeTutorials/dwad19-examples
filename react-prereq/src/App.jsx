import React from "react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import DataArray from "./DataArray";
import Hello from "./Hello";
import SimpleStates from "./SimpleStates";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Hello name="Billy"/>,
  },
  {
    path: 'simple-states',
    element: <SimpleStates />
  },
  {
    path: 'data-array',
    element: <DataArray />
  }
]);

const App = () => {
    return <RouterProvider router={router}/>
}

export default App;