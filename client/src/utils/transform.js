import moment from 'moment';

const transformItemDetails = data => {
  return (
    data &&
    data.map(item => {
      return {
        label: item.itemName,
        value: item.itemCode,
        key: item.itemCode,
        rate: item.rate,
      };
    })
  );
};

const transformChartData = (data, months) => {
  const currentMonth = moment().format('MM');
  const currentMonthName = moment().format('MMM');
  let previousMonthSales = 10000;
  const filterCurrentMonthData = data && data.filter(_ => _.orderDate.split('/')[0] === currentMonth);
  const currentMonthSales =
    filterCurrentMonthData && filterCurrentMonthData.reduce((acc, item) => acc + item.totalAmt, 0);
  const calculateMonthlyPer =
    currentMonthSales && ((currentMonthSales - previousMonthSales) / previousMonthSales) * 100;

  const updatedData = months.map(item => {
    if (item.label === currentMonthName.toUpperCase()) {
      return [item.label, parseFloat(calculateMonthlyPer && calculateMonthlyPer.toFixed(1))];
    } else {
      return [item.label, item.value];
    }
  });
  return calculateMonthlyPer > 0 ? updatedData : null;
};

export default {
  transformItemDetails,
  transformChartData,
};
