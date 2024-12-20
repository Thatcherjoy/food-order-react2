import React from "react";
import { Button, Box } from "@mui/material";
import FooterLogo from "./../images/FooterLogo.png";

const Footer = ({ isAdminMode, onToggleMode }) => {
  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "0 0 20px 0",
        backgroundColor: "black",
        gap: "15px",
        marginTop: "auto",
      }}
    >
      <img
        src={FooterLogo}
        alt="Logo"
        style={{ width: "20vh", height: "15vh" }}
      />
      <Button
        variant="contained"
        onClick={onToggleMode}
        sx={{
          backgroundColor: "white",
          color: "black",
          minWidth: "120px",
          borderRadius: "4px",
          textTransform: "uppercase",
          fontWeight: "medium",
          padding: "6px 20px",
          "&:hover": {
            backgroundColor: "#e0e0e0",
          },
        }}
      >
        {isAdminMode ? "USER" : "ADMIN"}
      </Button>
    </Box>
  );
};

export default Footer;
