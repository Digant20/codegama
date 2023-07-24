import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './style.css';
import { Icon, Popover } from '@mui/material';
import { MORE_CONSTANTS } from './More';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { USER_OPTIONS_CONSTANTS } from './UserOptions';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';

import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';




const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));



const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));



const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const NavBarPanel = () => {


  //for More popover
  const cartProducts = useSelector((state) => state.cart);

    const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);



  //for user popover

    const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handlePopoverOpenUser = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handlePopoverCloseUser = () => {
    setAnchorElUser(null);
  };

  const openUser = Boolean(anchorElUser);


  const totalQuantity = Array.isArray(cartProducts)
  ? cartProducts.reduce((total, product) => total + product.quantity, 0)
  : 0;

  
  return (
    <div>
        <Navbar  fixed="top" className="navbar navcustom" expand="lg">
          <Container fluid className="navcustom">

                <Navbar.Brand href="/" className='brand-name'>Codekart</Navbar.Brand>
             
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                  />
            </Search>

                <Navbar.Toggle />

              <Navbar.Collapse className='justify-content-end'>
              <Nav>

              <Popover 

                      id="mouse-over-popover-user"

                      sx={{
                        pointerEvents: 'none',
                        margin: '10px'
                      }}

                      open={openUser}

                      anchorEl={anchorElUser}

                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'center',
                        }}
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'center',
                        }}

                        onClose={handlePopoverCloseUser}
                        disableRestoreFocus
                      >
                        {USER_OPTIONS_CONSTANTS.map((res, ind)=>{
                          return(
                            <div style={{margin: "15px 10px 15px 10px"}}>
                              {res.icon} <label>{res.option}</label>
                              {
                                ind === USER_OPTIONS_CONSTANTS.length - 1 ? null : <hr style={{marginTop: "10px", width: "100%"}}/>
                              }
                              
                          </div>)
                        })}
                      </Popover>


                      <Nav.Link className='nav-links' to="" as={Link} 
                      onMouseEnter={handlePopoverOpenUser}
                      onMouseLeave={handlePopoverCloseUser}
                    >Digant {openUser ? <KeyboardArrowUpIcon className='arrow-icons' /> : <ExpandMoreIcon className='arrow-icons' />}</Nav.Link>


                    <Nav.Link to="#" as={Link} className='nav-links'>Become a Seller</Nav.Link>               

                    <Popover 

                      id="mouse-over-popover"

                      sx={{
                        pointerEvents: 'none',
                        margin: '10px'
                      }}

                      open={open}

                      anchorEl={anchorEl}

                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'center',
                        }}
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'center',
                        }}

                        onClose={handlePopoverClose}
                        disableRestoreFocus
                      >
                        {MORE_CONSTANTS.map((res, ind)=>{
                          return(
                            <div style={{margin: "15px 10px 15px 10px"}}>
                              {res.icon} <label>{res.option}</label>
                              {
                                ind === MORE_CONSTANTS.length - 1 ? null : <hr style={{marginTop: "10px", width: "100%"}}/>
                              }
                              
                          </div>)
                        })}
                      </Popover>
                      
                    <Nav.Link className='nav-links' to="" as={Link} 
                      onMouseEnter={handlePopoverOpen}
                      onMouseLeave={handlePopoverClose}
                    >More {open ? <KeyboardArrowUpIcon className='arrow-icons' /> : <ExpandMoreIcon className='arrow-icons' />}</Nav.Link>

                    <Nav.Link className='nav-links' to="/cart" as={Link}>
                        <Badge 
                          anchorOrigin={{
                                  vertical: 'top',
                                  horizontal: 'right',
                                }}
                          badgeContent={totalQuantity}
                          showZero 
                          color='secondary'
                          >
                            <ShoppingCartIcon />
                        </Badge>
                          Cart
                      </Nav.Link>
                </Nav>
                  
              </Navbar.Collapse>
          </Container>
       </Navbar>
    </div>
  )
}

export default NavBarPanel