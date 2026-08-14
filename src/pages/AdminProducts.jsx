import { useEffect, useState } from "react";
import axios from "axios";

function AdminProducts() {
  const [products, setProducts] = useState([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [image, setImage] = useState("");
  const [stock, setStock] = useState("");

  const API_URL =
    "https://nexastore-backend-rzao.vercel.app";

  useEffect(() => {
    fetchProducts();
  }, []);

  // ==============================
  // FETCH PRODUCTS
  // ==============================

  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/api/products`
      );

      setProducts(
        Array.isArray(res.data)
          ? res.data
          : []
      );

    } catch (error) {
      console.log("Fetch Products Error:", error);
      alert("Failed to fetch products");
    }
  };


  // ==============================
  // ADD PRODUCT
  // ==============================

  const handleAddProduct = async () => {
    if (
      !name.trim() ||
      !description.trim() ||
      !price ||
      !category ||
      !brand ||
      !image.trim() ||
      !stock
    ) {
      alert("Please fill all product details");
      return;
    }

    try {
      const token =
        localStorage.getItem("token");

      await axios.post(
        `${API_URL}/api/products`,
        {
          name: name.trim(),
          description: description.trim(),
          price: Number(price),
          category,
          brand,
          image: image.trim(),
          stock: Number(stock),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(
        "Product Added Successfully"
      );

      // Clear form
      setName("");
      setDescription("");
      setPrice("");
      setCategory("");
      setBrand("");
      setImage("");
      setStock("");

      // Refresh products
      fetchProducts();

    } catch (error) {
      console.log(
        "Add Product Error:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed To Add Product"
      );
    }
  };


  // ==============================
  // DELETE PRODUCT
  // ==============================

  const handleDelete = async (id) => {
    try {
      const token =
        localStorage.getItem("token");

      await axios.delete(
        `${API_URL}/api/products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(
        "Product Deleted Successfully"
      );

      fetchProducts();

    } catch (error) {
      console.log(
        "Delete Product Error:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Delete Failed"
      );
    }
  };


  // ==============================
  // RETURN
  // ==============================

  return (
    <main>

      {/* PAGE TITLE */}

      <h1>
        Manage Products
      </h1>


      {/* ==========================
          ADD PRODUCT FORM
      =========================== */}

      <div className="product-form">

        {/* Product Name */}

        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />


        {/* Description */}

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


        {/* Price */}

        <input
          type="number"
          placeholder="Price"
          min="0"
          value={price}
          onChange={(e) =>
            setPrice(e.target.value)
          }
        />


        {/* ==========================
            CATEGORY
        =========================== */}

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

          <option value="Laptops">
            Laptops
          </option>

          <option value="Gaming">
            Gaming
          </option>

          <option value="Fashion">
            Fashion
          </option>

          <option value="Electronics">
            Electronics
          </option>

          <option value="Accessories">
            Accessories
          </option>

          {/* HOME & LIVING */}

          <option value="Home & Living">
            Home & Living
          </option>

        </select>


        {/* ==========================
            BRAND
        =========================== */}

        <select
          value={brand}
          onChange={(e) =>
            setBrand(e.target.value)
          }
        >

          <option value="">
            Select Brand
          </option>

          <option value="Apple">
            Apple
          </option>

          <option value="Samsung">
            Samsung
          </option>

          <option value="HP">
            HP
          </option>

          <option value="Dell">
            Dell
          </option>

          <option value="Sony">
            Sony
          </option>

          <option value="Nike">
            Nike
          </option>

          <option value="IKEA">
            IKEA
          </option>

          <option value="Home Centre">
            Home Centre
          </option>

        </select>


        {/* Image URL */}

        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) =>
            setImage(e.target.value)
          }
        />


        {/* Stock */}

        <input
          type="number"
          placeholder="Stock"
          min="0"
          value={stock}
          onChange={(e) =>
            setStock(e.target.value)
          }
        />


        {/* Add Product */}

        <button
          onClick={handleAddProduct}
        >
          Add Product
        </button>

      </div>


      {/* ==========================
          PRODUCTS LIST
      =========================== */}

      <div className="admin-products-grid">

        {products.length > 0 ? (

          products.map((product) => (

            <div
              key={product._id}
              className="admin-product-card"
            >

              {/* Image */}

              <img
                src={product.image}
                alt={product.name}
              />


              {/* Name */}

              <h3>
                {product.name}
              </h3>


              {/* Price */}

              <p>
                ₹
                {Number(
                  product.price || 0
                ).toLocaleString("en-IN")}
              </p>


              {/* Category */}

              <span>
                {product.category}
              </span>


              {/* Brand */}

              <small>
                {product.brand}
              </small>


              {/* Stock */}

              <small>
                Stock: {product.stock}
              </small>


              {/* Delete */}

              <button
                className="delete-btn"
                onClick={() =>
                  handleDelete(
                    product._id
                  )
                }
              >
                Delete
              </button>

            </div>

          ))

        ) : (

          <h3>
            No Products Found
          </h3>

        )}

      </div>

    </main>
  );
}

export default AdminProducts;