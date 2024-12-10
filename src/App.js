import React, { useState } from 'react';
import { CartProvider } from './store/cart-context';
import { ItemsProvider } from './store/items-context';
import UserPage from './pages/UserPage';
import AdminPage from './pages/AdminPage';
import Footer from './components/Footer';

function App() {
  const [isAdminMode, setIsAdminMode] = useState(false);

  const toggleModeHandler = () => {
    setIsAdminMode(prevMode => !prevMode);
  };

  return (
    <ItemsProvider>
      <CartProvider>
        {isAdminMode ? <AdminPage /> : <UserPage />}
        <Footer 
          isAdminMode={isAdminMode} 
          onToggleMode={toggleModeHandler} 
        />
      </CartProvider>
    </ItemsProvider>
  );
}

export default App;