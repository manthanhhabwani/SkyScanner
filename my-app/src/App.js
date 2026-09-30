import React, { Component } from 'react';
import BpkButton from '@skyscanner/backpack-web/bpk-component-button';
import BpkText from '@skyscanner/backpack-web/bpk-component-text';
import Calendar, { CALENDAR_SELECTION_TYPE } from '@skyscanner/backpack-web/bpk-component-calendar';
import { format } from 'date-fns';
import { cssModules } from '@skyscanner/backpack-web/bpk-react-utils';

import STYLES from './App.scss';

const getClassName = cssModules(STYLES);

const formatDateFull = (date) =>
  date ? (date.toLocaleDateString ? date.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) : String(date)) : '';

const formatMonth = (date) =>
  date ? (date.toLocaleDateString ? date.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' }) : String(date)) : '';

const daysOfWeek = [
  { name: 'Sunday', nameAbbr: 'Sun', index: 0, isWeekend: true },
  { name: 'Monday', nameAbbr: 'Mon', index: 1, isWeekend: false },
  { name: 'Tuesday', nameAbbr: 'Tue', index: 2, isWeekend: false },
  { name: 'Wednesday', nameAbbr: 'Wed', index: 3, isWeekend: false },
  { name: 'Thursday', nameAbbr: 'Thu', index: 4, isWeekend: false },
  { name: 'Friday', nameAbbr: 'Fri', index: 5, isWeekend: false },
  { name: 'Saturday', nameAbbr: 'Sat', index: 6, isWeekend: true },
];

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      selectionConfiguration: {
        type: CALENDAR_SELECTION_TYPE.single,
        date: new Date(),
      },
    };
  }

  handleDateSelect = (date) => {
    this.setState({
      selectionConfiguration: {
        type: CALENDAR_SELECTION_TYPE.single,
        date,
      },
    });
  };

  render() {
    return (
      <div className={getClassName('App')}>
        <header className={getClassName('App__header')}>
          <div className={getClassName('App__header-inner')}>
            <BpkText tagName="h1" textStyle="xxl" className={getClassName('App__heading')}>
              Flight Schedule
            </BpkText>
          </div>
        </header>
        <main className={getClassName('App__main')}>
          <BpkText tagName="p" className={getClassName('App__text')}>
            Select your departure date:
          </BpkText>
          <Calendar
            id="calendar"
            onDateSelect={this.handleDateSelect}
            formatMonth={formatMonth}
            formatDateFull={formatDateFull}
            daysOfWeek={daysOfWeek}
            weekStartsOn={1}
            changeMonthLabel="Change month"
            previousMonthLabel="Previous month"
            nextMonthLabel="Next month"
            selectionConfiguration={this.state.selectionConfiguration}
          />
          <BpkButton onClick={() => alert('Flight date confirmed!')}>
            Continue
          </BpkButton>
        </main>
      </div>
    );
  }
}