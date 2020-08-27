import React from 'react'

let endpoint = process.env.REACT_APP_BACKEND_SERVER;
// let endpoint = "http://localhost";

class Exec extends React.Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = { cmdOutput: "Waiting for command", cmdColor: "" };
    }

    refreshResult(cmdOut, cmdError) {
        console.log(cmdOut)
        console.log(cmdError)
        switch (cmdError) {
            case false:
                console.log("False state")
                this.setState({
                    cmdOutput: cmdOut,
                    cmdColor: "green"
                })
                break;
            case true:
                console.log("true state")
                this.setState({
                    cmdOutput: cmdOut,
                    cmdColor: "red",
                });
                break;
            default:
                console.log("def state")
                this.setState({
                    cmdOutput: cmdOut,
                    cmdColor: "white",
                })
                break;
        }
    }

    handleSubmit(event) {
        event.preventDefault();

        const data = new FormData(event.target);
        const podName = data.get("podName")
        const podNamespace = data.get("podNamespace")
        const command = data.get("command")

        const body = {
            "podName": podName,
            "podNamespace": podNamespace,
            "command": command
        }

        fetch(endpoint + '/api/pod-exec', {
            method: 'POST',
            body: JSON.stringify(body),
        }).then((res) => {
            res.json().then(data => {
                switch (JSON.parse(data).Error) {
                    case true:
                        this.refreshResult(JSON.parse(data).CommandOutput, JSON.parse(data).Error)
                        break;
                    case false:
                        this.refreshResult(JSON.parse(data).CommandOutput, JSON.parse(data).Error)
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
                        <div style={{ display: "flex", alignItems: 'center', justifyContent: 'center' }}>
                            <div>
                                <label htmlFor="pod">Enter pod name</label>
                                <br />
                                <input id="podName" name="podName" type="text" />
                                <br />

                                <label htmlFor="podns">Enter pod namespace</label>
                                <br />
                                <input id="podNamespace" name="podNamespace" type="text" />
                                <br />

                                <label htmlFor="podFrom">Enter command</label>
                                <br />
                                <input id="command" name="command" type="text" />
                                <br />

                            </div>
                            <div style={{ display: "flex", alignItems: 'center', justifyContent: 'center' }}>

                                <button style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    height: "2vh"
                                }}>Exec command!</button>
                            </div>
                        </div>
                        <span style={{ backgroundColor: this.state.cmdColor }}>{this.state.cmdOutput}</span>
                    </form>
                </div>
            </div>
        );
    }
};

export default Exec
