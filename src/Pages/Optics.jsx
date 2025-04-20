import { useEffect, useState, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { getProducts } from "../services/product";
import "../CSS/Product.css";

export default function Optics() {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (user) getProducts("optics").then(setData).catch(console.error);
  }, [user]);

  if (!user) return <Navigate to="/login" replace />;
  if (data === null) return <p>Loading…</p>;
  if (!data.length) return <p>No optics available.</p>;

  return (
    <div className="product-main-container">
      <div className="top-o">
        <p>OPTICS</p>
        <div></div>
        <div></div>
      </div>
      <div className="product-container">
        {data.map((p) => (
          <Link
            to={`/optics/${p.product_slug}`}
            key={p._id}
            className="product-info"
          >
            <img
              className="product-img"
              src={`https://server-side-640x.onrender.com/${p.product_image}`.replace(
                /\\/g,
                "/"
              )}
            />
            <h2>{p.product_name}</h2>
            <p className="product-des">{p.product_description}</p>
            <span className="product-price">${p.product_price}</span>
            <div className="product-gender">
              Gender: {p.product_genderOptions}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
