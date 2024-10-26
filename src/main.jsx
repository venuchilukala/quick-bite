import { RouterProvider } from "react-router-dom";
import router from "./router/Router.jsx";
import { createRoot } from "react-dom/client";
import "./index.css";
import AuthProvider from "./contexts/AuthProvider.jsx";

//tanstack query
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </AuthProvider>
);
