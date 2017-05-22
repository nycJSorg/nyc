import React from 'react';
import styled from 'styled-components';

import addWeeks from 'date-fns/add_weeks';
import startOfWeek from 'date-fns/start_of_week';
import endOfWeek from 'date-fns/end_of_week';
import eachDay from 'date-fns/each_day';

import Calendar from './Calendar';

const Container = styled.div`
  flex-direction: column;
`;

class Events extends React.Component {

  state = {
    loading: true,
    events: []
  };

  constructor() {
    super();

    const start = startOfWeek(new Date());
    const end = endOfWeek(addWeeks(start, 7));

    this.dateRange = eachDay(start, end);
  }

  componentDidMount() {
    const query = {
      'content_type': 'event'
    };

    window.client.getEntries(query)
      .then(response => this.setState({
        events: response.items,
        loading: false
      }));

    window.ga('set', 'page', '/events');
    window.ga('send', 'pageview');
  }

  render() {
    return (
      <Container>
        <h2>There is always something going on</h2>

        <Calendar dateRange={this.dateRange} events={this.state.events}/>
      </Container>
    );
  }
}

export default Events;