// Cart.js

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { remove, incrementQuantity, decrementQuantity } from '../store/cartSlice';
import './style.css';

const Cart = () => {
  const dispatch = useDispatch();
  const productCart = useSelector((state) => state.cart);

  const removeFromCart = (productId) => {
    dispatch(remove(productId));
  };

  const incrementProduct = (productId) => {
    dispatch(incrementQuantity(productId));
  };

  const decrementProduct = (productId) => {
    dispatch(decrementQuantity(productId));
  };

  const totalPrice = productCart.reduce((total, cartItem) => total + cartItem.product.price * cartItem.quantity, 0);


  const theCartItems = productCart.map((cartItem) => {
    const product = cartItem.product;
    const quantity = cartItem.quantity;

    return (
      <div key={product.id} className="col-sm-3 parent-div">
        <Card className="h-100">
          <div className="text-center">
            <Card.Img
              variant="top"
              src={product.image}
              style={{ width: '100px', height: '130px', marginTop: '20px' }}
            />
          </div>
          <Card.Body>
            <Card.Title>{product.title}</Card.Title>
            <Card.Text>&#8377;{product.price}</Card.Text>
          </Card.Body>

          <Card.Footer style={{ backgroundColor: 'white' }}>
            <div style={{ display: 'flex', gap: '5px', justifyContent: 'center', alignItems: 'center', marginBottom: '10px' }}>
              <Button variant="secondary" onClick={() => decrementProduct(product.id)}>
                -
              </Button>
              <span className="quantity-label">{quantity}</span>
              <Button variant="secondary" onClick={() => incrementProduct(product.id)}>
                +
              </Button>
            </div>
            <Button variant="danger" onClick={() => removeFromCart(product.id)}>
              remove item
            </Button>
          </Card.Footer>
        </Card>
      </div>
    );
  });

  return <div className="row">{theCartItems}
  <hr style={{margin:"20px"}}/>
  
  <div style={{textAlign:'center', margin: "10px"}}>
    Total: {totalPrice}
  </div></div>;
};

export default Cart;
