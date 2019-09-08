import React, { Component } from 'react'
import Actions from './comportamiento.js'
import styled from 'styled-components';
import './App.css'

const DivCell = styled.div`
  width: 45px;
  height: 45px;
  border: solid;
  background-color: ${({ isObstacle }) => isObstacle ? '#FFF' : '#0A0A0A'};
`;

const Robot = styled.div`
  border-bottom-left-radius: 100%;
  border-bottom-right-radius: 100%;
  border-top-left-radius: 100%;
  border-top-right-radius: 100%;
  background-color: red;
  width: 20px;
  height: 20px;
  padding: 50%;
`;

class App extends Component {
  constructor(props) {
    super(props);
    const espacio = []
    for (let i = 0; i < 17; i++) {
      let arr = []
      for (let j = 0; j < 17; j++) {
        arr.push(true)
      }
      espacio.push(JSON.parse(JSON.stringify(arr)))
    }
    for (let i = 0; i < 17; i++) {
      espacio[0][i] = false
      espacio[16][i] = false
      espacio[i][0] = false
      espacio[i][16] = false
    }
    espacio[5][5] = false
    this.state = {
      espacio,
      robot: {
        coordX: 4,
        coordY: 4,
      },
      robot2: {
        coordX: 1,
        coordY: 1,
      },
      mode: 'follow'
    };
  }

  componentDidMount() {
    setInterval(this.moveRobots, 1500)
  }

  setObstacle = (i, j) => {
    const { espacio } = this.state;
    if (i >= 1 && i <= 15 && j >= 1 && j <= 15) {
      espacio[i][j] = !espacio[i][j];
      this.setState({ espacio });
    }
  }

  cleanSpace = () => {
    const { espacio } = this.state;
    for (let i = 1; i < 16; i++) {
      for (let j = 1; j < 16; j++) {
        espacio[i][j] = true
      }
    }

    this.setState({ espacio });
  }

  changeMode = () => {
    const { robot, espacio } = this.state;
    if (this.state.mode === 'cage') {
      espacio[5][5] = false
      robot.coordX = 4
      robot.coordY = 4
      this.setState({ espacio, robot, mode: 'follow' });
    } else {
      let coords = {
        coordX: 1,
        coordY: 1
      }
      this.cleanSpace()
      this.setState({ robot: coords, mode: 'cage' })
    }
  }

  setCage = () => {
    let coords = {
      coordX: 1,
      coordY: 1
    }
    this.cleanSpace()
    this.setState({ robot: coords, mode: 'cage' })
  }

  moveRobots = () => {
    const {
      espacio,
      mode,
      robot,
      robot2
    } = this.state;


    const sens = [];
    const sens2 = [];

    sens.push(espacio[robot.coordX - 1][robot.coordY - 1] ? 1 : 0);
    sens.push(espacio[robot.coordX - 1][robot.coordY] ? 1 : 0);
    sens.push(espacio[robot.coordX - 1][robot.coordY + 1] ? 1 : 0);
    sens.push(espacio[robot.coordX][robot.coordY + 1] ? 1 : 0);
    sens.push(espacio[robot.coordX + 1][robot.coordY + 1] ? 1 : 0);
    sens.push(espacio[robot.coordX + 1][robot.coordY] ? 1 : 0);
    sens.push(espacio[robot.coordX + 1][robot.coordY - 1] ? 1 : 0);
    sens.push(espacio[robot.coordX][robot.coordY - 1] ? 1 : 0);

    sens2.push(espacio[robot2.coordX - 1][robot2.coordY - 1] ? 1 : 0);
    sens2.push(espacio[robot2.coordX - 1][robot2.coordY] ? 1 : 0);
    sens2.push(espacio[robot2.coordX - 1][robot2.coordY + 1] ? 1 : 0);
    sens2.push(espacio[robot2.coordX][robot2.coordY + 1] ? 1 : 0);
    sens2.push(espacio[robot2.coordX + 1][robot2.coordY + 1] ? 1 : 0);
    sens2.push(espacio[robot2.coordX + 1][robot2.coordY] ? 1 : 0);
    sens2.push(espacio[robot2.coordX + 1][robot2.coordY - 1] ? 1 : 0);
    sens2.push(espacio[robot2.coordX][robot2.coordY - 1] ? 1 : 0);

    const newCoordsRobot = Actions.move(mode, sens, robot);
    const newCoordsRobot2 = Actions.move(mode, sens2, robot2);
    this.setState({ robot: newCoordsRobot, robot2: newCoordsRobot2 });
  }
  render() {
    const { espacio } = this.state;
    return (
      <div className='container-fluid'>
        <table>
          <tbody>
            {espacio.map((row, currentX) => {
              return (
                <tr key={`currentRow-${currentX}`}>
                  {row.map((item, currentY) => {
                    return (
                      <td>
                        <DivCell key={`CurrentCell-${currentX}-${currentY}`} className='center-block text-center' onClick={this.setObstacle.bind(this, currentX, currentY)} isObstacle={espacio[currentX][currentY]}>
                          {this.state.robot.coordX === currentX && this.state.robot.coordY === currentY ? <Robot /> : null}
                          {this.state.robot2.coordX === currentX && this.state.robot2.coordY === currentY ? <Robot /> : null}
                        </DivCell>
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
}

export default App
