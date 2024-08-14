import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
} from '@clerk/clerk-react';
import { AuthProvider } from './contexts/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Bolsas from './pages/inventario/Bolsas';
import DataProvider from './contexts/DataProvider';
import { Realtime } from 'ably';
import { AblyProvider, ChannelProvider } from 'ably/react';
import esES from 'antd/es/locale/es_ES';
import { ConfigProvider } from 'antd';
import System from './pages/System';
import Maquila from './pages/administracion/Maquila';
import AdministracionSidebar from './components/sidebar/AdministracionSidebar';
import AlmacenSidebar from './components/sidebar/AlmacenSidebar';
import ContactosSidebar from './components/sidebar/ContactosSidebar';
import Contactos from './pages/contactos/Contactos';
import Contacto from './components/formularios/Contacto';
import BankTable from './components/res_bank/BankTable';
import BankFormEdit from './components/res_bank/BankFormEdit';
import BankFormContainer from './components/res_bank/BankFormContainer';

const App: React.FC = () => {
  const client = new Realtime({
    key: '4WZdPQ.paOhIA:P-bcJ53iaZzOgU2Vs6KD_Eg1z7kfxh2CmX3mXtfcgUY',
  });

  const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

  if (!PUBLISHABLE_KEY) {
    throw new Error('Missing Publishable Key');
  }
  return (
    <ConfigProvider locale={esES}>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <AuthProvider>
          <Router>
            <AblyProvider client={client}>
              <ChannelProvider channelName="get-started">
                <DataProvider>
                  <SignedOut>
                    <Routes>
                    <Route path="/" element={<Navigate to="/login" />} />
                      <Route path="/login" element={<Login />} />
                    </Routes>
                  </SignedOut>
                  <SignedIn>
                    <Routes>
                      {/* <Route path="*" element={<Navigate to="/system" />} /> */}
                      <Route path="/system" element={<System />} />
                      <Route element={<AlmacenSidebar />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/bolsas" element={<Bolsas />} />
                      </Route>
                      <Route element={<AdministracionSidebar />}>
                        <Route
                          path="/administracion/maquila"
                          element={<Maquila />}
                        />
                      </Route>
                      <Route element={<ContactosSidebar />}>
                        <Route path="/contactos" element={<Contactos />} />
                        <Route path="/contacto/:id" element={<Contacto/>} />
                        <Route path="/contacto/nuevo" element={<Contacto/>} />
                        <Route path="/contactos/bancos" element={<BankTable/>} />
                        <Route path="/contactos/banco/:id" element={<BankFormEdit/>} />
                        <Route path="/contactos/banco/nuevo" element={<BankFormContainer/>} />

                      </Route>
                    </Routes>
                  </SignedIn>
                </DataProvider>
              </ChannelProvider>
            </AblyProvider>
          </Router>
        </AuthProvider>
      </ClerkProvider>
    </ConfigProvider>
  );
};

export default App;
