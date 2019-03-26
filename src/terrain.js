export default class Terrain {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

export class World {
  constructor(terrains) {
    this.terrains = terrains;
  }

  draw(startX, context) {
    context.strokeStyle = '#000';
    const firstTerrainIndex = this.terrains.findIndex(t = t.x >= startX);
    context.beginPath();
    context.moveTo(startX, this.terrains[firstTerrainIndex].y)
    for(let index = firstTerrainIndex + 1; index <= firstTerrainIndex + 10; index += 1) {
      const terrain = this.terrains[index];
      context.lineTo(terrain.x, terrain.y)
    }
    context.stroke();
  }
}