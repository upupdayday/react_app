import React from 'react';

class AddByObject extends React.Component {
    constructor(props){
        super(props);
        this.state = {count: 0};
        this.increment = this.increment.bind(this);
    }

    increment() {
        this.setState({
            count: this.state.count + 1
        });

        this.setState({
            count: this.state.count + 1
        });
    }

    render(){
        return (
                <div>
                    <button onClick={this.increment}>AddByObject</button>
                    <h2>{this.state.count}</h2>
                </div>
            );
    }
}

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
        return (
            <div>
                <button onClick={this.increment}>AddByFunction</button>
                <h2>{this.state.count}</h2>
            </div>
        );
    }
}

// function Counter(){
//     return (
//         <div >
//             <AddByFunction/>
//         </div>
//     );
// }

export default AddByFunction;