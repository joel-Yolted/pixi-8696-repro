import { Application, Container, ParticleContainer, Sprite, Texture } from "pixi.js";
import { MotionBlurFilter } from "@pixi/filter-motion-blur";

export class Particles extends ParticleContainer {
  constructor() {
    super();
  }
  spawn() {
    let particles = new Sprite(Texture.from('assets/game/star.png'));
    this.addChild(particles);
  }
}

export class Game {

  constructor() {

    let application = new Application({
      // causes a 20fps performance drop on big screens, however, Native graphics elements tends to become Pixilated with out it. FXAA might help
      antialias: false,
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: 0x000000,
      autoDensity: true
    });
    document
      .getElementById("game-container")!
      .appendChild(application.view);

    let mainContainer = new Container();
    application.stage.addChild(mainContainer)

    let blurFilter = new MotionBlurFilter([0, 30], 15);
    let firstwithfilter = new Sprite(Texture.from('assets/game/star.png'));
    firstwithfilter.filters = [blurFilter]
    application.stage.addChild(firstwithfilter)

    let particles = new Particles()
    mainContainer.addChild(particles)

    setTimeout(() => {

      particles.spawn();
    }, 2000)

  }
}
new Game();

