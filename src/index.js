import React from "react";
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { AuthProvider } from "./contexts/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <AuthProvider>
        <Router>
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </Router>
    </AuthProvider>
)