import Block from "./block";

export default class Coconut extends Block {
  constructor(image) {
    super(0, 600, 32, 32);
    this.coconut = image;
  }

  draw(context, OffsetX) {
    context.drawImage(this.coconut, this.x, this.y, this.width, this.height);
  }
}

// export default class Coconut {
//   constructor(offsetX) {
//     this.position = {
//       x: offsetX,
//       y: 0
//     };
//     this.velocity = {
//       x: -1,
//       y: 0
//     };
//     this.jumping = false;
//   }

//   jump() {
//     if (this.jumping) return;

//     this.velocity.y = 100;
//     this.jumping = true;
//   }

//   next(physics) {
//     physics.apply(this);

//     if (this.position.y === 0) {
//       this.jumping = false;
//     }
//   }

//   draw(groundOffsetX, context) {
//     context.fillStyle = "#da0";
//     context.fillRect(
//       60 + (groundOffsetX - this.position.x),
//       600 - 32 - this.position.y,
//       32,
//       32
//     );
//   }
// }
