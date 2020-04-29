import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import React, { Component } from "react";

class BasicModal extends Component {
  // takes in attributes...
  // header (string), message (string), close_modal (function)
  // will call close_modal with parameter "" or "save" if the Yes button is clicked

  render() {
    return (
      <div>
        <Modal isOpen={true} toggle={() => this.props.close_modal("")}>
          <ModalHeader toggle={() => this.props.close_modal("")}>{this.props.header}</ModalHeader>
          <ModalBody>
            {this.props.message}
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.props.close_modal("save")}>Yes</Button>{' '}
            <Button color="secondary" onClick={() => this.props.close_modal("")}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

export default BasicModal;