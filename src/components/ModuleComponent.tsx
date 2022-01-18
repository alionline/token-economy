import { useWeb3 } from "@3rdweb/hooks";
import { useEffect, useMemo, useState, useCallback } from "react";
import { ThirdwebSDK } from "@3rdweb/sdk";
// import { ethers } from "ethers";

//use the wallet instead of private keys
const ModuleComponent = (title:any) => {
  const { provider } = useWeb3();
//   // const [balance, setBalance] = useState(0);
//   // const [totalSupply, setTotalSupply] = useState(0);

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

//get the balance from our token module
  // useEffect(() => {
  //   const getBalance = async () => {
  //     const tokenBalance = await tokenModule.balance()
  //     setBalance(tokenBalance.displayValue); 
  //   }

  //   const getTotalSupply = async () => {
  //     const totalSupply = await tokenModule.totalSupply();
  //     setTotalSupply(ethers.utils.formatEther(totalSupply)); 
  //   }

  //   if (tokenModule) {
  //     getBalance()
  //     getTotalSupply()
  //   };
  // }, [tokenModule]);
  

//mint our token. remember, ethereum deals different with numbers.
// that's why we need to convert our amount
  // const amount = ethers.utils.parseUnits("1000", 18);
  // const getTotalSupply = useCallback(() => {
    

  //   tokenModule.getTotalSupply();

  // }, [tokenModule]);

  // const getBalance = useCallback(() => {
    

  //   return tokenModule.balance()

  // }, [tokenModule]);

  // const totalSupply = async () => {  
  //   await tokenModule.totalSupply()
  //     .then((data) => console.log(data))
  //     .catch((error) => console.error(error));
  // };




  // function renderSwitch(param) {
  //   switch(param) {
  //     case 'balance':
  //       return <p>{balance}</p>
  //     case 'supply':
  //       return <p>{totalSupply}</p>
  //     default :
  //       return '';
  //   }
  // }


 return 'tokenModule'
  // return (
  // <>
  // {renderSwitch(props.type)}
  // </>
  // );
};
export default ModuleComponent;