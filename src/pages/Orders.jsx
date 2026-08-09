import { useEffect, useState } from "react";
import axios from "axios";

function Orders() {
  const [orders, setOrders] = useState([]);

  const API_URL = "https://nexastore-backend-rzao.vercel.app";

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${API_URL}/api/orders/user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Orders Response:", res.data);

      setOrders(res.data.orders || []);
    } catch (error) {
      console.log(error);
      setOrders([]);
    }
  };

  const getStatusClass = (status) => {
    const value = status?.toLowerCase();

    if (value === "delivered") {
      return "status-delivered";
    }

    if (value === "cancelled" || value === "canceled") {
      return "status-cancelled";
    }

    if (value === "shipped") {
      return "status-shipped";
    }

    return "status-pending";
  };

  return (
    <div className="orders-page">

      {/* Page Header */}

      <div className="orders-header">

        <div>
          <span className="orders-tag">
            NEXASTORE
          </span>

          <h1>My Orders</h1>

          <p>
            Track and manage your recent purchases
          </p>
        </div>

        <div className="orders-count">
          <strong>{orders.length}</strong>
          <span>
            {orders.length === 1 ? "Order" : "Orders"}
          </span>
        </div>

      </div>


      {/* Orders */}

      {orders.length === 0 ? (

        <div className="no-orders">

          <div className="no-orders-icon">
            🛍️
          </div>

          <h2>No Orders Found</h2>

          <p>
            You haven't placed any orders yet.
          </p>

        </div>

      ) : (

        <div className="orders-list">

          {orders.map((order) => (

            <div
              key={order._id}
              className="order-card"
            >

              {/* Order Top */}

              <div className="order-top">

                <div className="order-number">

                  <span>
                    ORDER ID
                  </span>

                  <strong>
                    #{order._id}
                  </strong>

                </div>

                <div
                  className={`order-status ${getStatusClass(
                    order.orderStatus
                  )}`}
                >
                  <span className="status-dot"></span>

                  {order.orderStatus || "Pending"}
                </div>

              </div>


              {/* Order Details */}

              <div className="order-details">

                <div className="order-detail-item">

                  <span className="detail-label">
                    Total Amount
                  </span>

                  <strong className="order-price">
                    ₹{Number(order.totalAmount || 0).toLocaleString("en-IN")}
                  </strong>

                </div>


                <div className="order-detail-item">

                  <span className="detail-label">
                    Payment Method
                  </span>

                  <strong>
                    {order.paymentMethod || "N/A"}
                  </strong>

                </div>


                <div className="order-detail-item">

                  <span className="detail-label">
                    Products
                  </span>

                  <strong>
                    {order.products?.length || 0}
                  </strong>

                </div>

              </div>


              {/* Products */}

              <div className="order-products">

                <div className="products-heading">

                  <span>
                    📦
                  </span>

                  <h3>
                    Ordered Products
                  </h3>

                </div>


                {order.products?.map((item, index) => (

                  <div
                    key={item._id || index}
                    className="ordered-product"
                  >

                    <div className="product-placeholder">
                      🛍️
                    </div>


                    <div className="ordered-product-info">

                      <h4>
                        {item.productId?.name || "Product"}
                      </h4>

                      <p>
                        Quantity:{" "}
                        <strong>
                          {item.quantity}
                        </strong>
                      </p>

                    </div>

                  </div>

                ))}

              </div>


              {/* Bottom */}

              <div className="order-bottom">

                <span>
                  Thank you for shopping with NexaStore
                </span>

                <span className="secure-order">
                  🔒 Secure Order
                </span>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default Orders;