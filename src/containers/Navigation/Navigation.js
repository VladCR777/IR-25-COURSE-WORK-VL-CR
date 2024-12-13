import React from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import { LinkingWrapper } from './Navigation.styled';
import Home from '../Home/Home';
import DfsAlg from "../DFS/DFS";

import BuildTree from "../RBT/BuildTree";



const Navigation = () => (
    <Router>
        <LinkingWrapper>
            <ul>
                <li>
                    <NavLink to="/" className={({ isActive }) => (isActive ? 'selected' : '')}>Home</NavLink>
                </li>
                <li>
                    <NavLink to="/DFS" className={({ isActive }) => (isActive ? 'selected' : '')}>DFS</NavLink>
                </li>
                <li>
                    <NavLink to="/RBT" className={({ isActive }) => (isActive ? 'selected' : '')}>RBT</NavLink>
                </li>
            </ul>
            <Routes>
                <Route path="/DFS" element={<DfsAlg />} />
                <Route path="/RBT" element={<BuildTree />} />
                <Route path="/" element={<Home />} />
            </Routes>
        </LinkingWrapper>
    </Router>
);

export default Navigation;
