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
    this.sellingPrice = document.querySelector(".selling-form .selling-price");
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
    //header
    this.header = document.querySelector(".header");
    this.headerTitle = document.querySelector(".header .title");
    this.headerWalletP = [...document.querySelectorAll(".wallet p")];
    this.headerWalletSpan = [...document.querySelectorAll(".wallet span")];
  }

  showStateAlert = () => {
    const stateAlert = document.createElement("div");
    stateAlert.textContent = "Nie posiadasz stanu!";
    stateAlert.classList.add("alert-active");
    document.body.appendChild(stateAlert);
    setTimeout(() => {
      stateAlert.parentNode.removeChild(stateAlert);
    }, 600);
  };

  showTransAlert = message => {
    const transAlert = document.createElement("div");
    transAlert.textContent = message;
    transAlert.classList.add("alert-active");
    document.body.appendChild(transAlert);
    setTimeout(() => {
      transAlert.parentNode.removeChild(transAlert);
    }, 600);
  };

  showRules = () => {
    this.rules.classList.add("active");
    this.closeRulesBtn.addEventListener("click", () => {
      this.rules.classList.remove("active");
    });
  };

  formatNumber = num => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
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
    this.wallet.checkWalletStatus(this.showTransAlert);
    //changing cities
    const slide = () => {
      this.cityImg.classList.add("active");
      this.cityName.classList.add("active");
      setTimeout(() => {
        this.cityImg.classList.remove("active");
        this.cityName.classList.remove("active");
      }, 200);
    };
    slide();
    this.cities.changeCity();
    const actualCity = this.cities._cities[this.cities.cityCounter];
    //changing cities images
    const actualImg = this.cities._citiesImages[this.cities.cityCounter];
    this.cityImg.src = actualImg;
    this.cityName.textContent = actualCity;
    // this.cityImga.src = "img/" + ActiveXObject;
    //rendering actual money to dom
    this.money.textContent = this.formatNumber(this.wallet.money);
    //rendering rndom prices to dom
    this.goldPrice.textContent = this.formatNumber(
      this.prices.allRandomPrices[0]
    );
    this.petroleumPrice.textContent = this.formatNumber(
      this.prices.allRandomPrices[1]
    );
    this.housePrice.textContent = this.formatNumber(
      this.prices.allRandomPrices[2]
    );
    this.carPrice.textContent = this.formatNumber(
      this.prices.allRandomPrices[3]
    );
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
    this.transactions.checkValueOfBuying(this.showTransAlert);
    this.removeBuyingForm();
    this.input.value = "";
    //protection against entering too much money
    if (this.transactions.amount > 0) {
      this.wallet.money -= this.transactions.amount;
    }
    this.money.textContent = this.formatNumber(this.wallet.money);
    this.transactions.amount = 0;
  };

  sellHandler = () => {
    this.sellHandlers.forEach((handler, i) => {
      handler.addEventListener("click", () => {
        this.removeTradeList();
        this.actualPrice = this.prices.allRandomPrices[i];

        this.transactions.checkTradeList(
          i,
          this.generateTradeList,
          this.showStateAlert
        );

        this.text.textContent = this.transactions.name;
        this.sellingPrice.textContent = this.formatNumber(
          this.prices.allRandomPrices[i]
        );
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
      tradeItem.textContent = `Cena zakupu: ${this.formatNumber(
        el.price
      )} Ilość:  ${el.quantity}`;
      tradeItem.appendChild(tradeItemSellBtn);
      this.listItems.appendChild(tradeItem);
      tradeItemSellBtn.addEventListener("click", e => {
        //deleting element from dom
        this.transactions.addMoneyToWallet(el, this.actualPrice);
        tradeItem.parentNode.removeChild(tradeItem);
        //deleting obiect from array in (typeOfTrade)
        this.transactions.typeOfTrade.splice(i, 1);
        this.wallet.money = this.transactions.walletValue;
        this.money.textContent = this.formatNumber(this.wallet.money);
        this.removeTradeList();
        this.wallet.checkWalletStatus(this.showTransAlert);
        this.renderingLevel();
      });
    });
    this.sellingForm.style.bottom = 0;
    this.header.style.background = `rgb(250, 134, 66)`;
    this.headerTitle.style.color = `rgb(255, 255, 255)`;
    this.headerWalletP[0].style.color = `rgb(255, 255, 255)`;
    this.headerWalletP[1].style.color = `rgb(255, 255, 255)`;
    this.headerWalletSpan[0].style.color = `rgb(255, 255, 255)`;
    this.headerWalletSpan[1].style.color = `rgb(255, 255, 255)`;
  };

  removeTradeList = () => {
    this.sellingForm.style.bottom = -100 + "vh";
    this.listItems.innerHTML = "";
    this.header.style.background = `rgb(255, 255, 255)`;
    this.headerTitle.style.color = `gray`;
    this.headerWalletP[0].style.color = `black`;
    this.headerWalletP[1].style.color = `black`;
    this.headerWalletSpan[0].style.color = `rgb(250, 134, 66)`;
    this.headerWalletSpan[1].style.color = `rgb(250, 134, 66)`;
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
