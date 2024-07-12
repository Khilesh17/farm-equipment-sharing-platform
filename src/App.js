import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import OpenRoute from "./components/core/Auth/OpenRoute";
import Category from "./pages/Category";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Cart from "./pages/Cart";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import MyProfile from "./components/core/Dashboard/MyProfile";
import Setting from "./components/core/Dashboard/Setting/Setting";
import MyEquipments from "./components/core/Dashboard/Equipments/MyEquipments";
import RentedEquipments from "./components/core/Dashboard/Equipments/RentedEquipments";

function App() {
  return (
    <div className="w-screen min-h-screen flex flex-col font-inter">


      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />

        <Route
          path="/login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />

        <Route
          path="/signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />

        <Route
          path="/category/:categoryName"
          element={<Category />}
        />

        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          }
        />

        <Route
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route
            path="/dashboard/my-profile"
            element={<MyProfile />}
          />
          <Route
            path="/dashboard/my-equipments"
            element={<MyEquipments />}
          />
          <Route
            path="/dashboard/rented-equipments"
            element={<RentedEquipments />}
          />
          <Route
            path="/dashboard/cart"
            element={<Cart />}
          />
          <Route
            path="/dashboard/settings"
            element={<Setting />}
          />
        </Route>
      </Routes>

    </div>
  );
}

export default App;
