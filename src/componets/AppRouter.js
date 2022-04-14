import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import About from "../pages/About";
import Posts from "../pages/Posts";
import Error404 from "../pages/Error404";
import PostIdPages from "../pages/PostIdPages";

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/about" element={<About />} />
            <Route path={"/posts"} element={<Posts />} />
            <Route exact path={"/posts/:id"} element={<PostIdPages />} />
            <Route path={"/error-404"} element={<Error404 />} />
            <Route path={"/"} element={<Navigate replace to={"/posts"} />} />
            <Route path={"*"} element={<Navigate replace to={"/error-404"} />} />
        </Routes>
    );
};

export default AppRouter;