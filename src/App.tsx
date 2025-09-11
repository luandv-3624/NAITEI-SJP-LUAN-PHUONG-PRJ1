import { BrowserRouter, Route, Routes } from 'react-router';
import { Home } from './pages';
import { MainLayout } from './layouts';
import { useThemeEffect } from './features/theme';
import './i18n';

function App() {
  useThemeEffect();

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path='/' element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
