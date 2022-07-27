import { getMaxSupply, getMintedNumber } from "./web3.js";
import { showMintModal } from "../components/MintModal";
import { getWalletAddressOrConnect } from "../wallet";

export const updateMintButton = () => {
  const mintButtons = [
    ...document.querySelectorAll("#mint-button"),
    ...document.querySelectorAll("a[href*='#mint-button']"),
  ];

  if (mintButtons) {
    mintButtons.forEach((mintButton) => {
      mintButton.href = "#";
      mintButton.onclick = async () => {
        const initialBtnText = mintButton.textContent;
        setButtonText(mintButton, "Loading...");
        try {
          const quantity = getMintQuantity();
          const address = await getWalletAddressOrConnect(true);
          if (address) {
            showMintModal(quantity);
          }
        } catch (e) {
          console.error(e);
          alert(`Error on mint: ${e}`);
        }
        setButtonText(mintButton, initialBtnText);
      };
    });
  }
};

export const updateMintedCounter = async () => {
  const mintedElem = document.querySelector("#minted-counter");
  const totalElem = document.querySelector("#total-counter");

  if (mintedElem) {
    const minted = await getMintedNumber();
    console.log("MINTED", minted);
    if (minted) {
      mintedElem.textContent = minted;
    }
  }
  if (totalElem) {
    const maxSupply = await getMaxSupply();
    console.log("TOTAL", maxSupply);
    if (maxSupply) {
      totalElem.textContent = maxSupply;
    }
  }
};

const getMintQuantity = () => {
  const quantity = document.querySelector("#quantity-select")?.value;
  return quantity !== "" && quantity !== undefined
    ? Number(quantity)
    : undefined;
};

const setButtonText = (btn, text) => {
  if (btn.childElementCount > 0) {
    btn.children[0].textContent = text;
  } else {
    btn.textContent = text;
  }
};
