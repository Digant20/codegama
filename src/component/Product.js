import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../store/productSlice';
import { Alert } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import StatusCode from '../utils/StatusCode';
import './style.css';
import StarRateIcon from '@mui/icons-material/StarRate';
import { Link } from 'react-router-dom';

const Product = () => {
  const dispatch = useDispatch();
  const { data, status } = useSelector((state) => state.products);
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [categories, setCategoties] = useState([]);

  console.log('data: ', data);

  useEffect(() => {
    dispatch(getProducts());

    fetch('https://fakestoreapi.com/products/categories')
      .then((res) => res.json())
      .then((json) => setCategoties(['ALL', ...json]));
  }, [dispatch]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const filterProductsByCategory = (products, category) => {
    if (category === "ALL") {
      return products;
    }
    return products.filter((product) => product.category === category);
  };

  if (status === StatusCode.LOADING) {
    return (
      <Spinner animation="border" variant="info" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  } else if (status === StatusCode.ERROR) {
    return (
      <Alert key="danger" variant="danger" style={{ textAlign: 'center' }}>
        Something went wrong!!
      </Alert>
    );
  }
  const cards = filterProductsByCategory(data, selectedCategory)?.map((product) => {
    return (
      <div className="col-sm-4 parent-div" key={product.id}>
        <Card className="h-100">
          <div className="text-center">
            <Link to={`/${product.id}`}>
              <Card.Img
                variant="top"
                src={product.image}
                style={{ width: '100px', height: '130px', marginTop: '20px' }}
              />
            </Link>
          </div>
          <Card.Body style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Card.Title>{product.title}</Card.Title>
            <div
              style={{
                backgroundColor: 'green',
                color: 'white',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '43px',
                height: '20px',
                border: '1px solid green',
                borderRadius: '2px',
              }}
            >
              <label>{product?.rating?.rate}</label> <StarRateIcon style={{ fontSize: 16 }} />
            </div>
            <label>{product?.rating?.count}</label>

            <Card.Text>&#8377;{product.price}</Card.Text>
          </Card.Body>
        </Card>
      </div>
    );
  });

  return (
    <>
      <div>Products</div>
      <div>
        {/* Dropdown menu to select category */}
        <select value={selectedCategory} onChange={handleCategoryChange} style={{ marginTop: '50px' }}>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="row">{cards}</div>
    </>
  );
};

export default Product;