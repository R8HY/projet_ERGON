import React, { Component } from 'react';
import Calendar from 'react-calendar'; // Importez la bibliothèque de calendrier que vous avez choisie

class MyCalendar extends Component {
  render() {
    return (
      <div>
        <h2>Calendrier</h2>
        <Calendar />
      </div>
    );
  }
}

export default MyCalendar;
