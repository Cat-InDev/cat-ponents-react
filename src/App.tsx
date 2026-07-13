import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import Index from './pages/Index/index';
import { COMPILATION_TO } from './config/envs/app.env';
import AppPage from './pages/App/index';
import './App.css';

function App() {
  
  const routes = 
  <>  
    <Routes>    
      {
        [
          <Route path="/" element={<Index />} />,
          <Route path="/app" element={<AppPage></AppPage>} />,
          <Route path="*" element={<Navigate to="/" replace={true} />}  />
        ] 
      }
    </Routes>
  </>

  return (
    <>{
      COMPILATION_TO === 'ELECTRON' ? 
        <HashRouter>
          {routes}
        </HashRouter>
        :
        <AppPage></AppPage>
    }</>
  );
}

export default function AppSB () {
  return (
    <App />
  )
}
