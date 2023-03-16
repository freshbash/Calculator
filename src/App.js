import React from 'react';
import './App.css';


function Key(props) {
  return (
    <div id={props.id + "Div"}>
      <button id={props.id} onClick={props.method}>{props.name}</button>
    </div>
  )
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expr: '',
      ans: 0,
      evaluated: false
    };
    this.addOperator = this.addOperator.bind(this);
    this.evaluate = this.evaluate.bind(this);
    this.addNumber = this.addNumber.bind(this);
    this.decimal = this.decimal.bind(this);
    this.allClear = this.allClear.bind(this);
  }

  addOperator(opr) {

    if (!isNaN(parseInt(this.state.expr[this.state.expr.length - 1])) || (this.state.expr[this.state.expr.length - 1] === '.')) {
      console.log(this.state.expr[this.state.expr.length - 1]);
      console.log("condition 1")
      this.setState({
        expr: this.state.expr + opr
      });
    } else {
      if (opr === '-') {
        console.log(this.state.expr[this.state.expr.length - 1]);
        console.log("condition 2 sub 1");
        this.setState({
          expr: this.state.expr + opr
        });
      } else {
        console.log(this.state.expr[this.state.expr.length - 1]);
        console.log("condition 2 sub 2");
        this.setState({
          expr: this.state.expr.slice(0, this.state.expr.length - 1) + opr
        })
      }
    }
  }

  addNumber(num) {
    if ((num === 0 && this.state.expr !== '0') || num !== 0){
      this.setState(
      {expr: this.state.expr + num}
      );
    }    
  }
  decimal() {
    
  }

  allClear() {
    this.setState({
      expr: '',
      ans: 0,
      evaluated: false
    });
  }

  evaluate() {}


  render() {
    return (

      <div id="calculator">
        <div id="display">
          <div id="display1">{this.state.expr}</div>
          <div id="display2">{this.state.ans}</div>
        </div>
        <div id="keypad">
          <Key id="clear" method={this.allClear} name="AC" />
          <Key id="divide" method={() => this.addOperator('/')} name="/" />
          <Key id="multiply" method={() => this.addOperator('*')} name="*" />
          <Key id="one" method={() => this.addNumber(1)} name="1" />
          <Key id="two" method={() => this.addNumber(2)} name="2" />
          <Key id="three" method={() => this.addNumber(3)} name="3" />
          <Key id="subtract" method={() => this.addOperator('-')} name="-" />
          <Key id="four" method={() => this.addNumber(4)} name="4" />
          <Key id="five" method={() => this.addNumber(5)} name="5" />
          <Key id="six" method={() => this.addNumber(6)} name="6" />
          <Key id="add" method={() => this.addOperator('+')} name="+" />
          <Key id="seven" method={() => this.addNumber(7)} name="7" />
          <Key id="eight" method={() => this.addNumber(8)} name="8" />
          <Key id="nine" method={() => this.addNumber(9)} name="9" />
          <Key id="decimal" method={this.decimal} name="." />
          <Key id="zero" method={() => this.addNumber(0)} name="0" />
          <Key id="equals" method={this.equals} name="=" />
        </div>
      </div>

    )
  }


}

export default Calculator;
