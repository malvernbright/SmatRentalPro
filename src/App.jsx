import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createContext, useState, useEffect } from "react"
import { AppRouter } from "./pages/components/AppRouter";

export const AppContext = createContext();

const queryClient = new QueryClient();


function App() {
  const [isAuthorized, setIsAuthorized] = useState(null);
  const [roles, setRoles] = useState([]);
  return (
    <>
      <AppContext.Provider value={{ isAuthorized, setIsAuthorized, roles, setRoles, useEffect }}>
        <QueryClientProvider client={queryClient}>
          <AppRouter />
        </QueryClientProvider>
      </AppContext.Provider>
    </>
  )
}

export default App
