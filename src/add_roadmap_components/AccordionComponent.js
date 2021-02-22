import React, { Component } from "react";
import { Accordion, Icon } from "semantic-ui-react";
import "./AccordionComponent.css";
class AccordionExampleStandard extends Component {
  state = { activeIndex: 1 };

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  render() {
    const { activeIndex } = this.state;

    return (
      <Accordion style={{ marginBottom: "2rem" }}>
        <Accordion.Title
          active={activeIndex === 1}
          index={1}
          onClick={this.handleClick}
        >
          <Icon name="dropdown" />
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 1}>
          <p className="InstructionsParagraph">
            👉 Drag with your mouse to move around, scroll your mouse to zoom in
            and out (might be mobile/touchpad uncompatible)
          </p>
          <p className="InstructionsParagraph">
            👉 Click on a bubble to edit, submit a name, the URL to the
            resource, and some details if applicable. When you submit a bubble,
            the original plus sign disappears. Press the up-arrow to append a
            new bubble vertically, press the right-arrow to append a bubble
            horizontally.
          </p>
          <p className="InstructionsParagraph">
            👉 The pink bubbles are the logical transitions between bubbles.
            Leave it blank if you have nothing to put.
          </p>
        </Accordion.Content>
      </Accordion>
    );
  }
}

export default AccordionExampleStandard;
