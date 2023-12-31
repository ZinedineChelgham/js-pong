const SPEED = 0.02;

export default class Paddle {
  constructor(paddleElem, isHorizontal) {
    this.paddleElem = paddleElem;
    this.isHorizontal = isHorizontal || false;
    this.reset();
  }

  get position() {
    return parseFloat(
      getComputedStyle(this.paddleElem).getPropertyValue(
        this.isHorizontal ? "--paddle-x" : "--position"
      )
    );
  }

  set position(value) {
    this.paddleElem.style.setProperty(
      this.isHorizontal ? "--paddle-x" : "--position",
      value
    );
  }

  rect() {
    return this.paddleElem.getBoundingClientRect();
  }

  reset() {
    this.position = 50;
  }

  update(delta, ballHeight) {
    this.position += SPEED * delta * (ballHeight - this.position);
  }
}
