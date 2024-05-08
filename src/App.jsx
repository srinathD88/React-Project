import { Suspense } from "react";
import { Outlet } from "react-router-dom";

import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Loader from "./components/utils/Loader.jsx";

import "./App.css";

const App = () => {
  return (
    <div className="app">
      <Header />
      <main>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default App;
