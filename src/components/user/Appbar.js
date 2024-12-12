import React from 'react';
import { styled } from '@mui/material/styles';
import { Button, Badge, Popover } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import { useCartState } from '../../store/cart-context';

const AppbarContainer = styled('div')({
  position: 'fixed',
  top: 10,
  right: 10,
  zIndex: 1000,
});

const AppbarButton = styled(Button)({
  backgroundColor: 'black',
  color: 'white',
  borderRadius: '20px',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
  padding: '8px 16px',
  minWidth: '120px',
});

const Appbar = ({ onShowCart }) => {
  const cartState = useCartState();
  const cartItemCount = cartState.items.reduce((current, item) => {
    return current + item.amount;
  }, 0);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    onShowCart(); 
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <AppbarContainer>
      <AppbarButton
        aria-describedby={id}
        startIcon={
          <Badge badgeContent={cartItemCount} color="error">
            <ShoppingCart style={{ color: 'white' }} />
          </Badge>
        }
        onClick={handleClick}
      >
        Your Cart
      </AppbarButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
      </Popover>
    </AppbarContainer>
  );
};

export default Appbar;
