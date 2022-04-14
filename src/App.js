import React, {useEffect, useState} from "react";
import './styles/App.css'
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import About from "./pages/About";
import Posts from "./pages/Posts";
import Navbar from "./componets/UI/Navbar/Navbar";
import Error404 from "./pages/Error404";
import AppRouter from "./componets/AppRouter";

function App() {


    return (
    <BrowserRouter>
        <Navbar />
        <AppRouter />
    </BrowserRouter>
    );
}

export default App;
