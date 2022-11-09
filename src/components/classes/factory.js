class Mode {
  constructor(mode) {
    this.mode = mode;
  }
}

class changeMode {
  change(mode) {
    if (mode === true) {
      return new Mode("day");
    }
    if (mode === false) {
      return new Mode("night");
    }
  }
}

// const factory = new changeMode();
// const day = factory.change(true);
// const night = factory.change(false);

// console.log(day);
// console.log(night);

export { Mode, changeMode };
