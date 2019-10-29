import React, { useState, useEffect } from "react";
import "./App.css";
import { mockData } from "./inputData";

function App() {
  const [consumerName, setName] = useState("Others");
  const [consumerPrice, setPrice] = useState({
    StandOutAd: 0,
    PremiumAd: 0,
    ClassicAd: 0
  });
  const [quantity, setQuantity] = useState({
    StandOutAd: 0,
    PremiumAd: 0,
    ClassicAd: 0
  });
  const [totalPrice, setTotalPrice] = useState({
    StandOutAd: 0,
    PremiumAd: 0,
    ClassicAd: 0
  });
  const [checkoutPrice, setCheckoutPrice] = useState(0);
  const [deal, setDeal] = useState({
    StandOutAd: { 1: 1 },
    PremiumAd: { 1: 1 },
    ClassicAd: { 1: 1 }
  });
  const handleSelectChange = event => {
    setName(event.target.value);
  };

  const handleChangeQuantity = event => {
    const { name, value } = event.target;

    switch (name) {
      case "ClassicAd": {
        setQuantity({ ...quantity, ClassicAd: value });
        break;
      }
      case "StandOutAd": {
        setQuantity({
          ...quantity,
          StandOutAd: value
        });
        break;
      }
      case "PremiumAd": {
        setQuantity({
          ...quantity,
          PremiumAd: value
        });
        break;
      }
      default:
        break;
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
  };
  useEffect(() => {
    let pricingValue = {};
    let dealValue = {};
    Object.keys(mockData).map(current => {
      if (
        mockData[current][consumerName] &&
        mockData[current][consumerName].Price
      ) {
        pricingValue[current] = mockData[current][consumerName].Price;
      } else {
        pricingValue[current] = mockData[current].default.Price;
      }
      if (
        mockData[current][consumerName] &&
        mockData[current][consumerName].Deal
      ) {
        dealValue[current] = mockData[current][consumerName].Deal;
      } else {
        dealValue[current] = { 1: 1 };
      }
      return current;
    });

    setPrice(pricingValue);
    setDeal(dealValue);
  }, [consumerName]);
  useEffect(() => {
    let ttlPrice = {};

    Object.keys(deal).map(current => {
      const priceValue = consumerPrice[current].toString().slice(0, -1);
      const currntQuantity = quantity[current];

      if (Object.keys(deal[current])[0] !== "1") {
        const pricefor = Object.keys(deal[current])[0];
        const priceto = Object.values(deal[current])[0];

        if (currntQuantity >= pricefor) {
          const quotient = Math.floor(currntQuantity / pricefor);
          const remainder = currntQuantity % pricefor;

          ttlPrice[current] =
            quotient * priceto * priceValue + remainder * priceValue;
          return current;
        }
      }

      ttlPrice[current] = currntQuantity * priceValue;
      return current;
    });
    setCheckoutPrice(
      ttlPrice["ClassicAd"] + ttlPrice["StandOutAd"] + ttlPrice["PremiumAd"]
    );
    setTotalPrice(ttlPrice);
  }, [quantity, consumerPrice, deal]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div style={{ height: "40px", width: "300px" }}>
          <label>
            ConsumerName:
            <select onChange={handleSelectChange} value={consumerName}>
              <option value="Others">Others</option>
              <option value="Myer">Myer</option>
              <option value="SecondBite">SecondBite</option>
              <option value="AxilCoffeeRoasters">AxilCoffeeRoasters</option>
            </select>
          </label>
        </div>
        <table style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>TotalPrice</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>ClassicAd</td>
              <td>Basic level of Advertisement</td>
              <td>{consumerPrice.ClassicAd}</td>
              <td>
                <input
                  type="number"
                  min="0"
                  name="ClassicAd"
                  onChange={handleChangeQuantity}
                  value={quantity.ClassicAd}
                />
              </td>
              <td>{totalPrice.ClassicAd.toFixed(2)}</td>
            </tr>
            <tr>
              <td>StandOutAd</td>
              <td>Use Company Logo and longer presentation text</td>
              <td>{consumerPrice.StandOutAd}</td>
              <td>
                <input
                  type="number"
                  min="0"
                  name="StandOutAd"
                  value={quantity.StandOutAd}
                  onChange={handleChangeQuantity}
                />
              </td>
              <td>{totalPrice.StandOutAd.toFixed(2)}</td>
            </tr>
            <tr>
              <td>PremiumAd</td>
              <td>Allow higher visibility and puts at the top of result</td>
              <td>{consumerPrice.PremiumAd}</td>
              <td>
                <input
                  type="number"
                  min="0"
                  name="PremiumAd"
                  value={quantity.PremiumAd}
                  onChange={handleChangeQuantity}
                />
              </td>
              <td>{totalPrice.PremiumAd.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </form>

      <div style={{ textAlign: "center" }}>
        Checkout Price: {checkoutPrice.toFixed(2)}$
      </div>
    </div>
  );
}

export default App;
