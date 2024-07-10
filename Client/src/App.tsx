import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import { MainPage, ErrorPage } from './pages'
import HighOrderComponent from "./components/hoc"

const availableRoutes = [
  {
    path: '/',
    component: MainPage,
  },
]

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <HighOrderComponent>
          <Routes>
            {availableRoutes.map(({ path, component: Component }) =>

              <Route key={path} path={path} element={<Component />} />
            )}
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </HighOrderComponent>
      </div>
    </BrowserRouter>
  );

}

export default App
