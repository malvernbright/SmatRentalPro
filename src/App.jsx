import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createContext, useState } from "react"
import { AppRouter } from "./pages/components/AppRouter";

export const AppContext = createContext();

const queryClient = new QueryClient();


function App() {
const [isAuthorized, setIsAuthorized]=useState(null)
  return (
    <>
    <AppContext.Provider value={{isAuthorized, setIsAuthorized}}>
      <QueryClientProvider client={queryClient}>
        <AppRouter/>
      </QueryClientProvider>
    </AppContext.Provider>
    </>
  )
}

export default App
