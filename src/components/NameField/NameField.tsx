import * as React from 'react';

interface NameFieldProps {
  readonly name?: string | undefined;
  onChange(event: React.FormEvent<HTMLFormElement>): void;
}

interface NameFieldState {
  readonly name: string | undefined;
}

class NameField extends React.Component<NameFieldProps, NameFieldState> {
  constructor(props: NameFieldProps) {
    super(props);
    this.state = { name: '' }
    this.handleChange = this.handleChange.bind(this);
  }

  public render() {
    return (
      <div className="App">
        <form onSubmit={this.props.onChange}>
          <input type="text" onChange={this.handleChange} />
        </form>

      </div>
    );
  }

  private handleChange(event: React.FormEvent<HTMLInputElement>) {
    this.setState({ name: event.currentTarget.value });
  }
}

export default NameField;
