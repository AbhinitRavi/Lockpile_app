import React, {Component} from "react";

export class OpenContainer extends Component {

    render() {
        console.log('props in open',this.props);
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        Locker number  {this.props.lockerId} reserved At Marylebone
                        <button className="btn btn-primary btn-lg" onClick={() => this.props.openLock()} >
                            Open Lock # {this.props.lockerId}

                            {console.log(this.props.lockerId)}
                        </button>
                        <button type="button" className="close" aria-label="Close" onClick={() => this.props.clickAction()}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
