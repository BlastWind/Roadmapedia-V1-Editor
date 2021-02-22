import React, { Component } from "react";
import {v1 as uuid} from "uuid";
import { Input, Form, TextArea, Button } from "semantic-ui-react";
import "./TreeSidebarAdd.css";
class TreeSidebarAddForm extends Component {
  handleChange = (e, { name, value }) =>
    this.props.onTextChange(e, { name, value });

  handleSubmit = () => {
    var hi = this.props.FormDisplayData;
    var size = Object.keys(hi).length;

    if (hi.uuid == undefined) {
      hi.uuid = uuid;
    }

    this.props.parentHandleSubmit(hi);
  };
  render() {
    return (
      <div>
        <Form id="TreeSidebarAddForm" onSubmit={this.handleSubmit}>
          <Input
            fluid
            placeholder="Name of this Bubble"
            onChange={this.handleChange}
            name="title"
            value={this.props.FormDisplayData.title}
            maxLength="100"
          />

          <Input
            fluid
            placeholder="Full Link to the resource (https://...) "
            onChange={this.handleChange}
            name="resource_link"
            value={this.props.FormDisplayData.resource_link}
            maxLength="100"
          />

          <TextArea
            placeholder="...Please tell us the details for this bubble!:)"
            onChange={this.handleChange}
            name="details"
            style={{ minHeight: 200, maxHeight: 300 }}
            maxLength="200"
            value={this.props.FormDisplayData.details}
          />

          <Button
            fluid
            color="green"
            type="submit"
            id="TreeSidebarAddFormButton"
          >
            Save
          </Button>
        </Form>

        <p className="InstructionsParagraph">
          P.S. Feel free to leave any fields empty if it is not applicable
        </p>
      </div>
    );
  }
}

export default TreeSidebarAddForm;
