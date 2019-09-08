function getBorderULUState(inputs) {
  return (inputs[0] * 1) + (inputs[1] * -.3) + (inputs[2] * -.3);
}

const comportamientos = {
  move: function (mode, sensores, robot) {
    console.log(sensores);
    const
      north = getBorderULUState([sensores[1], sensores[2], sensores[3]]),
      east = getBorderULUState([sensores[3], sensores[4], sensores[5]]),
      south = getBorderULUState([sensores[5], sensores[6], sensores[7]]),
      west = getBorderULUState([sensores[7], sensores[0], sensores[1]]);
    if (north > 0.5) {
      return { coordX: robot.coordX - 1, coordY: robot.coordY }
    } else if (east > 0.5) {
      return { coordX: robot.coordX, coordY: robot.coordY + 1 }
    } else if (south > 0.5) {
      return { coordX: robot.coordX + 1, coordY: robot.coordY }
    } else if (west > 0.5) {
      return { coordX: robot.coordX, coordY: robot.coordY - 1 }
    } else {
      return robot;
    }
  }
}

export default comportamientos
