class Cities {
  constructor() {
    this._cities = ["Londyn", "Nowy Jork", "Krynica - Zdrój", "Moskwa"];
    this._citiesImages = [
      "/img/london.jpg",
      "/img/newyork.jpg",
      "/img/krynica.jpg",
      "/img/moscow.jpg"
    ];
    this.cityCounter = 0;
  }

  changeCity = () => {
    this.cityCounter++;
    if (
      this.cityCounter === this._cities.length ||
      this.cityCounter === this._citiesImages.length
    ) {
      this.cityCounter = 0;
    }
  };
}
