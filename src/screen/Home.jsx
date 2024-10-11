import { Box, Button, Grid, Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import CartComp from "../components/CartComp";

const Home = ({selectedCategory, setSelectedCategory,products, setProducts, selectedSort, setSelectedSort}) => {
  const [totalCount, setTotalCount] = useState(0);
  const [pageNo, setPageNo]= useState(0)
  const [localStorageProducts, setLocalStorageProducts] = useState(localStorage?.getItem("MYNTRA")? JSON.parse(localStorage.getItem("MYNTRA")) :[]);


  const handleAddLocalStorage = (product)=>{
    console.log(product);
    
   localStorage.setItem('MYNTRA',JSON.stringify(product) )
  }

  const handleAddtoCart =(itme)=>{
      setLocalStorageProducts(localStorage?.getItem("MYNTRA")? JSON.parse(localStorage.getItem("MYNTRA")) :[])

    let product = localStorage?.getItem("MYNTRA")? JSON.parse(localStorage.getItem("MYNTRA")) :[]
    console.log(product);
    let exit = product?.filter((e)=>e?.id === itme?.id)
    if(exit?.length>=1){
        window.alert("Product exits")
    }
    else{
        product?.push(itme)
        handleAddLocalStorage(product);

    }
  }
  


  useEffect(() => {
    getProducts();
  }, [selectedCategory]);

  const getProducts = async () => {
    if(selectedCategory){
        try {
            let res = await fetch(`https://fakestoreapi.com/products/category/${selectedCategory}`);
      
            if (res) {
              res = await res.json();
              console.log("products", res);
              setProducts(res);
            }
          } catch (error) {
            console.log(error.message);
          }
        
    }
    else{

        try {
          let res = await fetch("https://fakestoreapi.com/products");
    
          if (res) {
            res = await res.json();
            console.log("products", res);
            setProducts(res);
          }
        } catch (error) {
          console.log(error.message);
        }

    }
  };


  return (
    <div className="flex flex-col gap-3 pt-20" >

      <div className="flex w-full justify-end">
        <Box>
        <Button onClick={()=>setPageNo((e)=>e+1)} >Next Page</Button>
        </Box>
      </div>
    <div className="grid grid-cols-2  gap-4 md:grid-cols-3 lg:grid-cols-5">
      {products?.map((item, index) => (
        <CartComp key={index} item={item} handleAddtoCart={(e)=>handleAddtoCart(e)} />
      ))}
    </div>
      <div className="flex w-full justify-end">
        <Box>

        {/* <Button onClick={()=>setPageNo((e)=>e+1)}>Previous page</Button> */}

        <Pagination onChange={(e)=> console.log( e)
        } count={10} size="large" />
        </Box>
      </div>
    </div>
  );
};

export default Home;
