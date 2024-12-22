import React, { useState } from "react";
import { CartProvider } from "./store/cart-context";
import { ItemsProvider } from "./store/items-context";
import UserPage from "./pages/UserPage";
import AdminPage from "./pages/AdminPage";
import Footer from "./components/Footer";
import { Box } from "@mui/material";

function App() {
  const [isAdminMode, setIsAdminMode] = useState(false);

  const toggleModeHandler = () => {
    setIsAdminMode((prevMode) => !prevMode);
  };

  return (
    <Box
      sx={{
        backgroundColor: "#f4f1e8",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <ItemsProvider>
        <CartProvider>
          <Box sx={{ flex: 1 }}>
            {isAdminMode ? <AdminPage /> : <UserPage />}
          </Box>
          <Footer isAdminMode={isAdminMode} onToggleMode={toggleModeHandler} />
        </CartProvider>
      </ItemsProvider>
    </Box>
  );
}

export default App;
