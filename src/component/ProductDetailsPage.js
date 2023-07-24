// ProductDetailsPage.jsx
import React, { useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import { Card } from 'react-bootstrap';
import StarRateIcon from '@mui/icons-material/StarRate';
import { Button } from '@mui/material';
import {add} from "../store/cartSlice";

import { useNavigate } from 'react-router-dom';



const ProductDetailsPage = () => {

  const navigate = useNavigate();

  const { id } = useParams();

  const dispatch = useDispatch();

  const {data} = useSelector(state=> state.products);
  
  const theProduct = data.filter((res)=>{
    return res.id === parseInt(id);
  });

  console.log("theProductttt: ", theProduct)

  const[toggleGotoCart, setToggleGotoCart] = useState(false);

  const addToCart = (produuct)=>{
    //dispatch an action: add
    dispatch(add(produuct));
    setToggleGotoCart(true);
}


  return (
    <div style={{display: "flex", gap: "150px",height: "64vh",marginLeft:"20px", marginTop:"80px"}}>
      

            <div>
              <img src={theProduct[0]?.image} alt={theProduct[0]?.image} style={{width:'300px', height: "300px"}}/>
            </div>

            <div style={{textAlign: "left", marginTop: "10px"}}>
              
              <Card.Text>
                {theProduct[0]?.title}
              </Card.Text>

              <Card.Title>{theProduct[0]?.description}</Card.Title>

              <Card.Title style={{fontSize: "35px"}}>
                &#8377;{theProduct[0]?.price}
              </Card.Title>

              <div style={{ 
                              display:"flex", 
                              gap: "20px",
                            
                              alignItems: "center",
                              textAlign:"center"
                              }}
                >

                  <div style={{backgroundColor: "green",
                              color:"white", 
                              display:"flex", 
                              justifyContent:"center", 
                              alignItems: "center",
                              width:"43px", height:"20px", 
                              border:"1px solid green", 
                              borderRadius: "2px",
                              marginTop:"10px"
                              }}
                  >
                        <label>{theProduct[0]?.rating?.rate}</label>
                        <StarRateIcon style={{fontSize: 16}}/>
                  </div>

                    <div>
                      <label color="grey">{theProduct[0]?.rating?.count} ratings</label>
                    </div>


                   


              </div>

              <div style={{display:"flex", gap: "20px", marginTop:"10px", textAlign:"center"}}>
                <Button style={{color:"white", backgroundColor: "#FF9F00", borderRadius: "2px", width:"200px", height:"50px"}} 
                        onClick={()=>{ toggleGotoCart ? navigate("/cart") : addToCart(theProduct[0])} }>{toggleGotoCart ? "Go To Cart" : "Add To Cart"}</Button>
                <Link to="/cart"  style={{color:"white", backgroundColor: "#FB641B",borderRadius: "2px", width:"200px", height:"50px", textAlign:"center"}}>Buy Now</Link>
                </div> 
            </div>

       
        
    </div>
  );
};

export default ProductDetailsPage;
