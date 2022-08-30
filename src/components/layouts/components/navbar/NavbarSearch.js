// ** React Imports
import { useEffect, useState } from 'react'

// ** Third Party Components
import classnames from 'classnames'
import * as Icon from 'react-feather'
import { NavItem, NavLink, Input } from 'reactstrap'
import { useHistory } from 'react-router-dom'


// ** Store & Actions
import { useDispatch } from 'react-redux'
// import { handleSearchQuery } from '@store/actions/navbar'

// ** Custom Components
import Autocomplete from '@components/autocomplete'

const NavbarSearch = () => {
  // ** Store Vars
  // const dispatch = useDispatch()

  const history = useHistory();

  // ** States
  const [suggestions, setSuggestions] = useState([])
  const [navbarSearch, setNavbarSearch] = useState(false)

  // ** ComponentDidMount
  useEffect(() => {
    // axios.get('/api/main-search/data').then(({ data }) => {
    //   setSuggestions(data.searchArr)
    // })
  }, [])

  // ** Removes query in store
  // const handleClearQueryInStore = () => dispatch(handleSearchQuery(''))

  // ** Function to handle external Input click
  const handleExternalClick = () => {
    if (navbarSearch === true) {
      setNavbarSearch(false)
      // handleClearQueryInStore()
    }
  }

  // ** Function to clear input value
  const handleClearInput = setUserInput => {
    if (!navbarSearch) {
      setUserInput('')
      // handleClearQueryInStore()
    }
  }

  // ** Function to close search on ESC & ENTER Click
  const onKeyDown = e => {
    if (e.keyCode === 13) {
      window.location.href = `/advanced-search?keyword=${e.target.value}`
    }
  }

  // ** Function to handle search suggestion Click
  const handleSuggestionItemClick = () => {
    setNavbarSearch(false)
    // handleClearQueryInStore()
  }

  // ** Function to handle search list Click
  const handleListItemClick = (func, link, e) => {
    func(link, e)
    setTimeout(() => {
      setNavbarSearch(false)
    }, 1)
    // handleClearQueryInStore()
  }

  return (
    <NavItem className='nav-search' onClick={() => setNavbarSearch(true)}>
      <NavLink className='nav-link-search'>
        <Icon.Search className='ficon' />
      </NavLink>
      <div
        className={classnames('search-input', {
          open: navbarSearch === true
        })}
      >
        <div className='search-input-icon'>
          <Icon.Search />
        </div>
        {navbarSearch ? (
          <Input
            className='form-control'
            filterKey='title'
            filterHeaderKey='groupTitle'
            placeholder='Cari Sesuatu...'
            autoFocus={true}
            clearInput={(userInput, setUserInput) => handleClearInput(setUserInput)}
            onKeyDown={onKeyDown}
          />
        ) : null}
        <div className='search-input-close'>
          <Icon.X
            className='ficon'
            onClick={e => {
              e.stopPropagation()
              setNavbarSearch(false)
              // handleClearQueryInStore()
            }}
          />
        </div>
      </div>
    </NavItem>
  )
}

export default NavbarSearch
