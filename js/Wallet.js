class Wallet {
  constructor() {
    this.money = 10000;
    this._debt = 10000;
    this.level = 0;
    this.showChangingLevel = true;
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

  checkWalletStatus = showAlert => {
    if (this.money === 0) {
      showAlert("Przegrałeś!");
      this.money = 10000;
    } else if (
      this.money >= 50000 &&
      this.money < 100000 &&
      this.showChangingLevel === true
    ) {
      this.level = 1;
      showAlert("Awansowałeś! Wchodzisz na Giełdę!");
      this.showChangingLevel = false;
      console.log(this.showChangingLevel);
    } else if (
      this.money >= 100000 &&
      this.money < 500000 &&
      this.showChangingLevel === false
    ) {
      this.level = 2;
      showAlert("Awansowałeś na Bankiera!");
      this.showChangingLevel = true;
    } else if (
      this.money >= 500000 &&
      this.money < 1000000 &&
      this.showChangingLevel === true
    ) {
      this.level = 3;
      showAlert("Pół miliona za Tobą!!");
      this.showChangingLevel = false;
    } else if (this.money >= 1000000 && this.showChangingLevel === false) {
      this.level = 4;
      showAlert("Jesteś milionerem!");
      this.showChangingLevel = true;
    }
  };
}
