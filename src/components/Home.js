import React, { useEffect, useState } from 'react';
import InputComponent from './common-components/InputComponent';
import DropdownComponent from './common-components/DropdownComponent';
import MessageComponent from './common-components/MessageComponent';
import BarChart from './common-components/BarChart';
import moment from 'moment';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';
import { useSelector, useDispatch } from 'react-redux';
import {
  createOrderDetails,
  getItemDetails,
  getOrderDetails,
  deleteOrderDetails,
  updateOrderDetails,
} from '../actions/action';
import transform from '../utils/transform';
import constants from '../constants/constants';
import DataTable from '../components/common-components/DataTable';
import loaderImg from '../assets/loader.svg';
import searchIcon from '../assets/search-icon.svg';
import clearIcon from '../assets/closeIcon.svg';
import ExcelDownloadComponent from './common-components/ExcelDownloadComponent';

export default function Home() {
  const [orderData, setOrderData] = useState({
    customerName: '',
    customerAddress: '',
    itemCode: '',
    quantity: 0,
    orderId: 0,
  });
  const dispatch = useDispatch();
  const [dateVal, setDateVal] = useState({
    orderDate: moment().format('MM/DD/YYYY'),
    shipDate: moment().format('MM/DD/YYYY'),
  });
  const [orderDataError, setOrderDataError] = useState({
    customerNameError: '',
    customerAddressError: '',
    itemCodeError: '',
    quantityError: '',
  });
  const [popupOpen, setPopupOpen] = useState(false);
  const [updateId, setUpdateId] = useState('');
  const [itemData, setItemData] = useState('');

  const onOrderDataChange = event => {
    const { name, value } = event.target;
    setOrderData({ ...orderData, [name]: value });
  };

  const onDateChange = (date, type) => {
    setDateVal({ ...dateVal, [type]: date });
  };

  useEffect(() => {
    dispatch(getItemDetails());
    dispatch(getOrderDetails());
  }, []);

  const itemDetailsVal = useSelector(state => state.getItemDetails);
  const orderDetailsVal = useSelector(state => state.createOrder);
  const orderDetailsData = orderDetailsVal?.getOrderDetails;
  const orderLoader = orderDetailsVal?.isFetching;
  const createOrderMsg = orderDetailsVal?.createOrderDetails?.message;
  const deleteOrderMsg = orderDetailsVal?.deleteOrderList?.message;
  const updateOrderMsg = orderDetailsVal?.updateOrderList?.message;

  const transformItemOption = transform.transformItemDetails(itemDetailsVal?.itemDetails);

  //filtering item rate
  const itemRate = transformItemOption.find(_ => _.value === orderData.itemCode);
  const itemRateVal = itemRate?.rate;

  //calculating Item tax rate
  const itemTax = itemRateVal * 0.05;

  //calculating gross amount
  const grossAmount = orderData.quantity * itemRateVal;

  //calculating Total Tax
  const totalTaxVal = orderData.quantity * itemTax;

  //calculating ship Tax
  const shipTaxVal = grossAmount * 0.1;

  //Calculating total amount to be paid
  const totalAmount = grossAmount + totalTaxVal + shipTaxVal;

  //Save button click
  const onSaveBtnClick = () => {
    const isCustomerNameValid = orderData.customerName.length > 0;
    const isCustomerAddressValid = orderData.customerAddress.length > 0;
    const isItemValid = orderData.itemCode ? true : false;
    const isQuantityValid = orderData.quantity > 0;

    if (isCustomerNameValid && isCustomerAddressValid && isItemValid && isQuantityValid) {
      if (updateId) {
        const payload = {
          orderId: orderDetailsData.length,
          customerName: orderData.customerName,
          customerAddress: orderData.customerAddress,
          orderDate: dateVal.orderDate,
          shipDate: dateVal.shipDate,
          itemCode: orderData.itemCode,
          grossAmount: grossAmount,
          totalTaxVal: totalTaxVal,
          shipTaxVal: shipTaxVal,
          totalAmount: totalAmount,
          quantity: orderData.quantity,
        };
        dispatch(updateOrderDetails(updateId, payload));
      } else {
        const maxVal = orderDetailsData.map(_ => {
          return _.orderId;
        });
        const maxOrderId = maxVal && Math.max(...maxVal) + 1;
        dispatch(
          createOrderDetails(
            maxOrderId,
            orderData.customerName,
            orderData.customerAddress,
            dateVal.orderDate,
            dateVal.shipDate,
            orderData.itemCode,
            grossAmount,
            totalTaxVal,
            shipTaxVal,
            totalAmount,
            orderData.quantity,
          ),
        );
      }

      onCancelBtnClick();
      setPopupOpen(true);
    } else {
      setOrderDataError(prevState => ({
        ...prevState,
        customerNameError: !isCustomerNameValid ? 'Customer name required' : '',
        customerAddressError: !isCustomerAddressValid ? 'Customer Address required' : '',
        itemCodeError: !isItemValid ? 'Item required' : '',
        quantityError: !isQuantityValid ? 'quantity must be > 0' : '',
      }));
    }
  };

  const onCancelBtnClick = () => {
    setOrderDataError({
      customerNameError: '',
      customerAddressError: '',
      itemCodeError: '',
      quantityError: '',
    });
    setOrderData({
      customerName: '',
      customerAddress: '',
      itemCode: '',
      quantity: 0,
    });
  };

  const onPopupClose = () => {
    setPopupOpen(false);
    setUpdateId('');
    dispatch(getOrderDetails());
  };

  const [tableData, setTableData] = useState('');
  const [searchVal, setSearchVal] = useState('');
  const filterColumns = ['customerName', 'totalAmt', 'quantity'];

  const onSearchChange = val => {
    const lowercasedValue = val.toLowerCase().trim();
    setSearchVal(lowercasedValue);
    if (lowercasedValue === '') {
      setTableData(orderDetailsData);
    } else {
      const filteredData =
        orderDetailsData &&
        orderDetailsData.filter(item => {
          return Object.keys(item).some(key =>
            filterColumns.includes(key) ? item[key].toString().toLowerCase().includes(lowercasedValue) : false,
          );
        });
      setTableData(filteredData);
    }
  };

  const onSearchTextClear = () => {
    setSearchVal('');
    setTableData(orderDetailsData);
  };

  const getOrderId = (val, type) => {
    const orderIdData = orderDetailsData.find(_ => _.orderId === val);
    const orderIdVal = orderIdData && orderIdData._id;
    const itemDetails = itemDetailsVal?.itemDetails;
    const filterItemDetails = itemDetails.find(item => item.itemCode === orderIdData.itemCode);

    if (type === 'delete') {
      dispatch(deleteOrderDetails(orderIdVal));
      setPopupOpen(true);
    } else if (type === 'edit') {
      setOrderData(orderIdData);
      setUpdateId(orderIdVal);
    } else {
      setPopupOpen(true);
      const itemData = `<div>Item Code : ${
        filterItemDetails && filterItemDetails.itemCode
      }</div><br/><div>Item Name : ${filterItemDetails && filterItemDetails.itemName}</div><br/><div>Item Rate : ${
        filterItemDetails && filterItemDetails.rate
      }</div>`;
      setItemData(itemData);
    }
  };

  const transformChartData = transform.transformChartData(orderDetailsData, constants.monthConstants);
  return (
    <div className="home-main">
      <div className="home-title">Order Entry System</div>
      <div className="home-content">
        <InputComponent
          textValue={orderData.customerName}
          textName="customerName"
          onInputChange={onOrderDataChange}
          textLabel="Customer Name"
          variant="outlined"
          errorMsg={orderDataError.customerNameError}
        />

        <InputComponent
          textValue={orderData.customerAddress}
          textName="customerAddress"
          onInputChange={onOrderDataChange}
          textLabel="Customer Address"
          variant="outlined"
          errorMsg={orderDataError.customerAddressError}
        />

        <DropdownComponent
          label="Item"
          options={transformItemOption}
          name="itemCode"
          setDropVal={onOrderDataChange}
          dropVal={orderData.itemCode}
          variant="outlined"
          errorMsg={orderDataError.itemCodeError}
        />

        <InputComponent
          textValue={itemRateVal ? itemRateVal : 0}
          textName="rate"
          textLabel="Item Rate"
          readOnly
          variant="outlined"
        />

        <InputComponent
          textValue={orderData.quantity}
          textName="quantity"
          onInputChange={onOrderDataChange}
          textLabel="Quantity"
          variant="outlined"
          errorMsg={orderDataError.quantityError}
        />

        <InputComponent
          textValue={isNaN(itemTax) ? 0 : itemTax}
          textName="itemTaxRate"
          textLabel="Item Tax Rate(5%)"
          readOnly
          variant="outlined"
        />

        <InputComponent
          textValue={isNaN(grossAmount) ? 0 : grossAmount}
          textName="grossOrderAmount"
          textLabel="Gross Order Amount"
          readOnly
          variant="outlined"
        />

        <InputComponent
          textValue={isNaN(totalTaxVal) ? 0 : totalTaxVal}
          textName="totalTax"
          textLabel="Total Tax"
          readOnly
          variant="outlined"
        />

        <InputComponent
          textValue={isNaN(shipTaxVal) ? 0 : shipTaxVal}
          textName="shipTax"
          textLabel="Shipping Tax(10%)"
          readOnly
          variant="outlined"
        />

        <InputComponent
          textValue={isNaN(totalAmount) ? 0 : totalAmount}
          textName="totalOrderAmount"
          textLabel="Total Order Amount"
          readOnly
          variant="outlined"
        />

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            disableToolbar
            label="Order Date"
            format="dd/MM/yyyy"
            id="orderDate"
            value={dateVal.orderDate}
            onChange={date => onDateChange(moment(date).format('MM/DD/YYYY'), 'orderDate')}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </MuiPickersUtilsProvider>

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            disableToolbar
            label="Ship Date"
            format="dd/MM/yyyy"
            id="shipDate"
            value={dateVal.shipDate}
            onChange={date => onDateChange(moment(date).format('MM/DD/YYYY'), 'shipDate')}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </MuiPickersUtilsProvider>
      </div>
      <div className="btn-container">
        <button onClick={onSaveBtnClick} className="save-btn">
          Save
        </button>
        <button onClick={onCancelBtnClick} className="cancel-btn">
          Cancel
        </button>
      </div>
      {popupOpen && (
        <MessageComponent
          modalOpen={popupOpen}
          modalHeader="Order Details"
          closeModal={onPopupClose}
          popupMsg={createOrderMsg || deleteOrderMsg || updateOrderMsg || itemData}
        />
      )}

      <div className="table-container">
        {orderLoader ? (
          <img src={loaderImg} alt="loader-img" className="loader-img" />
        ) : (
          <>
            <div className="order-search-input">
              <img src={searchIcon} alt="search-icon" className="order-search-icon" />
              <input
                className="order-search"
                placeholder="Customer Name, Total Amount, Quantity"
                onChange={event => onSearchChange(event.target.value)}
                value={searchVal}
              />
              {searchVal && (
                <img src={clearIcon} alt="clear-icon" onClick={onSearchTextClear} className="order-search-clear" />
              )}
            </div>

            {orderDetailsData && orderDetailsData.length > 0 && (
              <ExcelDownloadComponent data={tableData || orderDetailsData} columnHeaders={constants.orderColHeaders} />
            )}
            {orderDetailsData && orderDetailsData.length > 0 && (
              <DataTable
                tableCols={constants.orderColHeaders}
                tableData={tableData || orderDetailsData}
                getOrderId={getOrderId}
              />
            )}
            <div />
          </>
        )}
      </div>
      {transformChartData && transformChartData.length > 0 && (
        <BarChart figureId="barchart" data={transformChartData} />
      )}
    </div>
  );
}
