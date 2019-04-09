import * as React from 'react';
import { AIBulbList } from 'server/app/components/AiBulbList/AiBulbList';
import './App.css';
// import { LightBulbProps } from './components/LightBulb/LightBulb';
import LightBulbGrid from './components/LightBulbGrid/LightBulbGrid';

interface AppProps {
  readonly message?: string | undefined;
}

interface AppState {
  readonly bulbs: AIBulbList;
  readonly error: string | undefined;
}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      bulbs: {},
      error: '',
    };
  }

  public componentDidMount() {
    fetch('http://localhost:8000/bulbs/')
    .then(results => {
      return results.json();
    })
    .then((json: AIBulbList) => {
      if (json === undefined) {
        throw new Error('Could not retrieve bulb data');
      }
      this.setState({ bulbs: json })
    })
    .catch(err => {
      this.setState( { error: err });
    });
    
  }

  public render() {
    return (
      <div className="App">
        <LightBulbGrid bulbs={this.state.bulbs} />
      </div>
    );
  }

}

export default App;
