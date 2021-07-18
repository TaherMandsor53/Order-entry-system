import React, { useState } from 'react';
import InputComponent from './common-components/InputComponent';

export default function Home() {
  const [orderData, setOrderData] = useState({
    customerName: '',
    customerAddress: '',
    itemDetails: '',
    ItemCode: '',
    itemDescription: '',
    rate: '',
    quantity: '',
    grossOrderAmount: '',
    TotalOrderAmount: '',
  });
  const [orderDate, setOrderDate] = useState('');
  const [shipDate, setShipDate] = useState('');

  const onOrderDataChange = event => {
    const { name, value } = event.target;
    setOrderData({ ...orderData, [name]: value });
  };
  return (
    <div className="home-main">
      <div className="home-title">Order Entry System</div>
      <div className="home-content">
        <InputComponent
          textValue={orderData.customerName}
          textName="customerName"
          onInputChange={onOrderDataChange}
          textLabel="Customer Name"
        />

        <InputComponent
          textValue={orderData.customerAddress}
          textName="customerAddress"
          onInputChange={onOrderDataChange}
          textLabel="Customer Address"
        />
      </div>
    </div>
  );
}
