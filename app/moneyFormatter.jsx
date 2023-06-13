/* eslint-disable max-len */
const Formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'CAD',
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 2, // (causes 2500.99 to be printed as $2,501)
});

export default Formatter;