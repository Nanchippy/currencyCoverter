import React, { useState, useEffect } from "react";
import './App.css';
const CurrencyConverter = () => {
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [amount, setAmount] = useState();
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [error, setError] = useState(null);
  const [currencyOptions, setCurrencyOptions] = useState([]);

  //Fetching symbols
  useEffect(() => {
    fetch(`https://api.forexrateapi.com/v1/symbols?api_key=9bc193824703d405c08c83608a36f0f5`)
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          const options = Object.entries(data.symbols).map(([value, label]) => ({
            value,
            label,
          }));
          setCurrencyOptions(options);
        } else {
          console.error('Error fetching symbols:', data.message);
        }
      })
      .catch(error => {
        console.error('Error fetching symbols:', error);
      });
  }, []);

  const convertCurrency = () => {
    fetch(`https://api.forexrateapi.com/v1/convert?api_key=9bc193824703d405c08c83608a36f0f5&from=${fromCurrency}&to=${toCurrency}&amount=${amount}`)
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setConvertedAmount(data.result);
          setError(null);
        } else {
          setConvertedAmount(null);
          setError(data.message);
        }
      })
      .catch(error => {
        console.error('Error converting currency:', error);
        setConvertedAmount(null);
        setError('Error converting currency. Please try again.');
      });
  };

  return (
    <div>
      <h1>Currency Converter</h1>
      <form>
        <label>From:</label>
        <select className="selectCurrency"
          id="fromCurrency"
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
          required
        >
          {currencyOptions.map((currency, index) => (
            <option key={index} value={currency.value}>
              {currency.value}
            </option>
          ))}
        </select>
        <br />
        <label>To:</label>
        <select className="selectCurrency"
          id="toCurrency"
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
          required
        >
          {currencyOptions.map((currency, index) => (
            <option key={index} value={currency.value}>
              {currency.value}
            </option>
          ))}
        </select>
        <br />
        <label>Amount:</label>
        <input className="selectCurrency"
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <br />
        <button className="button" type="button" onClick={convertCurrency}>Convert</button>
      </form>
      <div id="result">
        {convertedAmount !== null && <p className="amount">Converted Amount: {convertedAmount}</p>}
        {error && <p className="error">Error: {error}</p>}
      </div>
    </div>
  );
};

export default CurrencyConverter;
