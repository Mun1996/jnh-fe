import { Outlet } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "@/contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <div className="app-container">
        <main className="app-content">
          <Outlet />
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;
