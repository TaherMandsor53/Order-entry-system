import React, { useEffect, useState } from 'react';
import InputComponent from './common-components/InputComponent';
import DropdownComponent from './common-components/DropdownComponent';
import MessageComponent from './common-components/MessageComponent';
import moment from 'moment';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';
import { useSelector, useDispatch } from 'react-redux';
import { createOrderDetails, getItemDetails, getOrderDetails } from '../actions/action';
import transform from '../utils/transform';
import constants from '../constants/constants';
import EditDeleteIconRenderer from '../renderer/EditDeleteIconRenderer';
import DataTable from '../components/common-components/DataTable';

export default function Home() {
  const [orderData, setOrderData] = useState({
    customerName: '',
    customerAddress: '',
    itemDescription: '',
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
    itemDescriptionError: '',
    quantityError: '',
  });
  const [popupOpen, setPopupOpen] = useState(false);

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
  const orderDetailsVal = useSelector(state => state.createOrder?.getOrderDetails);

  const transformItemOption = transform.transformItemDetails(itemDetailsVal?.itemDetails);

  //filtering item rate
  const itemRate = transformItemOption.find(_ => _.value === orderData.itemDescription);
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
    const isItemValid = orderData.itemDescription ? true : false;
    const isQuantityValid = orderData.quantity > 0;

    if (isCustomerNameValid && isCustomerAddressValid && isItemValid && isQuantityValid) {
      dispatch(
        createOrderDetails(
          orderDetailsVal.length,
          orderData.customerName,
          orderData.customerAddress,
          dateVal.orderDate,
          dateVal.shipDate,
          orderData.itemDescription,
          grossAmount,
          totalTaxVal,
          shipTaxVal,
          totalAmount,
          orderData.quantity,
        ),
      );
      onCancelBtnClick();
      setPopupOpen(true);
    } else {
      setOrderDataError(prevState => ({
        ...prevState,
        customerNameError: !isCustomerNameValid ? 'Customer name required' : '',
        customerAddressError: !isCustomerAddressValid ? 'Customer Address required' : '',
        itemDescriptionError: !isItemValid ? 'Item required' : '',
        quantityError: !isQuantityValid ? 'quantity must be > 0' : '',
      }));
    }
  };

  const onCancelBtnClick = () => {
    setOrderDataError({
      customerNameError: '',
      customerAddressError: '',
      itemDescriptionError: '',
      quantityError: '',
    });
    setOrderData({
      customerName: '',
      customerAddress: '',
      itemDescription: '',
      quantity: 0,
    });
  };

  const onPopupClose = () => {
    setPopupOpen(false);
    dispatch(getOrderDetails());
  };

  const orderTableColList = constants.orderColHeaders.map(_ => {
    if (_.value === 'edit')
      return {
        ..._,
        cellRenderer: row => <EditDeleteIconRenderer row={row} type="edit" />,
      };
    if (_.value === 'delete') {
      return {
        ..._,
        cellRenderer: row => <EditDeleteIconRenderer row={row} type="delete" />,
      };
    }
    return _;
  });
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
          name="itemDescription"
          setDropVal={onOrderDataChange}
          dropVal={orderData.itemDescription}
          variant="outlined"
          errorMsg={orderDataError.itemDescriptionError}
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
          popupMsg="Order Created Successfully...!"
        />
      )}
      <div className="table-container">
        <DataTable tableCols={orderTableColList} tableData={orderDetailsVal} />
      </div>
    </div>
  );
}
