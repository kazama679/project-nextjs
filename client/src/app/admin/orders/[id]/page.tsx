"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAllOrder, updateOrder } from "../../../../../store/reducers/orderReducer";
import Sidebar from "@/components/Sidebar"; // Giả định Sidebar đã được import

export default function OrderDetails(props: any) {
  const dispatch = useDispatch();
  const router = useRouter();
  const orders = useSelector((state: any) => state.orderReducer.orders);
  const [status, setStatus] = useState<string>("");

  useEffect(() => {
    dispatch(getAllOrder());
  }, [dispatch]);

  // Tìm sản phẩm có id trùng với props.id
  const orderIndex = orders.findIndex((order: any) => order.id === props.params.id);

  useEffect(() => {
    // Chỉ gán trạng thái nếu orderIndex hợp lệ và đơn hàng tồn tại
    if (orderIndex !== -1 && orders[orderIndex]) {
      setStatus(orders[orderIndex].status);
    }
  }, [orders, orderIndex]);

  const backve = () => {
    router.push("/admin/orders");
  }

  const formatVND = (price: number) =>
    price.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

  const calculateTotal = (cart: any[], ship: number) => {
    const totalProducts = cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    return totalProducts + ship;
  };

  const handleUpdate = () => {
    // Cập nhật trạng thái đơn hàng
    const updatedOrder = { ...orders[orderIndex], status: status };
    dispatch(updateOrder(updatedOrder)).then(() => {
      backve()
    });
  };

  // Nếu đơn hàng không tồn tại, hiển thị thông báo
  if (orderIndex === -1 || !orders[orderIndex]) {
    return <div>Đơn hàng không tồn tại hoặc không thể tìm thấy.</div>;
  }

  return (
    <div className="flex min-h-screen">
      <div className="w-1/4 h-screen fixed top-0 left-0">
        <Sidebar />
      </div>

      {/* thông tin đơn hàng */}
      <div className="flex-1 p-10 ml-64">
        <div className="flex justify-center text-center">
          <button 
            onClick={backve}
            className="text-blue-500 mb-5 hover:text-blue-700 transition-colors"
          >
            Back
          </button>
        </div>
        <div className="mb-5">
          <h1 className="text-3xl font-bold">Thông tin đơn hàng</h1>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
          <div className="grid grid-cols-2 gap-4">
            <p>
              <strong>Mã đơn hàng:</strong> {orders[orderIndex].id}
            </p>
            <p>
              <strong>Tổng tiền (cả ship):</strong>{" "}
              {formatVND(
                calculateTotal(orders[orderIndex].cart, orders[orderIndex].ship)
              )}
            </p>
            <p>
              <strong>Tên người nhận:</strong> {orders[orderIndex].name}
            </p>
            <p>
              <strong>Số người nhận:</strong> {orders[orderIndex].phone}
            </p>
            <p>
              <strong>Địa chỉ người nhận:</strong> {orders[orderIndex].address}
            </p>
            <p>
              <strong>Ghi chú:</strong> {orders[orderIndex].note}
            </p>
            <p>
              <strong>Trạng thái:</strong>
              <select
                className="border border-gray-300 ml-2 p-1 rounded"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                disabled={orders[orderIndex].status === "daGui"} // Không cho phép thay đổi nếu đã gửi
              >
                <option value="choDuyet" disabled={orders[orderIndex].status === "daDuyet"}>
                  Chờ duyệt
                </option>
                <option value="daDuyet">Đã duyệt</option>
                <option value="daGui">Đã gửi</option>
              </select>
            </p>
            <p>
              <strong>Thời gian đặt hàng:</strong>{" "}
              {orders[orderIndex].created_at}
            </p>
            <p>
              <strong>Phương thức thanh toán:</strong>{" "}
              {orders[orderIndex].payTo === "NhanHang"
                ? "Trả tiền khi nhận hàng"
                : "Trả tiền qua chuyển khoản"}
            </p>
          </div>
          <button
            onClick={handleUpdate}
            className="bg-purple-500 text-white px-4 py-2 rounded mt-5"
            disabled={orders[orderIndex].status === "daGui"} // Không cho cập nhật nếu trạng thái là "Đã gửi"
          >
            Cập nhật
          </button>
        </div>

        {/* hiển thị sản phẩm */}
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">STT</th>
              <th className="px-4 py-2 border">Ảnh</th>
              <th className="px-4 py-2 border">Tên sản phẩm</th>
              <th className="px-4 py-2 border">Số lượng</th>
              <th className="px-4 py-2 border">Đơn giá</th>
              <th className="px-4 py-2 border">Tổng giá sp</th>
            </tr>
          </thead>
          <tbody>
            {orders[orderIndex].cart.map((item: any, index: number) => (
              <tr key={item.id}>
                <td className="px-4 py-2 border text-center">{index + 1}</td>
                <td className="px-4 py-2 border">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover mx-auto"
                  />
                </td>
                <td className="px-4 py-2 border">{item.name}</td>
                <td className="px-4 py-2 border text-center">{item.quantity}</td>
                <td className="px-4 py-2 border">{formatVND(item.price)}</td>
                <td className="px-4 py-2 border">
                  {formatVND(item.price * item.quantity)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}