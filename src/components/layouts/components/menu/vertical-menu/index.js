import { Fragment, useState, useRef } from 'react';
// ** React Imports

// ** Vertical Menu Items Array
import navigation                   from '@src/components/navigation/vertical';
import navigationHelpdesk           from '@src/components/navigation/helpdesk';

// ** Image
import LogoEvent                    from '@src/assets/images/logo/event.svg';

// ** Third Party Components
import classnames from 'classnames';
import PerfectScrollbar from 'react-perfect-scrollbar';

// ** Vertical Menu Components
import VerticalMenuHeader from './VerticalMenuHeader';
import VerticalNavMenuItems from './VerticalNavMenuItems';
import { useLocation } from 'react-router-dom';

import Helper                       from '../../../../../helpers';


const Sidebar = props => {
    // ** Props
    const { menuCollapsed, routerProps, menu, currentActiveItem, skin } = props;
    let location = useLocation();
    // ** States
    const [groupOpen, setGroupOpen] = useState([]);
    const [activeItem, setActiveItem] = useState(null);
    const [groupActive, setGroupActive] = useState([]);

    // ** Menu Hover State
    const [menuHover, setMenuHover] = useState(false);

    // ** Ref
    const shadowRef = useRef(null);

    // ** Function to handle Mouse Enter
    const onMouseEnter = () => {
        if (menuCollapsed) {
            setMenuHover(true);
        }
    };

    // ** Scroll Menu
    const scrollMenu = container => {
        if (shadowRef && container.scrollTop > 0) {
            if (!shadowRef.current.classList.contains('d-block')) {
                shadowRef.current.classList.add('d-block');
            }
        } else {
            if (shadowRef.current.classList.contains('d-block')) {
                shadowRef.current.classList.remove('d-block');
            }
        }
    };

    return (
        <Fragment>
            <div
                style={{ zIndex: "100" }}
                className={classnames('main-menu menu-fixed menu-accordion menu-shadow', {
                    expanded: menuHover || menuCollapsed === false,
                    'menu-light': skin !== 'semi-dark' && skin !== 'dark',
                    'menu-dark': skin === 'semi-dark' || skin === 'dark'
                })}
                onMouseEnter={onMouseEnter}
                onMouseLeave={() => setMenuHover(false)}
            >
                {
                    menu ? (
                        menu(props)
                    ) : (
                        <Fragment>
                            {/* Vertical Menu Header */}
                            <VerticalMenuHeader
                                menuHover={menuHover}
                                setGroupOpen={setGroupOpen}
                                {...props}
                            />

                            {/* Vertical Menu Header Shadow */}
                            <div className='shadow-bottom' ref={shadowRef}></div>

                            {/* Perfect Scrollbar */}
                            <PerfectScrollbar
                                options={{ wheelPropagation: false }}
                                onScroll={container => scrollMenu(container)}
                                className='main-menu-content'
                            >
                                <ul className='navigation navigation-main'>
                                    <VerticalNavMenuItems
                                        items={location.pathname.includes("helpdesk") ? navigationHelpdesk : navigation}
                                        menuHover={menuHover}
                                        groupOpen={groupOpen}
                                        activeItem={activeItem}
                                        groupActive={groupActive}
                                        routerProps={routerProps}
                                        setGroupOpen={setGroupOpen}
                                        setActiveItem={setActiveItem}
                                        menuCollapsed={menuCollapsed}
                                        setGroupActive={setGroupActive}
                                        currentActiveItem={currentActiveItem}
                                    />
                                </ul>

                                {/* Event */}
                                {
                                    localStorage.getItem("role") != null && localStorage.getItem("role").toLowerCase() == 'agen' ?
                                        <div style={{ marginTop: '40px' }}>
                                            <a href="/event">
                                                <img
                                                    src={LogoEvent}
                                                    alt={'Profile Pic'}
                                                    style={{ 'width': '80px', 'height': '80px', 'borderRadius': '50%' }}
                                                />
                                            </a>
                                        </div>
                                        : null
                                }
                            </PerfectScrollbar>
                        </Fragment>
                    )
                }
            </div>
        </Fragment>
    );
};

export default Sidebar;