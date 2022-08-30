import { Card, Nav, NavItem, NavLink } from 'reactstrap'
import { Home, User, Lock, Info, Link, Bell } from 'react-feather'
import { useHistory } from 'react-router-dom';
import './index.scss'
import CardBody from 'reactstrap/lib/CardBody';
const Tabs = ({ activeTab, toggleTab }) => {

  const history = useHistory();

  return (
    <Card className='notification-nav'>
      <CardBody>
        <Nav  pills vertical>
          <NavItem>
            <NavLink onClick={() => history.push('/beranda')}>
              <Home size={18} className='mr-1' />
              <span className='font-weight-bold'>Beranda</span>
            </NavLink>
            <NavLink active={activeTab === '1'} onClick={() => toggleTab('1')}>
              <span className='font-weight-bold'>Semua Notifikasi</span>
            </NavLink>
          </NavItem>
        </Nav>
      </CardBody>
    </Card>
  )
}

export default Tabs
