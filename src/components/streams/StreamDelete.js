import React from 'react';
import { Link } from 'react-router-dom';
import history from '../../history';
import { connect } from 'react-redux';
import { fetchStreamById, deleteStream } from '../../actions';

import Modal from '../Modal';

class StreamDelete extends React.Component {

    componentDidMount() {
        this.props.fetchStreamById(this.props.match.params.id);
    }

    renderActions() {
        const { id } = this.props.match.params;
        return (
            <React.Fragment>
                <button onClick={() => this.props.deleteStream(id)} className="ui button negative">Delete</button>
                <Link to="/" className="ui button">Cancel</Link>
            </React.Fragment>
        );    
    }

    renderContent() {
        if (!this.props.stream) {
            return 'Are you sure you want to delete this stream ?'
        }

        return `Are you sure you want to delete this stream with title: ${this.props.stream.title}`
    }

    render() {
        return (
            <div>
                StreamDelete
                <Modal
                    title="Delete Stream"
                    content={this.renderContent()}
                    actions={this.renderActions()}
                    onDismiss={() => history.push('/')}
                />
            </div>
        );
    }
};

const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id] }
};

export default connect(mapStateToProps, { fetchStreamById, deleteStream })(StreamDelete);