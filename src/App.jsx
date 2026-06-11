import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Topbar from './components/Topbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Analytics from './pages/Analytics';
import Placeholder from './pages/Placeholder';

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <Topbar />
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/assets" element={<Placeholder title="Assets" icon="◇" />} />
            <Route path="/seasons" element={<Placeholder title="Seasons" icon="◎" />} />
            <Route path="/team" element={<Placeholder title="Team" icon="◉" />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
