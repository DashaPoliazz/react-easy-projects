import React, { useEffect, useState, useRef } from "react";
import { Converter } from "./components/Converter";
import "./style/index.scss";
import { ICurrenciesResponse } from "./types/currenciesResponse";

function App() {
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [fromPrice, setFromPrice] = useState(0);
  const [toPrice, setToPrice] = useState(1);

  const ratesRef = useRef<ICurrenciesResponse>({});

  useEffect(() => {
    fetch(
      "https://min-api.cryptocompare.com/data/pricemulti?fsyms=USD&tsyms=EUR,JPY,GBP,AUD,CAD,CHF,CNY,SEK,NZD"
    )
      .then((res) => res.json())
      .then((data) => {
        ratesRef.current = { ...data.USD, USD: 1 };
        handleChangeFromPrice(1);
      })
      .catch((e) => console.log(e));
  }, []);

  const handleChangeFromPrice = (price: number) => {
    const calculatedToPrice = price * ratesRef.current[toCurrency];
    setToPrice(Number(calculatedToPrice.toFixed(4)));
    setFromPrice(Number(price.toFixed(4)));
  };

  const handleChangeToPrice = (price: number) => {
    const res =
      (ratesRef.current[fromCurrency] / ratesRef.current[toCurrency]) * price;
    setFromPrice(Number(res.toFixed(4)));
    setToPrice(Number(price.toFixed(4)));
  };

  useEffect(() => {
    handleChangeToPrice(fromPrice);
  }, [fromCurrency]);

  useEffect(() => {
    handleChangeFromPrice(toPrice);
  }, [toCurrency]);

  return (
    <div className="App">
      <Converter
        value={fromPrice}
        currency={fromCurrency}
        onChangeCurrency={setFromCurrency}
        onChangePrice={handleChangeFromPrice}
      />
      <Converter
        value={toPrice}
        currency={toCurrency}
        onChangeCurrency={setToCurrency}
        onChangePrice={handleChangeToPrice}
      />
    </div>
  );
}

export default App;
