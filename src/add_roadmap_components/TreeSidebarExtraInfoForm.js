import React, { Component } from "react";
import { Input } from "semantic-ui-react";

import { Form, TextArea, Button } from "semantic-ui-react";
class TreeSidebarExtraInfoForm extends Component {
  handleChange = event => {
    this.props.onTextChange2(event);
  };

  handleSubmit = () => {
    this.props.parentHandleSubmit2();
  };

  handleEditSwitchForm = () => {
    this.props.handleEditSwitchForm();
  };

  render() {
    return (
      <div>
        <Form id="TreeSidebarAddForm" onSubmit={this.handleSubmit}>
          <tr />
          {this.props.current_extra_info == "" ? (
            <React.Fragment>
              <Input
                focus
                fluid
                placeholder={"Put some logical transition between the bubbles!"}
                onChange={this.handleChange}
              />
              <Button
                fluid
                color="green"
                type="submit"
                id="TreeSidebarExtraInfoFormButton"
              >
                Save
              </Button>
              <p className="InstructionsParagraph">
                P.S. Feel free to leave this empty if there is no logically
                transition needed!
              </p>
            </React.Fragment>
          ) : (
            <React.Fragment>
              Saved info: {this.props.current_extra_info}
              <Button
                fluid
                color="red"
                onClick={this.handleEditSwitchForm}
                id="TreeSidebarExtraInfoFormButton"
              >
                edit
              </Button>
            </React.Fragment>
          )}
        </Form>
      </div>
    );
  }
}

export default TreeSidebarExtraInfoForm;
