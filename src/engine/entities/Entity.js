class Entity {
  constructor({
    canvasContext,
    id, name,
  } = {}) {
    if (!canvasContext) throw new Error('Entity did not recieve canvasContext')
    this.canvasContext = canvasContext
    this.id = id
    this.name = (name || this.constructor.name) + this.id
    this.createdDate = new Date()
  }
}

export default Entity