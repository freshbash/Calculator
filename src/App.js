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
      ans: '0',
      evaluated: false
    };
    //Bind
    this.addOperator = this.addOperator.bind(this);
    this.evaluate = this.evaluate.bind(this);
    this.addNumber = this.addNumber.bind(this);
    this.decimal = this.decimal.bind(this);
    this.allClear = this.allClear.bind(this);
  }

  //Adds operators to the expression
  addOperator(opr) {

    if (this.state.evaluated) {
      const expr = this.state.ans[0] === '-' ? '0' + this.state.ans : this.state.ans;
      this.setState({
        expr: expr + opr,
        ans: opr,
        evaluated: false
      })
    }
    else {

      //Variable to store whatever gets appended to expr.
      let final = '';

      //Get whatever is in ans field
      const data = this.state.ans;

      if (!isNaN(parseFloat(data))) {
        final = this.state.expr + parseFloat(data) + opr;
      }
      else {
        const secondLast = this.state.expr.length >= 2 ? this.state.expr[this.state.expr.length - 2] : null;
        if (opr === "-") {
          if(data === "-") {
            if (!isNaN(parseFloat(secondLast))) {
              final = this.state.expr + opr;
            }
            else {
              final = this.state.expr;
            }
          }
          else {
            final = this.state.expr + opr;
          }
        }
        else {
          if (data === "-") {          
            if (secondLast === '+' || secondLast === "-" || secondLast === "*" || secondLast === "/") {
              final = this.state.expr.slice(0, this.state.expr.length - 2) + opr;
            }
            else {
              final = this.state.expr.slice(0, this.state.expr.length - 1) + opr;
            }
          }
          else {
            final = this.state.expr.slice(0, this.state.expr.length - 1) + opr;
          }
        }
      }

      this.setState({
        expr: final,
        ans: opr
      })
    }

    // //Get the last two characters in expr
    // const lastTwo = this.state.expr.slice(this.state.expr.length -2);

    // /*If the last two characters are any one of "+-", "--", "*-", "/-", then check
    // the operator to be added. If it is not '-', then replace the last two characters
    // with this new operator*/
    // if (lastTwo === "+-" || lastTwo === "--" ||lastTwo === "*-" || lastTwo === "/-") {
    //   this.setState({
    //     expr: this.state.expr.slice(0, this.state.expr.length - 2) + opr
    //   });
    // }
    // /*If the last character is a number or a decimal append the current operator behind it*/
    // else if (!isNaN(parseInt(this.state.expr[this.state.expr.length - 1])) || (this.state.expr[this.state.expr.length - 1] === '.')) {
    //   // console.log(this.state.expr[this.state.expr.length - 1]);
    //   // console.log("condition 1")
    //   this.setState({
    //     expr: this.state.expr + opr
    //   });
    // }
    // /*If the last character was another operator....*/
    // else {
    //   /*If current operator is a minus sign, append it*/
    //   if (opr === '-') {
    //     // console.log(this.state.expr[this.state.expr.length - 1]);
    //     // console.log("condition 2 sub 1");
    //     this.setState({
    //       expr: this.state.expr + opr
    //     });
    //   }
    //   /*Else replace the last operator with the new one*/
    //   else {
    //     // console.log(this.state.expr[this.state.expr.length - 1]);
    //     // console.log("condition 2 sub 2");
    //     this.setState({
    //       expr: this.state.expr.slice(0, this.state.expr.length - 1) + opr
    //     })
    //   }
    // }
  }

  //Adds a number to the expression
  addNumber(num) {
    if (this.state.evaluated) {
      this.setState({
        expr: '',
        ans: num,
        evaluated: false
      });
    }
    else {

      //Get the input in ans
      const input = this.state.ans;
      let newInput;

      if (input[input.length - 1] === '0' && input[input.length - 2] === '.') {
        if (num === 0) {
          newInput = input;
        }
        else {
          newInput = (parseFloat(input) + 0.1 * num).toString();
        }        
      }

      else if (parseInt(input) !== parseFloat(input) && !isNaN(input)) {
        const [whole, frac] = String(input).match(/(\d+)/g);
        console.log("Entered")
        console.log("whole:", whole, "frac:", frac);
        newInput = (parseFloat(whole) + (parseFloat(frac) * 10 + num) / (10 ** (frac.length + 1))).toString();
      }
      else if (isNaN(input)) {
        newInput = num;
      }
      else {
        newInput = ((parseFloat(input) * 10) + num).toString();
      }

      this.setState({
          ans: newInput
      });
    }
    // if ((num === 0 && this.state.ans !== '0') || num !== 0) {
    //   this.setState({
    //     ans: (this.state.ans * 10) + num
    //   });
    // }    
  }

  //Adds a decimal point to the expression
  decimal() {
    if (this.state.evaluated) {
      this.setState({
        expr: '',
        ans: "0.0",
        evaluated: false        
      })
    }
    else {

      const input = this.state.ans;
      let newInput = input;

      if (parseFloat(input) === parseInt(input) && /\./.test(input) === false) {
        console.log("block 1 entered");
        newInput = input + '.0';      
      }
      else if (input === '+' || input === '-' || input === '*' || input === '/') {
        console.log("block 2 entered");
        newInput = '0.0';
      }

      this.setState({
        ans: newInput
      });
    }
    // const lastChar = this.state.expr[this.state.expr.length - 1];

    // if (isNaN(parseInt(lastChar)) && (lastChar === '+' || lastChar === '-' || lastChar === '*' || lastChar === '/')) {
    //   this.setState({
    //     expr: this.state.expr + "0."
    //   })
    // }
    // else if (!isNaN(parseInt(lastChar))) {
    //   this.setState({
    //     expr: this.state.expr + '.'
    //   })
    // }
  }

  //Clears the state
  allClear() {
    this.setState({
      expr: '',
      ans: 0,
      evaluated: false
    });
  }

  //Evaluates the expression in the state
  evaluate() {

    if(this.state.evaluated === false) {
      const ans = this.state.ans;
      let expr = this.state.expr;

      if (!isNaN(parseFloat(ans))) {
        expr = expr + parseFloat(ans);
      }
      else {
        expr = expr.slice(0, expr.length - 1);
      }

      //Get the expression in the state    
      console.log("Stage 1A:", expr);


      //Check for consecutive operators

      let exprEval = expr;

      //Regex to identify consecutive operators

      const timesMinus = /\*-/g;
      const divideMinus = /\/-/g;
      const plusMinus = /\+-/g;
      const minusMinus = /--/g;

      //Replace:
      // *- with 'm',
      // /- with 'd',
      // +- with '-',
      // -- with '+'
      // If any of them are found in expr

      if (timesMinus.test(exprEval)) {
        exprEval = exprEval.replace(timesMinus, 'm');
      }

      if (divideMinus.test(exprEval)) {
        exprEval = exprEval.replace(divideMinus, 'd');
      }

      if (plusMinus.test(exprEval)) {
        exprEval = exprEval.replace(plusMinus, '-');
      }

      if (minusMinus.test(exprEval)) {
        exprEval = exprEval.replace(minusMinus, '+');
      }

      console.log("Stage 1B: ", exprEval);


      //Split expr with [+, -] as delimiters
      const multDivExpr = exprEval.split(/[+-]/g);

      //Get the [+,-] signs
      const addSubOpr = exprEval.match(/[+-]/g);

      console.log("Stage 2:", multDivExpr, addSubOpr);

      //Evaluate the multiplication and/or division expressions in multDivExpr
      const evaluatedMultDiv = [];

      for (let i = 0; i < multDivExpr.length; i++) {
        const oprPresence = multDivExpr[i].match(/[*/md]/g);
        const numsI = multDivExpr[i].split(/[*/md]/g);
        let subResult;
        if (oprPresence === null) {
          subResult = parseFloat(multDivExpr[i]);
        }
        else {
          if (oprPresence[0] === '*') {
            subResult = parseFloat(numsI[0]) * parseFloat(numsI[1]);          
          }
          else if (oprPresence[0] === 'm') {
            subResult = parseFloat(numsI[0]) * (-1) * parseFloat(numsI[1]);
          }
          else if (oprPresence[0] === "d") {
            subResult = parseFloat(numsI[0]) / ((-1) * parseFloat(numsI[1]));
          }
          else {
            subResult = parseFloat(numsI[0]) / parseFloat(numsI[1]);
          }
          oprPresence.shift();
          numsI.shift();
          numsI.shift();

          while(oprPresence.length > 0) {
            if (oprPresence[0] === '*') {
              subResult = subResult * parseFloat(numsI[0]);
            }
            else if (oprPresence[0] === 'm') {
              subResult = subResult * (-1) * parseFloat(numsI[0]);
            }
            else if (oprPresence[0] === 'd') {
              subResult = subResult / ((-1) * parseFloat(numsI[0]));
            }
            else {
              subResult = subResult / parseFloat(numsI[0]);
            }
            oprPresence.shift();
            numsI.shift();
          }        
        }
        evaluatedMultDiv.push(subResult);
      }

      console.log("Stage 3:", evaluatedMultDiv);

      let result;

      if (addSubOpr === null) {
        result = evaluatedMultDiv[0];
      }
      else {
        if (addSubOpr[0] === '+') {
          result = evaluatedMultDiv[0] + evaluatedMultDiv[1];
        }
        else {
          result = evaluatedMultDiv[0] - evaluatedMultDiv[1];
        }
        addSubOpr.shift();
        evaluatedMultDiv.shift();
        evaluatedMultDiv.shift();

        while (addSubOpr.length > 0) {
          if (addSubOpr[0] === '+') {
            result = result + evaluatedMultDiv[0];
          }
          else {
            result = result - evaluatedMultDiv[0];
          }
          addSubOpr.shift();
          evaluatedMultDiv.shift();
        }  
      }

      result = result.toString();

      console.log("Stage 4:", result);

      // let decimalResult;
      // let precisionLength;

      // if(/\./.test(result)) {
      //   const [int, frac] = result.split(/\./);
      //   precisionLength = int.length + frac.length;
      // }
      // else {
      //   precisionLength = result.length + 1;
      // }

      // decimalResult = parseFloat(result).toPrecision(precisionLength).toString();

      
      this.setState({
        expr: expr,
        ans: result,
        evaluated: true
      })
    }
  }


  render() {
    return (

      <div id="calculator">
        <div id="model">Calc - 100</div>
        <div id="screen">
          <div id="formula">{this.state.expr}</div>
          <div id="display">{this.state.ans}</div>
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
          <Key id="equals" method={this.evaluate} name="=" />
        </div>
      </div>

    )
  }


}

export default Calculator;
