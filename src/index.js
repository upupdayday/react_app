import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
//import AddByFunction from'./counter'
import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));
// ReactDOM.render(
//     <h1>Hello, world!</h1>,
//     document.getElementById('root')
// );
//
function plusone(cc, props){
    console.log(cc);
    return{count: cc.count + 1};
}

class AddByFunction extends React.Component {
    constructor(props){
        super(props);
        this.state = {count: 0};
        this.increment = this.increment.bind(this);
    }

    increment() {
        this.setState(plusone);
        this.setState(plusone);

    }

    render(){
        console.log('cc');
        return (
            <div>
                <button onClick={this.increment}>AddByFunction</button>
                <h2>Result:{this.state.count}</h2>
            </div>
        );
    }
}
ReactDOM.render(
    <AddByFunction />,
    document.getElementById('root')
);

// ReactDOM.render(
//     /*<h1>Hello, world!</h1>,*/
//     <AddByFunction />,
//     document.getElementById('root')
// );

// ReactDOM.render(
//     /*<h1>Hello, world!</h1>,*/
//     <Counter />,
//     document.getElementById('root')
// );



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
