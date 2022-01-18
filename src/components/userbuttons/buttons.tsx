import { useWeb3 } from "@3rdweb/hooks";
import { useEffect, useMemo, useState, useCallback } from "react";
import { ThirdwebSDK } from "@3rdweb/sdk";
import { ethers, BigNumberish } from "ethers";
import './buttons.css';

//use the wallet instead of private keys
const Buttons = () => {
    const { provider } = useWeb3();
    // let mintInputValue = '';
    let [mintInputValue, setMintInputValue] = useState('');
    let [burnInputValue, setBurnInputValue] = useState('');
//   const [totalSupply, setTotalSupply] = useState(0);

  const sdk = useMemo(() => {
    if (provider) {
      return new ThirdwebSDK(provider.getSigner())
    }

    return undefined;
  }, [provider]);

//instantiate the sdk
  const tokenModule = useMemo(() => {
    if (sdk) {
      return sdk.getTokenModule("0x14F6991ee54Fc62Ff9E72E6f0C17e9625eDc947b")
    }

    return undefined;
  }, [sdk]);


  const setMintValue = (value:any) => {
    mintInputValue = value;
  }

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
// mint an specific amount, in this example only 1 ether
// mint(ethers.utils.parseEther("1"));

// //get the balance from our token module
//   useEffect(() => {
//     const getBalance = async () => {
//       const tokenBalance = await tokenModule.balance()
//       setBalance(tokenBalance.displayValue); 
//     }

//     const getTotalSupply = async () => {
//       const totalSupply = await tokenModule.totalSupply();
//       setTotalSupply(ethers.utils.formatEther(totalSupply)); 
//     }

//     if (tokenModule) {
//       getBalance()
//       getTotalSupply()
//     };
//   }, [tokenModule]);
  

// //mint our token. remember, ethereum deals different with numbers.
// // that's why we need to convert our amount
//   const amount = ethers.utils.parseUnits("1000", 18);
//   // const getTotalSupply = useCallback(() => {
    

//   //   tokenModule.getTotalSupply();

//   // }, [tokenModule]);

//   // const getBalance = useCallback(() => {
    

//   //   return tokenModule.balance()

//   // }, [tokenModule]);

//   // const totalSupply = async () => {  
//   //   await tokenModule.totalSupply()
//   //     .then((data) => console.log(data))
//   //     .catch((error) => console.error(error));
//   // };




//   function renderSwitch(param) {
//     switch(param) {
//       case 'balance':
//         return balance
//       case 'supply':
//         return totalSupply
//       default :
//         return '';
//     }
//   }

  
  return (
  <>
  <div className="input-btn-container">
  <input style={{padding: "12px 20px", margin: "8px 0", boxSizing: "border-box"}}
          type="text"
          value={mintInputValue}
          onChange={e => setMintInputValue(e.target.value)}
        />
  <button type="button" onClick={() => {mint(mintInputValue)}}>mint</button>

  </div>
  <div className="input-btn-container">
  <input style={{padding: "12px 20px", margin: "8px 0", boxSizing: "border-box"}}
          type="text"
          value={burnInputValue}
          onChange={e => setBurnInputValue(e.target.value)}
        />
  <button type="button" onClick={() => {burn(burnInputValue)}}>burn</button>
  </div>
  
  {/* <div className="input-btn-container">
  <button>weetneit</button> 
  </div> */}
  
  </>
  );
};
export default Buttons;