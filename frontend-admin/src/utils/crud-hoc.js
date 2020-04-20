import React from 'react';

const filterTypeToObject = filters => {
  const obj = {};
  for (const [key, value] of Object.entries(filters)) {
    obj[key] = value.type;
  }
  return obj;
};

export function widhFilters(WrappedComponent, filtersData) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      // this.handleChange = this.handleChange.bind(this);
      this.state = {
        filters: filterTypeToObject(filtersData)
      };
    }

    // componentDidMount() {
    //   // ... that takes care of the subscription...
    //   DataSource.addChangeListener(this.handleChange);
    // }

    // componentWillUnmount() {
    //   DataSource.removeChangeListener(this.handleChange);
    // }

    // handleChange() {
    //   this.setState({
    //     filters: filterTypeToObject(filtersData)
    //   });
    // }

    render() {
      // ... and renders the wrapped component with the fresh data!
      // Notice that we pass through any additional props
      return <WrappedComponent filters={this.state.filters} {...this.props} />;
    }
  };
}
