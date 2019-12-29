class Transactions {
  constructor() {
    this.quantity;
    this.walletValue;
    this.sellingValue;
    this.priceValue;
    this.amount;
    this.type;
    this.gold = [];
    this.petroleum = [];
    this.house = [];
    this.car = [];
    this.name;
    //uchwyty do przekazania do game
    this.typeOfTrade = [];
  }

  checkValueOfBuying = () => {
    if (
      typeof this.quantity === "" &&
      this.quantity <= 0 &&
      this.quantity === undefined
    ) {
      alert("Wartość za niska lub nieprawidłowa");
      return;
    }
    if (this.walletValue < this.priceValue * this.quantity) {
      alert("Nie masz wystarczająco gotówki aby dokonać tej transakcji");
      return;
    }
    if (
      this.quantity > 0 &&
      this.walletValue > this.priceValue * this.quantity
    ) {
      alert("dokonałeś transakcji!");
      this.amount = this.priceValue * this.quantity;
      this.addToState();
    }
    console.log(typeof this.quantity);
  };

  addToState = () => {
    if (this.type === 0) {
      this.gold.push({
        price: this.priceValue,
        quantity: this.quantity
      });
      this.walletValue -= this.priceValue * this.quantity;
    }
    if (this.type === 1) {
      this.petroleum.push({
        price: this.priceValue,
        quantity: this.quantity
      });
      this.walletValue -= this.priceValue * this.quantity;
    }
    if (this.type === 2) {
      this.house.push({
        price: this.priceValue,
        quantity: this.quantity
      });
      this.walletValue -= this.priceValue * this.quantity;
    }

    if (this.type === 3) {
      this.car.push({
        price: this.priceValue,
        quantity: this.quantity
      });
      this.walletValue -= this.priceValue * this.quantity;
    }
  };

  addMoneyToWallet(el, actualPrice) {
    this.walletValue += actualPrice * el.quantity;
  }

  checkTradeList(i, removeTradeList) {
    if (i === 0) {
      if (this.gold.length === 0) {
        alert("Nie posiadasz stanu");

        removeTradeList();
        return;
      } else {
        this.name = "Stan złota";
        this.typeOfTrade = this.gold;
      }
    }
    if (i === 1) {
      if (this.petroleum.length === 0) {
        alert("Nie posiadasz stanu");
        removeTradeList();
        return;
      } else {
        this.name = "Stan ropy";
        this.typeOfTrade = this.petroleum;
      }
    }
    if (i === 2) {
      if (this.house.length === 0) {
        alert("Nie posiadasz stanu");
        removeTradeList();
        return;
      } else {
        this.name = "Stan domów";
        this.typeOfTrade = this.house;
      }
    }
    if (i === 3) {
      if (this.car.length === 0) {
        alert("Nie posiadasz stanu");
        removeTradeList();
        return;
      } else {
        this.name = "Stan samochodów";
        this.typeOfTrade = this.car;
      }
    }
  }
}
