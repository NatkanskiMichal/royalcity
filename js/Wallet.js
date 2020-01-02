class Wallet {
  constructor() {
    this.money = 10000;
    this._debt = 10000;
    this.level = 0;
    this.levelName = [
      "Bazarowy Handlarz",
      "Giełdowy Handlarz",
      "Bankier",
      "Makler",
      "Bill Gates"
    ];
  }

  payForTravel = () => {
    this.money -= 500;
  };

  checkWalletStatus = () => {
    if (this.money === 0) {
      alert("Przegrałeś!");

      this.money = 10000;
    } else if (this.money >= 50000) {
      this.level = 1;
      alert("Awansowałeś! Wchodzisz na Giełdę!");
    } else if (this.money >= 200000) {
      this.level = 2;
      alert("Awansowałeś na Bankiera!");
    } else if (this.money >= 1000000) {
      this.level = 3;
      alert("Jesteś Milionerem!");
    } else if (this.money >= 5000000) {
      this.level = 4;
      alert("Przejmujesz Microsoft!");
    }
  };
}
