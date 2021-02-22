import React, { Component } from "react";
import { List, Segment } from "semantic-ui-react";
import { Form, TextArea, Button } from "semantic-ui-react";
class TreeSidebarShow extends Component {
  switchToBubbleForm = () => {
    this.props.switchToBubbleForm();
  };

  openNewWindow = () => {
    if (this.props.displayImg.includes("https://")) {
      window.open(this.props.displayImg, "_blank");
    } else if (this.props.displayImg.includes("www.")) {
      var hmm = "https://" + this.props.displayImg;
      window.open(hmm, "_blank");
    } else {
      var hmm = "https://www." + this.props.displayImg;
      window.open(hmm, "_blank");
    }
  };
  render() {
    const hmm = { marginTop: "1rem" };
    return (
      <React.Fragment>
        <List>
          <List.Item>
            <List.Content style={{ marginTop: "1rem" }}>
              <span>Saved name - </span>
              <div
                style={{
                  width: "100%",
                  height: "5.5rem",
                  wordWrap: "break-word",
                  backgroundColor: "#FFFFFF",
                  marginTop: "1rem",
                  borderRadius: "5px"
                }}
              >
                <span id="TreeSidebarShowTexts"> {this.props.displayName}</span>
              </div>
            </List.Content>
            <List.Content style={{ marginTop: "1rem" }}>
              <span>Saved resource link - </span>
              <div
                style={{
                  width: "100%",
                  height: "8.5rem",
                  wordWrap: "break-word",
                  backgroundColor: "#FFFFFF",
                  marginTop: "1rem",
                  borderRadius: "5px"
                }}
              >
                <span
                  style={{ marginLeft: "0.25rem" }}
                  id="TreeSidebarShowTexts"
                >
                  <a onClick={this.openNewWindow}>{this.props.displayImg}</a>
                </span>
              </div>
            </List.Content>
            <List.Content style={{ marginTop: "1rem" }}>
              <span>Saved Details - </span>
              <div
                style={{
                  width: "100%",
                  height: "12rem",
                  wordWrap: "break-word",
                  backgroundColor: "#FFFFFF",
                  marginTop: "1rem",
                  borderRadius: "5px"
                }}
              >
                <span id="TreeSidebarShowTexts">
                  {this.props.displayDetails}
                </span>
              </div>
            </List.Content>
          </List.Item>
        </List>
        <Button
          fluid
          color="red"
          onClick={this.switchToBubbleForm}
          id="TreeSidebarExtraInfoFormButton"
        >
          Edit
        </Button>
      </React.Fragment>
    );
  }
}

export default TreeSidebarShow;
