export const randomIntRange = (min = 1, max = 100) =>
  Math.floor(Math.random() * (max + 1 - min) + min)

export const radiansToDegrees = rad => (rad * 180.0) / Math.PI;

export const getPythagorean = (a, b) => Math.sqrt(a * a + b * b)

export const getAngleBetweenPoints = (
  {x: x1, y: y1},
  {x: x2, y: y2}
) => Math.atan2((y2 - y1), (x2 - x1))


export const getVelocityMagnitude = (entity) => getPythagorean(entity.speedX, entity.speedY)

export const getVelocityAngle = (entity) => {
  return getAngleBetweenPoints(
    { x: 0, y: 0 },
    { x: entity.speedX, y: entity.speedY }
  )
}

export default {
  randomIntRange,
  radiansToDegrees,
  getPythagorean,
  getAngleBetweenPoints,
  getVelocityMagnitude,
  getVelocityAngle,
}
