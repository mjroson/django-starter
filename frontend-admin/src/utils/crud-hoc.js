import React from 'react';

const filterTypeToObject = filters => {
  const obj = {};
  for (const [key, value] of Object.entries(filters)) {
    obj[key] = value.type;
  }
  return obj;
};

export function widhFilters(WrappedComponent, filtersData) {
  // eslint-disable-next-line react/display-name
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        filters: filterTypeToObject(filtersData)
      };
    }

    render() {
      return <WrappedComponent filters={this.state.filters} {...this.props} />;
    }
  };
}
