class Game {
  constructor(cities, wallet, prices, transactions) {
    //Buyingform
    this.form = document.querySelector(".buying-form");
    this.input = document.querySelector(".buying-form input");
    const confirmTransactionHandler = document.querySelector(
      ".buying-form button"
    );
    confirmTransactionHandler.addEventListener(
      "click",
      this.checkBuyingTransaction
    );
    //sellingForm
    this.sellingForm = document.querySelector(".selling-form");
    this.text = document.querySelector(".selling-form h1");
    // this.state = document.querySelector(".selling-form");
    this.closeForm = document
      .querySelector(".selling-form .close-form")
      .addEventListener("click", this.removeTradeList);
    this.listItems = document.querySelector("ul");
    //prices
    this.prices = prices;
    this.goldPrice = document.querySelector(".gold-price");
    this.petroleumPrice = document.querySelector(".petroleum-price");
    this.housePrice = document.querySelector(".house-price");
    this.carPrice = document.querySelector(".car-price");
    //wallet
    this.wallet = wallet;
    this.money = document.querySelector(".money");
    this.actualMoney;
    //level
    this.level = document.querySelector(".level");
    //citites
    this.cities = cities;
    this.cityName = document.querySelector(".city-name");
    this.cityImg = document.querySelector(".city-img");
    const changeCityHandler = document.querySelector(".changeCityBtn");
    changeCityHandler.addEventListener("click", this.renderTravelChanges);
    //transactions
    this.transactions = transactions;
    this.buyHandlers = [...document.querySelectorAll(".buy-btn")];
    this.sellHandlers = [...document.querySelectorAll(".sell-btn")];
    //prices
    this.selectedPrices;
    this.typeOfTrade;
    //actual clicked price
    this.actualPrice;
    //game-rules
    this.rulesBtn = document
      .querySelector(".rules-btn")
      .addEventListener("click", this.showRules);
    this.rules = document.querySelector(".rules");
    this.closeRulesBtn = document.querySelector(".close-rules");
  }

  showRules = () => {
    this.rules.classList.add("active");
    this.closeRulesBtn.addEventListener("click", () => {
      this.rules.classList.remove("active");
    });
  };

  renderingLevel() {
    this.level.textContent = this.wallet.levelName[this.wallet.level];
  }

  renderTravelChanges = () => {
    if (this.wallet.money <= 500) {
      alert("Nie stać Cię na kolejną podróz");
      return;
    }

    //get money for travel
    this.wallet.payForTravel();
    //redering new prices in random city
    this.prices.generateRandomPrice();
    //checking wallet status
    this.wallet.checkWalletStatus();
    //changing cities
    this.cities.changeCity();
    const actualCity = this.cities._cities[this.cities.cityCounter];
    //changing cities images
    const actualImg = this.cities._citiesImages[this.cities.cityCounter];
    this.cityImg.src = actualImg;
    this.cityName.textContent = actualCity;
    // this.cityImga.src = "img/" + ActiveXObject;
    //rendering actual money to dom
    this.money.textContent = this.wallet.money;
    //rendering rndom prices to dom
    this.goldPrice.textContent = this.prices.allRandomPrices[0];
    this.petroleumPrice.textContent = this.prices.allRandomPrices[1];
    this.housePrice.textContent = this.prices.allRandomPrices[2];
    this.carPrice.textContent = this.prices.allRandomPrices[3];
  };

  buyHandler = () => {
    this.buyHandlers.forEach((handler, i) => {
      handler.addEventListener("click", () => {
        //adding form
        this.addBuyingForm();
        //type of trade
        this.typeOfTrade = i;
        //get actual price
        this.selectedPrices = this.prices.allRandomPrices[i];
      });
    });
  };

  checkBuyingTransaction = () => {
    this.transactions.quantity = this.input.value;
    this.transactions.walletValue = this.wallet.money;
    this.transactions.priceValue = this.selectedPrices;
    this.transactions.type = this.typeOfTrade;
    this.transactions.checkValueOfBuying();
    this.removeBuyingForm();
    this.input.value = "";
    //protection against entering too much money
    if (this.transactions.amount > 0) {
      this.wallet.money -= this.transactions.amount;
    }
    this.money.textContent = this.wallet.money;
    this.transactions.amount = 0;
  };

  sellHandler = () => {
    this.sellHandlers.forEach((handler, i) => {
      handler.addEventListener("click", () => {
        this.removeTradeList();
        this.actualPrice = this.prices.allRandomPrices[i];
        this.transactions.checkTradeList(i, this.removeTradeList);
        this.generateTradeList();
        this.text.textContent = this.transactions.name;
      });
    });
  };

  addBuyingForm = () => {
    this.form.style.left = 50 + "%";
  };

  removeBuyingForm = () => {
    this.form.style.left = -50 + "%";
  };

  generateTradeList = () => {
    this.transactions.typeOfTrade.forEach((el, i) => {
      const tradeItem = document.createElement("li");
      const tradeItemSellBtn = document.createElement("button");
      tradeItemSellBtn.classList.add("sellBtns");
      tradeItemSellBtn.textContent = "Sprzedaj";
      tradeItemSellBtn.classList.add("sell-btn");
      tradeItem.textContent = `Cena: ${el.price} Ilość:  ${el.quantity}`;
      tradeItem.appendChild(tradeItemSellBtn);
      this.listItems.appendChild(tradeItem);
      tradeItemSellBtn.addEventListener("click", e => {
        //deleting element from dom
        this.transactions.addMoneyToWallet(el, this.actualPrice);
        tradeItem.parentNode.removeChild(tradeItem);
        //deleting obiect from array in (typeOfTrade)
        this.transactions.typeOfTrade.splice(i, 1);
        this.wallet.money = this.transactions.walletValue;
        this.money.textContent = this.wallet.money;
        this.removeTradeList();
        this.wallet.checkWalletStatus();
        this.renderingLevel();
      });
    });
    this.sellingForm.style.left = 50 + "%";
  };

  removeTradeList = () => {
    this.sellingForm.style.left = -50 + "%";
    this.listItems.innerHTML = "";
  };
}

const game = new Game(
  new Cities(),
  new Wallet(),
  new Prices(),
  new Transactions()
);
game.buyHandler();
game.sellHandler();
