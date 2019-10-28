import React from "react";
import "./App.css";
function App() {
  return (
    <div>
      <form>
        <label>
          ConsumerName:
          <select>
            <option value="Myer">Myer</option>
            <option value="SecondBite">SecondBite</option>
            <option value="AxilCoffeeRoasters">AxilCoffeeRoasters</option>
            <option value="Others">Others</option>
          </select>
        </label>
        <label>
          Name
          <input type="text" name="ClassicAd" />{" "}
        </label>
        <label>
          Name
          <input type="text" name="StandOutAd" />{" "}
        </label>
        <label>
          Name
          <input type="text" name="PremiumAd" />{" "}
        </label>
      </form>
    </div>
  );
}

export default App;
