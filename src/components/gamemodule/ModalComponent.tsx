import { useWeb3 } from "@3rdweb/hooks";
import { ThirdwebSDK } from "@3rdweb/sdk";
import { ethers } from "ethers";
import React, { useMemo, useState } from "react";
import "./ModalComponent.css";


const question = () => {
    let a = Math.floor(Math.random() * 10) + 1;
    let b = Math.floor(Math.random() * 10) + 1;
    let op = ["*", "+", "-"][Math.floor(Math.random()*3)];
    let question = "How much is " + a + " " + op + " " + b + "?";
    let answer = eval( a + op + b);

    return {question,answer};
}

let newQuestion = question();

function Modal({ setOpenModal }:{setOpenModal:any}) {

  const { provider, address } = useWeb3();
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

  const transferFrom = async () => { 
    let amount = ethers.utils.parseEther("1") 
    await tokenModule!.transferFrom("0x71E48d0a82CD7f433876eDa098B6A9C125698B11", address!, amount)
      .then((data: any) => console.log(data))
      .catch((error: any) => console.error(error));
    };

    const checkAnswer = (givenAnswer:any, currentQuestion:any) => {
      console.log(givenAnswer, currentQuestion)
        if(givenAnswer == currentQuestion.answer){
          transferFrom();
          alert("nice, you won 1 token!")
        } else{
          alert("sorry thats wrong!")
        }
        newQuestion = question();
    }


  let [inputValue, setInputValue] = useState('');
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
        </div>
        <div className="title">
          <h1>Are You Sure You Want to Play A Game</h1>
        </div>
        <div className="body">
          <p>{newQuestion.question}</p><br/>
          <input style={{padding: "12px 20px", margin: "8px 0", boxSizing: "border-box"}}
          type="text"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
        />
        </div>
        <div className="footer">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
            id="cancelBtn"
          >
            Cancel
          </button>
          <button type="button" onClick={() => {checkAnswer(inputValue, newQuestion); setOpenModal(false);}}>Answer</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;