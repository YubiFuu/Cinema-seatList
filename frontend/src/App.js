import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";

function App() {
    const [seatList, setSeatList] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8001/seat-list")
            .then((res) => res.json())
            .then((seats) => setSeatList(seats));
    }, []);

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Home
                                seatList={seatList}
                                setSeatList={setSeatList}
                            />
                        }
                    />
                    <Route
                        path="/admin"
                        element={
                            <Admin
                                seatList={seatList}
                                setSeatList={setSeatList}
                            />
                        }
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
