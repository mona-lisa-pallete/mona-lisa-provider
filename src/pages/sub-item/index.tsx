import React from 'react';

class Index1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      aa: 11,
    };
  }

  componentDidMount() {
    this.setState({ aa: 22 });
  }

  render() {
    return <div>{this.state.aa}</div>;
  }
}

export default Index1;
