
function convertCurrency(monto, cotizacionVenta){
    if (!monto || !cotizacionVenta) return "";
    return (monto / cotizacionVenta).toFixed(2);

} 

export { convertCurrency };