import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import "./index.css"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Success from "./pages/Success.jsx"
import AppContextProvider from "./context/AppContext.jsx"
import PrivateRoute from "./routes/PrivateRoute.jsx"
import Dashboard from "./pages/Dashboard.tsx"
import { CycleProvider } from "./context/CycleContext.jsx"
import { Toaster } from "@/components/ui/toaster.tsx"
import { TaskProvider } from "./context/TaskContext.jsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/success",
    element: <Success />,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <TaskProvider>
          <CycleProvider>
            <Dashboard />
          </CycleProvider>
        </TaskProvider>
      </PrivateRoute>
    ),
  },
])
//----------------------------------------------
const script = document.createElement('script')
script.src = "https://webanly-dashboard.vercel.app/script.js"
script.setAttribute('data-domain-name', 'funworkcycle-dashboard.render.com738')
script.setAttribute('data-api-key', '3a342f65-a05c-450e-95ca-ddb3bc5c3897')
script.async = true
document.head.appendChild(script)
// ----------------------------------------------
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppContextProvider>
      <RouterProvider router={router} />
      <Toaster position='bottom-center' />
    </AppContextProvider>
  </React.StrictMode>
)
