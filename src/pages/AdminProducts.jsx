import { useEffect, useState } from "react";
import axios from "axios";

function AdminProducts() {
  const [products, setProducts] = useState([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [stock, setStock] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/products"
      );

      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddProduct = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/products",
        {
          name,
          description,
          price,
          category,
          image,
          stock,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Product Added Successfully");

      setName("");
      setDescription("");
      setPrice("");
      setCategory("");
      setImage("");
      setStock("");

      fetchProducts();
    } catch (error) {
      console.log(error);
      alert("Failed To Add Product");
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:5000/api/products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Product Deleted");

      fetchProducts();
    } catch (error) {
      console.log(error);
      alert("Delete Failed");
    }
  };

    return (
  <div className="admin-main">

    <h1>Manage Products</h1>

<div className="product-form">

  <input
    type="text"
    placeholder="Product Name"
    value={name}
    onChange={(e) =>
      setName(e.target.value)
    }
  />

  <input
    type="text"
    placeholder="Description"
    value={description}
    onChange={(e) =>
      setDescription(
        e.target.value
      )
    }
  />

  <input
    type="number"
    placeholder="Price"
    value={price}
    onChange={(e) =>
      setPrice(e.target.value)
    }
  />

 <select
  value={category}
  onChange={(e) =>
    setCategory(e.target.value)
  }
>
  <option value="">
    Select Category
  </option>

  <option value="Mobiles">
    Mobiles
  </option>

  <option value="Electronics">
    Electronics
  </option>

  <option value="Fashion">
    Fashion
  </option>

  <option value="Gaming">
    Gaming
  </option>
</select>

  <input
    type="text"
    placeholder="Image URL"
    value={image}
    onChange={(e) =>
      setImage(e.target.value)
    }
  />

  <input
    type="number"
    placeholder="Stock"
    value={stock}
    onChange={(e) =>
      setStock(e.target.value)
    }
  />

  <button
    onClick={handleAddProduct}
  >
    Add Product
  </button>

</div>

    <div className="admin-products-grid">

      {products.map((product) => (

        <div
          key={product._id}
          className="admin-product-card"
        >

          <img
            src={product.image}
            alt={product.name}
          />

          <h3>{product.name}</h3>

          <p>
            ₹{product.price}
          </p>

          <span>
            {product.category}
          </span>

          <button
  className="delete-btn"
  onClick={() =>
    handleDelete(product._id)
  }
>
  Delete
</button>

        </div>

      ))}

    </div>

  </div>
);
}

export default AdminProducts;