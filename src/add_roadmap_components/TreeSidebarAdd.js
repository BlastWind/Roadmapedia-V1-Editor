import React, { Component } from "react";
import "./TreeSidebarAdd.css";
import TreeSidebarAddForm from "./TreeSidebarAddForm";
import TreeSidebarShow from "./TreeSidebarShow";
import { Input, Form, TextArea, Button, Segment } from "semantic-ui-react";
import TreeSidebarExtraInfoForm from "./TreeSidebarExtraInfoForm";

class TreeSidebarAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayName: this.props.sidebarDataName,
      displayImg: this.props.sidebarDataImg,
      displayDetails: this.props.sidebarDataDetails,

      title: "",
      resource_link: "",
      details: "",
      website: "",
      extraInfoFormText: ""
    };
  }

  saveRoadmap = () => {
    this.props.saveRoadmap();
  };
  handleChange = (e, { name, value }) => {

    this.setState({ [name]: value });
  };

  handleExtraInfoForm2 = event => {

    this.setState({ extraInfoFormText: event.target.value });
  };

  handleSubmit = a => {

    this.props.parentHandleSubmit(a);
    this.setState({ title: "", resource_link: "", details: "", website: "" });
  };

  handleExtraInfoSubmit = () => {
    this.props.handleExtraInfoSubmit(this.state.extraInfoFormText);
  };
  handleEditSwitchForm = () => {
    this.props.handleEditSwitchForm();
  };
  switchToBubbleForm = () => {
    this.props.switchToBubbleForm();
  };

  render() {
    const { title, resource_link, details } = this.state;
    const ShowFormOrNot = {
      showBubbleForm: (
        <TreeSidebarAddForm
          FormDisplayData={this.state}
          onTextChange={this.handleChange}
          parentHandleSubmit={this.handleSubmit}
        />
      ),

      showBubbleInfo: (
        <TreeSidebarShow
          displayName={this.props.sidebarDataName}
          displayImg={this.props.sidebarDataImg}
          displayDetails={this.props.sidebarDataDetails}
          switchToBubbleForm={this.switchToBubbleForm}
        />
      ),
      showExtraInfoForm: (
        <TreeSidebarExtraInfoForm
          onTextChange2={this.handleExtraInfoForm2}
          parentHandleSubmit2={this.handleExtraInfoSubmit}
          current_extra_info={this.props.current_extra_info}
          handleEditSwitchForm={this.handleEditSwitchForm}
        />
      )
    };

    return (
      <Segment className="Segment1">
        <div id="TreeSidebarAdd" styles={{ width: "100%" }}>
          {ShowFormOrNot[this.props.showForm]}
        </div>
      </Segment>
    );
  }
}

export default TreeSidebarAdd;
