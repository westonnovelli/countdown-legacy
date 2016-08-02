var preface = "Time Remaining to";
var prefacePost = "Time after Contracted";
var event1 = "McKinney & Olive";
var event1Post = event1;
var event2 = "Substantial Completion";
var event2Post = event2;
var year = 2016;
var month = 2; // starts at 0
var day = 22;
var hour = 22;
var minute = 59;
var second = 59;

var Unit = React.createClass({
    render: function() {
        return (
            <div className="unit">{this.props.name}</div>
        )
    }
});

var Count = React.createClass({
    render: function() {
        var classes = "count " + this.props.size
        if (this.props.overtime) {
            classes += " overtime"
        }
        return (
            <div className={classes}>{this.props.count}</div>
        )
    }
});

var CountSection = React.createClass({
    render: function() {
        return (
            <div className="col-quarter">
                <Count count={this.props.count} size={this.props.size} overtime={this.props.overtime}/>
                <Unit name={this.props.unit} />
            </div>
        )
    }
});

var DateDisplay = React.createClass({
    render: function() {
        var twelve = this.props.hour >= 12 ? "PM" : "AM";
        var hour = this.props.hour == 0 ? 12 : this.props.hour % 12 + 1;
        var minute = this.props.minute < 10 ? "0" + this.props.minute : this.props.minute;
        var second = this.props.second < 10 ? "0" + this.props.second : this.props.second;
        var time = hour + this.props.minute + this.props.second == 0 ? "":
            <span>at {hour}:{minute}:{second} {twelve}</span>;
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
});

var Header = React.createClass({
    updateHeader: function() {
        this.setState({preface: this.props.prefacePost, event1: this.props.event1Post, event2: this.props.event2Post})
    },
    getInitialState: function() {
        return {preface: this.props.preface, event1: this.props.event1, event2: this.props.event2}
    },
    render: function() {
        return (
            <div className="header">
                <HeaderLine text={this.state.preface} size={"preface"}/>
                <HeaderLine text={this.state.event1} size={"event"}/>
                <HeaderLine text={this.state.event2} size={"event"} />
            </div>
        )
    }
});

var HeaderLine = React.createClass({
    render: function() {
        return (
            <div className={this.props.size}>{this.props.text}</div>
        )
    }
});

var Counter = React.createClass({
    updateTime: function() {
        this.setState({overtime: false})
        var diff = timeTill(this.props.year, this.props.month, this.props.day, this.props.hour, this.props.minute, this.props.second);
        if (diff < 0) {
            diff = timeSince(this.props.year, this.props.month, this.props.day, this.props.hour, this.props.minute, this.props.second);
            this.setState({overtime: true})
            headerComp.updateHeader();
        }
        this.setState({dayCount: daysTill(diff), hourCount: hoursTill(diff), minuteCount: minsTill(diff), secondCount: secsTill(diff)})
    },
    getInitialState: function() {
        return {dayCount: 0, hourCount: 0, minuteCount: 0, secondCount: 0}
    },
    componentDidMount: function() {
        this.updateTime()
        setInterval(this.updateTime, this.props.pollInterval);
    },
    render: function() {
        var dayUnit = (this.state.dayCount == 1 ? "Day" : "Days");
        var hourUnit = (this.state.hourCount == 1 ? "Hour" : "Hours");
        var minuteUnit = (this.state.minuteCount == 1 ? "Minute" : "Minutes");
        var secondUnit = (this.state.secondCount == 1 ? "Second" : "Seconds");
        var secondSize = "xs";
        var minuteSize = "sm";
        var hourSize = "md";
        var daySize = "lg";
        return (
            <div>
                <CountSection count={this.state.dayCount}    unit={dayUnit}    size={daySize}    overtime={this.state.overtime}/>
                <CountSection count={this.state.hourCount}   unit={hourUnit}   size={hourSize}   overtime={this.state.overtime}/>
                <CountSection count={this.state.minuteCount} unit={minuteUnit} size={minuteSize} overtime={this.state.overtime}/>
                <CountSection count={this.state.secondCount} unit={secondUnit} size={secondSize} overtime={this.state.overtime}/>
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
    return Math.floor((milli/1000)%60)
}

function timeTill(year, month, day, hour, minute, second) {
    var end = new Date(year, month, day, hour+1, minute, second);
    var now = new Date();
    return end - now;
}

function timeSince(year, month, day, hour, minute, second) {
    var end = new Date(year, month, day, hour+1, minute, second);
    var now = new Date();
    var cutoff = new Date(2016, 7, 1, 23, 59, 59);
    if (now > cutoff) {
	now = cutoff;
    }
    return now - end;
}

var headerComp = ReactDOM.render(
    <Header preface={preface} event1={event1} event2={event2}
            prefacePost={prefacePost} event1Post={event1Post} event2Post={event2Post}/>,
    document.getElementById('header')
);

ReactDOM.render(
    <Counter pollInterval={500} year={year} month={month} day={day} hour={hour} minute={minute} second={second}/>,
    document.getElementById('container')
);
