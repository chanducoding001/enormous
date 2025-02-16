import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Button,
  Typography,
  Container
} from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import ButtonLink from "../reusables/ButtonLink";
import InstallButton from "../reusables/InstallButton";

const LayoutComponent = () => {
  const [isLogin, setIsLogin] = React.useState(
    !!JSON.parse(localStorage.getItem("loginUser"))
  );
  const navigate = useNavigate();

  React.useEffect(() => {
    const handleLoginChange = () => {
      setIsLogin(!!JSON.parse(localStorage.getItem("loginUser")));
    };

    window.addEventListener("loginStatusChanged", handleLoginChange);
    return () => {
      window.removeEventListener("loginStatusChanged", handleLoginChange);
    };
  }, []);

  const logout = () => {
    localStorage.removeItem("loginUser");
    window.dispatchEvent(new Event("loginStatusChanged"));
    navigate("/login");
  };

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 2,
              paddingY: { xs: 1, sm: 2 },
            }}
          >
            {/* LOGO + TITLE */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                flexShrink: 0,
                cursor:'pointer'
              }}
              onClick={()=>navigate("/")}
            >
              <img
                src="./logoImg.png"
                height="40px"
                width="40px"
                alt="Enormous Logo"
                style={{ borderRadius: "50%" }}
              />
              <Typography
                sx={{
                  display: { xs: "none", sm: "block" },
                  fontSize: { xs: "16px", sm: "20px" },
                  fontWeight: "bold",
                  
                }}
              >
                Enormous IT
              </Typography>
            </Box>

            {/* NAVIGATION BUTTONS */}
            <Box
              sx={{
                display: "flex",
                gap: 1,
                flexWrap: "wrap",
                justifyContent: { xs: "center", sm: "flex-end" },
                width: { xs: "100%", sm: "auto" },
              }}
            >
              {!isLogin ? (
                <>
                  <ButtonLink
                    onClick={() => navigate("/register")}
                    btnText="Register"
                  />
                  <ButtonLink
                    onClick={() => navigate("/login")}
                    btnText="Login"
                  />
                </>
              ) : (
                <ButtonLink btnText="Visit Work" onClick={()=>navigate("/visitWork")}/>

              )}
            </Box>

            {/* LOGOUT & INSTALL BUTTONS */}
            <Box
              sx={{
                display: "flex",
                gap: 1,
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: { xs: "center", sm: "flex-end" },
                width: { xs: "100%", sm: "auto" },
              }}
            >
              {isLogin && (
                <Button
                  sx={{
                    color: "white",
                    bgcolor: "#FF6B6B",
                    padding: "8px 12px",
                    fontSize: "14px",
                    "&:hover": {
                      bgcolor: "#D9363E",
                    },
                  }}
                  onClick={logout}
                >
                  Log out
                </Button>
              )}
              <InstallButton/>
                {/* <Button
        sx={{
          color: "white",
          bgcolor: "#FF6B6B",
          padding: "8px 12px",
          fontSize: "14px",
          "&:hover": {
            bgcolor: "#D9363E",
          },
        }}
      >
        Install App
      </Button> */}
              {/* <Button
                sx={{
                  bgcolor: "#317EFB",
                  color: "#fff",
                  padding: "8px 12px",
                  borderRadius: "5px",
                  fontSize: "14px",
                  width: { xs: "100%", sm: "auto" },
                  maxWidth: "200px",
                  "&:hover": {
                    bgcolor: "#1E5AC8",
                  },
                }}
              >
                Install App
              </Button> */}
              
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Box>
        <Outlet />
      </Box>
    </>
  );
};

export default LayoutComponent;
