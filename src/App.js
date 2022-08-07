import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import HeroList from "./pages/HeroList";
import NoPage from "./pages/NoPage";


export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<NoPage />}>
                    <Route index element={<HeroList />} />
                    <Route path="*" element={<NoPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);