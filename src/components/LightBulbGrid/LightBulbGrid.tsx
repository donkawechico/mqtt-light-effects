import * as React from 'react';
import { AIBulbList } from 'server/app/components/AiBulbList/AiBulbList';
import LightBulb from '../LightBulb/LightBulb';

interface LightBulbGridProps {
  readonly bulbs: AIBulbList;
}

class LightBulbGrid extends React.Component<LightBulbGridProps> {
  public render() {
    const { bulbs } = this.props;

    const renderedBulbs = Object.keys(bulbs).map(bulbTopic => {
      const bulb = bulbs[bulbTopic];

      return <td key={bulb.name}>
        <LightBulb
            name={bulb.name}
            brightness={bulb.state.brightness}
            state={bulb.state.power}
            white_value={bulb.state.white_value}
            color_temp={bulb.state.color_temp}
            color={bulb.state.color}
            gamma={bulb.state.gamma}
          />
      </td>
    });

    return (
      <div className="App">
        <table>
          <tbody>
            <tr>{renderedBulbs}</tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default LightBulbGrid;
