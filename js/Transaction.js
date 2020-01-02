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

  checkValueOfBuying = showTransAlert => {
    if (this.walletValue < this.priceValue * this.quantity) {
      showTransAlert("Nie masz wystarczająco gotówki");
      return;
    }
    if (
      this.quantity > 0 &&
      this.walletValue > this.priceValue * this.quantity
    ) {
      showTransAlert("Dokonałeś Transakcji!");
      this.amount = this.priceValue * this.quantity;
      this.addToState();
    } else {
      showTransAlert("Wartość za niska lub nieprawidłowa");
      return;
    }
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

  checkTradeList(i, generateTradeList, showStateAlert) {
    if (i === 0) {
      if (this.gold.length === 0) {
        showStateAlert();
        return;
      } else {
        this.name = "Stan złota";
        this.typeOfTrade = this.gold;
        generateTradeList();
      }
    }
    if (i === 1) {
      if (this.petroleum.length === 0) {
        showStateAlert();
        return;
      } else {
        this.name = "Stan ropy";
        this.typeOfTrade = this.petroleum;
        generateTradeList();
      }
    }
    if (i === 2) {
      if (this.house.length === 0) {
        showStateAlert();
        return;
      } else {
        this.name = "Stan domów";
        this.typeOfTrade = this.house;
        generateTradeList();
      }
    }
    if (i === 3) {
      if (this.car.length === 0) {
        showStateAlert();
        return;
      } else {
        this.name = "Stan samochodów";
        this.typeOfTrade = this.car;
        generateTradeList();
      }
    }
  }
}
