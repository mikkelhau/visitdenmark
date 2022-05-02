import Data from "./pages/Data";
import Result from "./pages/Result";
import Header from "./pages/Header";
import Footer from "./pages/Footer";
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Data />}></Route>
          <Route path="/result" element={<Result />}></Route>
          <Route path="*" element={<Navigate to="/" />}></Route>
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
