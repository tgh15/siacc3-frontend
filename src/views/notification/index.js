import { Fragment, useState, useEffect } from 'react'
import Tabs from './Sidebar'
import axios from 'axios'
import { Row, Col, TabContent, TabPane, Card, CardBody } from 'reactstrap'

import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/react/pages/page-account-settings.scss'

import NotificationApi from '../../services/pages/notification/index'
import List from './list'
import Sidebar from './Sidebar'
import InfiniteScroll from 'react-infinite-scroll-component'
import Spinner from 'reactstrap/lib/Spinner'

const AccountSettings = () => {
  const [activeTab, setActiveTab] = useState('1');
  const [datas, setDatas] = useState([])
  const [pageCurrent, setPageCurrent] = useState(1)
  const [next, setNext] = useState(0)

  const toggleTab = tab => {
    setActiveTab(tab)
  }

  const getNotification = (page) => {
    NotificationApi.getNotification(page).then(res => {
      if (datas.length > 0) {
        let datas_ = datas == null ? [] : [...datas];
        res.data.map((data) => (
          datas_.push(data)
        ))
        
        setDatas([...datas_])
        setNext(res.data.is_next)
      } else {
        setDatas(res.data)
      }

    }, err => {
      console.log(err)
    })
  }


  useEffect(() => {
    getNotification(pageCurrent)
  }, [])

  return (
    <Fragment>
      <Row>
        <Col className='mb-2 mb-md-0' md='3'>
          <Sidebar activeTab={activeTab} toggleTab={toggleTab} />
        </Col>
        <Col md='9'>
        <InfiniteScroll
                dataLength={datas.length}
                hasMore={next}
                next={() => { getNotification(pageCurrent + 1); setPageCurrent(pageCurrent + 1) }}
                style={{ overflowX: 'hidden' }}
                hasMore={true}
                loader={next ? <p style={{ textAlign: "center" }}> <Spinner /> </p> : null}
              >
          <TabContent activeTab={activeTab}>
            <TabPane tabId='1'>
              
                <List datas={datas} />
              
            </TabPane>
          </TabContent>
          </InfiniteScroll>
        </Col>
      </Row>
    </Fragment>
  )
}

export default AccountSettings
