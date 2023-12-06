import { Routes, Route } from "react-router-dom";

import Trivia from "./pages/Trivia";
import Category from "./pages/Category";
import Question from "./pages/Question";

import "./sass/app.css";

export function App() {
  return (
      <Routes>
        <Route path="/" element={<Trivia />} />
        <Route path="/category/:cat" element={<Category />} />
        <Route path="/question/:cat" element={<Question />} />
      </Routes>
  );
}
