import * as React from 'react';
import { PowerState } from '../../../server/app/components/AiBulb/AiBulb';
import LightBulbIcon from './LightBulbIcon.png'

interface RGB {
  readonly r: number;
  readonly g: number;
  readonly b: number;
}
export interface LightBulbProps {
  readonly name: string;
  readonly topic?: string;
  readonly state: PowerState,
  readonly brightness: number,
  readonly white_value: number,
  readonly color_temp: number,
  readonly color: RGB,
  readonly gamma: boolean;
}

class LightBulb extends React.Component<LightBulbProps> {
  public render() {
    return (
      <div className="App">
        <table>
          <tr>
            <td><img src={LightBulbIcon} width="50" /></td>
            <td>
              <div>Name: {this.props.name}</div>
              <div>Power State: {this.props.state}</div>
              <div>Brightness: {this.props.brightness}</div>
              <div>white_value: {this.props.white_value}</div>
              <div>color_temp: {this.props.color_temp}</div>
              <div>color: {this.props.color.r}, {this.props.color.g}, {this.props.color.b}</div>
              <div>gamma: {this.props.gamma}</div>
            </td>
          </tr>
        </table>
      </div>
    );
  }
}

export default LightBulb;
