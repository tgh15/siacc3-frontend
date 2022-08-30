import React, { Fragment, useEffect, useState } from 'react'
import { TabContent, TabPane, Nav, NavItem, NavLink, Row } from 'reactstrap'

export const PersetujuanTop = (props)=>{
  const [active, setActive] = useState('1')

  
  const toggle = tab => {
    if (active !== tab) {
      setActive(tab)
    }
  }
  
  useEffect(()=>{
    
  },[props])

    return(
      <Fragment>

        <Nav tabs justified>
          <NavItem>
            <NavLink
              active={active === '1'}
              onClick={() => {
                toggle('1')
                props.onChangeNav(true)
              }}
            >
              Semua Persetujuan Berita
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              active={active === '2'}
              onClick={() => {
                toggle('2')
                props.onChangeNav(false)
              }}
            >
              Dapat Dibaca Semua
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              active={active === '3'}
              onClick={() => {
                toggle('3')
                props.onChangeNav(false)
              }}
            >
              Pembatasan Berita
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              active={active === '4'}
              onClick={() => {
                toggle('4')
                props.onChangeNav(false)
              }}
            >
              Dikirim ke Pimpinan
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              active={active === '5'}
              onClick={() => {
                toggle('5')
                props.onChangeNav(false)
              }}
            >
              Hanya Dilihat Pengirim
            </NavLink>
          </NavItem>
        </Nav>
            
        

      </Fragment>
    )
}