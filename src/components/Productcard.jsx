function ProductCard({ product, cart, setCart }) {

  const addToCart = () => {

    const existing = cart.find(
      (item) => item._id === product._id
    );

    if (existing) {

      setCart(
        cart.map((item) =>
          item._id === product._id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        )
      );

    } else {

      setCart([
        ...cart,
        {
          ...product,
          quantity: 1,
        },
      ]);

    }

    alert("Product Added To Cart");
  };

  return (
    <div>
      <h3>{product.name}</h3>

      <p>₹{product.price}</p>

      <button onClick={addToCart}>
        Add To Cart
      </button>
    </div>
  );
}

export default ProductCard;