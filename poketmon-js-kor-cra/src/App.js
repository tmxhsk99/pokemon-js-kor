import React, {Component} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";

import Main from './pages/Main/Main';
import Intro from './pages/Intro/Intro';
import NotFound from "./components/NotFound";
import Battle  from "./pages/Battle/Battle";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Intro/>}></Route>
                    <Route path="/Main" element={<Main/>}></Route>
                    <Route path="/Battle" element={<Battle/>}></Route>
                    {/* 상단에 위치하는 라우트들의 규칙을 모두 확인, 일치하는 라우트가 없는 경우 처리 */}
                    <Route path="*" element={<NotFound/>}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
