class Prices {
  constructor() {
    this.allRandomPrices = [
      (this._gold = 500),
      (this._petroleum = 5000),
      (this._house = 50000),
      (this._car = 15000)
    ];
  }

  generateRandomPrice = () => {
    const goldPrice = Math.floor(Math.random() * (1000 - 250) + 250);
    const petroleumPrice = Math.floor(Math.random() * (10000 - 2500) + 2500);
    const housePrice = Math.floor(Math.random() * (100000 - 25000) + 25000);
    const carPrice = Math.floor(Math.random() * (25000 - 10000) + 10000);
    this.allRandomPrices[0] = goldPrice;
    this.allRandomPrices[1] = petroleumPrice;
    this.allRandomPrices[2] = housePrice;
    this.allRandomPrices[3] = carPrice;
  };
}
