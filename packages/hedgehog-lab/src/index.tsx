import React from 'react';
import './index.css';
import App from './App';
import {createRoot} from "react-dom/client";

const container = document.getElementById('root');
// @ts-ignore
const root = createRoot(container);

root.render(<App/>)
