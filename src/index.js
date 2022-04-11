import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import  { ContextProvider } from './context/store'
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

axios.defaults.baseURL = 'http://localhost:5001/api'

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ContextProvider>
          <QueryClientProvider client={queryClient}>
              <App />
              <ToastContainer />
              <ReactQueryDevtools initialIsOpen={false} position="bottom-right"/>
          </QueryClientProvider>
      </ContextProvider>
    </BrowserRouter>
   </React.StrictMode>,
  document.getElementById('root')
);


