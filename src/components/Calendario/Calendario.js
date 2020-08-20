import './input-moment.min.css';
import React, { Component } from 'react';
import moment from 'moment';
import { BigInputMoment } from 'react-input-moment';
import './pt-br';


export default class Calendario extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputMoment: moment(),
      bigInputMoment: moment(),
      datePickerMoment: moment(),
      datePickerRangeStartMoment: moment().subtract(3, 'days'),
      datePickerRangeEndMoment: moment(),
      timePickerMoment: moment(),
      showSeconds: false,
      locale: moment.locale('pt-br'),
      size: 'medium'
    };
  }

  render() {
    let { bigInputMoment, showSeconds, locale, size } = this.state;
    let wrapperClass = 'wrapper ' + size;

    //console.log(bigInputMoment.format('llll'));

    return (
      <div className="app">
        <div className="header">Agendamento de entrega</div>
        <input
          name="agenda"
          className="output"
          type="text"
          value={bigInputMoment.format('llll')}
          readOnly
        />

        <div className={wrapperClass}>
          <BigInputMoment
            moment={bigInputMoment}
            locale={locale}
            showSeconds={showSeconds}
            onChange={mom => this.setState({ bigInputMoment: mom })}
          />
        </div>
        <br />
      </div>
    );
  }

  handleShowSeconds(e) {
    this.setState({ showSeconds: e.target.checked });
  }

  handleLocale(e) {
    this.setState({ locale: e.target.value });
  }
}
