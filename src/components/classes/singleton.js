let instance;

class ThemeCounter {
  constructor() {
    if (!instance) instance = this;
    instance.img =
      "https://thumb.cloud.mail.ru/weblink/thumb/xw1/JvfR/CvFdvZq55";
    return instance;
  }
  getTheme() {
    return instance.img;
  }
  setTheme(URL) {
    return (instance.img = URL);
  }
}

export { ThemeCounter, instance };
