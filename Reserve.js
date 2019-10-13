import React, {Component} from "react";

export class ReserveContainer extends Component {

    render() {
        console.log('props in Reserve',this.props);
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <button className="btn btn-secondary btn-sm" onClick={() => this.props.ReserveContainer()} >
                            Reserve Locker NOW!
                        </button>
                        {/*<button type="button" className="close" aria-label="Close" onClick={() => this.props.clickAction()}>*/}
                        {/*    <span aria-hidden="true">&times;</span>*/}
                        {/*</button>*/}
                    </div>
                </div>
            </div>
        );
    }
}
