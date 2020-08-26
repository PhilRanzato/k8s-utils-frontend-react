import React from 'react'

let endpoint = "http://localhost";

class Connection extends React.Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = { connResult: "", resultMessage: "Result" };
    }

    refreshResult(result) {
        switch (result) {
            case true:
                this.setState({
                    connResult: "green",
                    resultMessage: "Connection Succeded"
                })
                break;
            case false:
                this.setState({
                    connResult: "red",
                    resultMessage: "Connection Error"
                });
                break;
            default:
                this.setState({
                    connResult: "white",
                    resultMessage: "Something went wrong, try reloading the page.."
                })
                break;
        }
    }

    handleSubmit(event) {
        event.preventDefault();

        const data = new FormData(event.target);
        const from = data.get("from")
        const fromNS = data.get("fromNamespace")
        const to = data.get("to")
        const toNS = data.get("toNamespace")

        const body = {
            "from": from,
            "fromNamespace": fromNS,
            "to": to,
            "toNamespace": toNS
        }

        fetch(endpoint + '/api/test-connection', {
            method: 'POST',
            body: JSON.stringify(body),
        }).then((res) => {
            res.json().then(data => {
                switch (data) {
                    case "true":
                        this.refreshResult(true)
                        break;
                    case "false":
                        this.refreshResult(false)
                        break;
                    default:
                        break;
                }
            })
        })
    }

    render() {
        return (
            <div>
            <div style={{ display: "flex", alignItems: 'center', justifyContent: 'center' }}>
                <form onSubmit={this.handleSubmit} style={{ verticalAlign: "true" }}>
                    <div style={{ display: "flex", alignItems: 'center', justifyContent: 'center'  }}>
                        <div>
                            <label htmlFor="podFrom">Enter pod from</label>
                            <br />
                            <input id="podFrom" name="from" type="text" />
                            <br />

                            <label htmlFor="podFrom">Enter pod from namespace</label>
                            <br />
                            <input id="podFromNs" name="fromNamespace" type="text" />
                            <br />

                            <label htmlFor="podFrom">Enter service to</label>
                            <br />
                            <input id="svcTo" name="to" type="text" />
                            <br />

                            <label htmlFor="podFrom">Enter service to namespace</label>
                            <br />
                            <input id="svcToNs" name="toNamespace" type="text" />
                            <br />
                            </div>
                            <div style={{ display: "flex", alignItems: 'center', justifyContent: 'center'  }}>

                        <button style={{
                            display: "flex",
                            justifyContent: "center",
                            height: "2vh"
                        }}>Test Connection!</button>
                </div>
                </div>
                <span style={{ backgroundColor: this.state.connResult }}>{this.state.resultMessage}</span>
                </form>
            </div>
            </div>
        );
    }
};

export default Connection
