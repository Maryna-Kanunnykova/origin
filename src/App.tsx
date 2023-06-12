import { Route, Routes } from "react-router-dom";
import React, { Suspense } from "react";

import "./scss/app.scss";

import Header from "./components/Header";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound/NotFound";

const Cart = React.lazy(() => import("./pages/Cart"));

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/cart"
            element={
              <Suspense fallback={<h1>loading</h1>}>
                <Cart />
              </Suspense>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
