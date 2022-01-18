import { useWeb3 } from "@3rdweb/hooks";
import { useState } from "react";
import { ethers } from "ethers";
import UseModule from "../useModule";
import './buttons.css';

//use the wallet instead of private keys
const Buttons = () => {
  const { provider } = useWeb3();
  let [mintInputValue, setMintInputValue] = useState('');
  let [burnInputValue, setBurnInputValue] = useState('');

  const tokenModule = UseModule();

  const mint = async (amount: any) => {
    amount = ethers.utils.parseEther(amount)
    await tokenModule!.mint(amount)
      .then((data: any) => console.log(data))
      .catch((error: any) => console.error(error));
  };

  const burn = async (amount: any) => {
    amount = ethers.utils.parseEther(amount)
    await tokenModule!.burn(amount)
      .then((data: any) => console.log(data))
      .catch((error: any) => console.error(error));
  };


  return (
    <>
      <div className="input-btn-container">
        <input style={{ padding: "12px 20px", margin: "8px 0", boxSizing: "border-box" }}
          type="text"
          value={mintInputValue}
          onChange={e => setMintInputValue(e.target.value)}
        />
        <button type="button" onClick={() => { mint(mintInputValue) }}>mint</button>

      </div>
      <div className="input-btn-container">
        <input style={{ padding: "12px 20px", margin: "8px 0", boxSizing: "border-box" }}
          type="text"
          value={burnInputValue}
          onChange={e => setBurnInputValue(e.target.value)}
        />
        <button type="button" onClick={() => { burn(burnInputValue) }}>burn</button>
      </div>

      {/* <div className="input-btn-container">
  <button>weetneit</button> 
  </div> */}

    </>
  );
};
export default Buttons;