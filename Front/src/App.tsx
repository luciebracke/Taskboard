import React from "react";
import logo from "./logo.svg";
import "./App.css";
import styled from "styled-components";
import { Route, Routes } from "react-router-dom";
import { Login } from "./components/login/login";
import { Home } from "./components/home";
import { RequireAuth } from "react-auth-kit";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
//import { ReactQueryDevtools } from "react-query/devtools";
const AppContainer = styled.div`
  width: 100%;
  height: 100%;
`;
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <AppContainer>
      <Routes>
        <Route
          path="/"
          element={
            //<RequireAuth loginPath="/login">
              <Home />
           // </RequireAuth>
          }
        ></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </AppContainer>
    {/* <ReactQueryDevtools initialIsOpen={false} position='bottom-right' /> */}
    </QueryClientProvider>
  );
}

export default App;
