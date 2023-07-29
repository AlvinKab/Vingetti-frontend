import { Routes,Route } from 'react-router-dom'
import Layout from './components/Layout'
import Homepage from './components/Homepage'
import MainOutlet from './components/MainOutlet'
import AddCustomerSection from './features/customers/addCustomerSection'
import AllCustomers from './features/customers/allCustomers'
import NewCustomerTicket from './features/customers/newCustomer'
import AllSections from './features/sections/allSections'
import SectionChoices from './features/sections/chooseSection'

function App() {
  return (
    <Routes>
      <Route path='/' element={<MainOutlet />}>
        <Route index element={<Homepage />} />
        <Route path="" element={<Layout />}>
          <Route path="customers">
            <Route path='' element={<AllCustomers />} />
            <Route path='new' element={<NewCustomerTicket />} />
            <Route path='update' element={<AddCustomerSection />} />
          </Route>
          <Route path="notes">
            <Route path='' element={<AllSections />} />
            <Route path='get' element={<SectionChoices />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
