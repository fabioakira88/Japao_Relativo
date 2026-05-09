import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home/Home';
import Article from './pages/Article/Article';

export default function App() {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/artigo/:id" element={<Article />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
}
