import { useEffect, useState } from "react";
import Filter from "../../components/filter";
import Layout from "../../components/layout";
import Navbar from "../../components/navbar";
import { ProductCard } from "../../components/product/card";
import { getProducts } from "../../data/products";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState("Loading products...");
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    getProducts()
      .then((data) => {
        // The API fetch encountered no errors. Data was received from the API 
        if (data) {
          
          setProducts(data);
          setIsLoading(false);
          // Sets global state variable locations with received products data
          setLocations(data.locations);
          
        }
      })
      .catch((err) => {
        setLoadingMessage(
          `Unable to retrieve products. Status code ${err.message} on response.`
        );
      });
  }, []);

  const searchProducts = (event) => {
    
    getProducts(event).then((productsData) => {
      if (productsData) {
        setProducts(productsData);
      }
    });
  };


  if (isLoading) return <p>{loadingMessage}</p>;

  if (products.no_filter == false) {
    return (
      <>
        <div className="page">
          <Filter
            productCount={products.length}
            onSearch={searchProducts}
            // Passes the locations array as a prop to the Filter function component
            locations={locations}
            
          />

          <div className="columns is-multiline">
            {products.products.map((product) => (
              <ProductCard product={product} key={product.id} cardWidth={"is-one-quarter"} />
            ))}
          </div>
        </div>
      </>
    );
  }

  if (products.no_filter == true) {
    

return (
    <>
      <div className="" style={{marginTop:"100px"}}>
        <Filter
          productCount={products.length}
          onSearch={searchProducts}
          locations={locations}
        />

        <div className="">

          {products.products?.map((category) => {
            return (
              <div key={category.id} className="">
                <div className="">
                  <h1  className="is-flex is-justify-content-center is-size-3 p-3">{category.name}</h1>
                </div>
              <div className="columns "  >
                {category.last_5.map((p) => (
                  <ProductCard product={p} key={p.id} className="" style={{border:"3px solid black"}}/>
                ))}
              </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
  }}

Products.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      {page}
    </Layout>
  );
};
