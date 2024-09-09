import React from 'react'

export default function page() {
  return (
    <div>
      {/* myOrder */}
      <div className="profile-container-bot">
        {/* myOrder */}
        {/* {data.orderReducer.orders.some(order => order.idUser === loggedInUser?.id) ? ( */}
        {/* data.orderReducer.orders.filter(order => order.idUser === loggedInUser?.id).map((order: any) => ( */}
        <div className="order-item-all flex justify-center items-center mt-12 mb-[-9]">
          <div className="order-item w-4/5 bg-gray-100 border border-gray-300 rounded-lg p-5 mb-5">
            <div className="order-details flex justify-center items-center mb-5">
              <img src="https://cdn-media.sforum.vn/storage/app/media/wp-content/uploads/2018/11/2-10.png" alt="Product" className="product-image w-[100px] h-[100px] object-cover mr-5 border border-gray-300" />
              <div className="product-info flex-grow">
                <p className="product-name text-lg mb-2">aaaa</p>
                <p className="product-quantity text-gray-600 mb-1">x213</p>
              </div>
              <div className="price-info text-right">
                <span className="discounted-price text-gray-800 text-lg ml-10">0000</span>
              </div>
            </div>

            <div className="order-summary flex items-center justify-end mb-5">
              <span className="total-label font-bold mr-2">Thành tiền:</span>
              <span className="total-price text-orange-500 text-lg">0000</span>
            </div>

            <div className="order-actions flex justify-around items-center mb-[-3]">
              <p className={
                // order.status === 'choDuyet' ? 'text-red-500' :
                //   order.status === 'daDuyet' ? 'text-yellow-500' :
                'text-green-500'
              }>
                {
                  // order.status === 'choDuyet'
                  // ? 'Đơn hàng của bạn đang chờ được duyệt'
                  // : order.status === 'daDuyet'
                  //   ? 'Đơn hàng của bạn đã được duyệt' : 
                  'Đơn hàng đã được giao thành công'}
              </p>
              <button className="contact-seller-button flex py-2 px-4 rounded-md bg-green-500 text-white">Liên Hệ Người Bán</button>
            </div>
          </div>
        </div>
        {/* )) */}
        {/* ) : ( */}
        <div className="order-item-all-not-order mt-20 mb-12 text-red-500">Bạn chưa có đơn đặt hàng nào</div>
        {/* )} */}
      </div>
      <div className='shopping-cart-end'>
        <button className="shopping-cart__continue font-bold py-2 px-4 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors duration-300"
        // onClick={nextToHome} 
        >Tiếp tục mua hàng</button>
      </div>
      {/* end-myOrder */}
    </div>
  )
}
