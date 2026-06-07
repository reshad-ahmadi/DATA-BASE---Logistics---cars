import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Layout from './Components/Layouts/Layout'
import Dashboard from './Pages/Dashboard'
import AddContainer from './Pages/AddContainer'
import Containers from './Pages/Containers'
import ContainerDetail from './Pages/ContainerDetail'
import Customers from './Pages/Customers'
import Expenses from './Pages/Expenses'
import Reports from './Pages/Reports'
import Exchanges from './Pages/Exchanges'
import Borders from './Pages/Borders'
import Transfers from './Pages/Transfers'
import Specs from './Pages/Specs'
import Logistics from './Pages/Logistics'
import Costs from './Pages/Costs'
import Trucks from './Pages/Trucks'
import Login from './Pages/Login'
import Signup from './Pages/Signup'

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/containers" element={<Containers />} />
          <Route path="/containers/new" element={<AddContainer />} />
          <Route path="/containers/:id" element={<ContainerDetail />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/exchanges" element={<Exchanges />} />
          <Route path="/borders" element={<Borders />} />
          <Route path="/transfers" element={<Transfers />} />
          <Route path="/specs" element={<Specs />} />
          <Route path="/logistics" element={<Logistics />} />
          <Route path="/costs" element={<Costs />} />
          <Route path="/trucks" element={<Trucks />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
