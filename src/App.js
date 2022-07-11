import { BrowserRouter, Route, Routes, withRouter } from "react-router-dom";
import HomeMenuPage from "./views/homeMenu";
import Order from "./views/order";
import HomePage from "./views/homePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<HomePage />} exact/>
      <Route path="/menu" element={<HomeMenuPage />} exact/>
      <Route path="/order" element={<Order />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
