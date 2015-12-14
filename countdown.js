var Unit = React.createClass({
    render: function() {
        return (
            <div className="unit">{this.props.name}</div>
        )
    }
});

var Count = React.createClass({
    render: function() {
        return (
            <div className="count">{this.props.count}</div>
        )
    }
});

var CountSection = React.createClass({
    render: function() {
        return (
            <div className="col-quarter">
                <Count count={this.props.count} />
                <Unit name={this.props.unit} />
            </div>
        )
    }
});

var DateDisplay = React.createClass({
    render: function() {
        var twelve = this.props.hour >= 12 ? "PM" : "AM"
        var hour = this.props.hour == 0 ? 12 : this.props.hour % 12
        var second = this.props.second == 0 ? "00" : this.props.second
        var time = hour + this.props.minute + this.props.second == 0 ? "":
            <span>at {hour}:{this.props.minute}:{second} {twelve}</span>
        var month = [];
        month[0] = "January";
        month[1] = "February";
        month[2] = "March";
        month[3] = "April";
        month[4] = "May";
        month[5] = "June";
        month[6] = "July";
        month[7] = "August";
        month[8] = "September";
        month[9] = "October";
        month[10] = "November";
        month[11] = "December";
        return (
            <div className="date">
                <span>{month[this.props.month]} {this.props.day}, {this.props.year}</span> {time}
            </div>
        )
    }
})

var Counter = React.createClass({
    updateTime: function() {
        var diff = timeTill(this.props.year, this.props.month, this.props.day, this.props.hour, this.props.minute, this.props.second);
        this.setState({dayCount: daysTill(diff), hourCount: hoursTill(diff), minuteCount: minsTill(diff), secondCount: secsTill(diff)})
    },
    getInitialState: function() {
        return {dayCount: 0, hourCount: 0, minuteCount: 0, secondCount: 0}
    },
    componentDidMount: function() {
        setInterval(this.updateTime, this.props.pollInterval);
    },
    render: function() {
        var dayUnit = (this.state.dayCount == 1 ? "Day" : "Days");
        var hourUnit = (this.state.hourCount == 1 ? "Hour" : "Hours");
        var minuteUnit = (this.state.minuteCount == 1 ? "Minute" : "Minutes");
        var secondUnit = (this.state.secondCount == 1 ? "Second" : "Seconds");
        return (
            <div>
                <CountSection count={this.state.dayCount}    unit={dayUnit}/>
                <CountSection count={this.state.hourCount}   unit={hourUnit}/>
                <CountSection count={this.state.minuteCount} unit={minuteUnit}/>
                <CountSection count={this.state.secondCount} unit={secondUnit}/>
                <DateDisplay year={this.props.year} month={this.props.month} day={this.props.day}
                             hour={this.props.hour} minute={this.props.minute} second={this.props.second} />
            </div>
        )
    }
})


function daysTill(milli) {
    return Math.floor((milli/(1000*60*60*24)))
}

function hoursTill(milli) {
    return Math.floor((milli/(1000*60*60))%24)
}

function minsTill(milli) {
    return Math.floor((milli/(1000*60))%60)
}

function secsTill(milli) {
    return Math.ceil((milli/1000)%60)
}

function timeTill(year, month, day, hour, minute, second) {
    var end = new Date(year, month, day, hour, minute, second);
    var now = new Date();
    var diff = end - now;
    return diff;
}

ReactDOM.render(
    <Counter pollInterval={500} year={2015} month={11} day={25} hour={0} minute={15} second={0}/>,
    document.getElementById('container')
);

ReactDOM.render(
    <span>Christmas</span>,
    document.getElementById('event')
)