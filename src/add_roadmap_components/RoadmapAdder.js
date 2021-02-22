import React, { Component } from "react";

import TreeDisplayAdd from "./TreeDisplayAdd.js";
import TreeSidebarAdd from "./TreeSidebarAdd";
import AccordionExampleStandard from "./AccordionComponent";
import {v1 as uuid} from "uuid";
import Add from "../images/189754-user-interface/svg/add.svg"
import {
  Grid,
  Button,
  Form,
  Input,
  Select,
  TextArea,
  Accordion
} from "semantic-ui-react";
import MediaQuery from "react-responsive";

class RoadmapAdder extends Component {
  constructor(props) {
    super(props);

    this.saveRoadmap = this.saveRoadmap.bind(this);
    this.state = {
      name: "plac1",
      category: "yah",
      time_completion: 0,
      author_description: "",
      roadmap_debrief: "",
      isThereError: false,

      current_extra_info: "",
      current_extra_form_mode: "editable",

      showForm: "showBubbleForm",
      edit_mode: false,
      current_name: "",
      current_resource_link: "",
      current_details: "",
      current_uuid: "",
      current_website: "",
      current_website_img: "",
      treeData: {
        name: "Edit and save",
        resource_link: "uh",
        uuid: uuid,
        website_image: Add,
        children: []
      },

      activeIndex: 0
    };
  }
  componentDidMount() {

    /*
    var email = localStorage.getItem("email");
    if (email === "" || email === null || email === undefined) {
      this.props.history.push({
        pathname: "/login",
        state: { cameFrom: this.props.location.pathname }
      });
    }
    */
  }


  handleExtraInfoSubmit = input => {
    this.setState({ current_extra_info: input });
    this.findUUIDthenUpdateExtra(
      this.state.treeData,
      this.state.current_uuid,
      input
    );
  };

  handleAccordianClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };
  handleEditSwitchForm = () => {
    this.setState({ current_extra_info: "" });
  };
  switchToBubbleForm = () => {
    this.setState({ showForm: "showBubbleForm" });
  };

  findUUIDthenAppendChildren = () => {
    //we want to find the UUID and then append the following
    /*children: [
      {
        name: "Edit and save",
        resource_link: "uh",
        uuid: uuid,
        details: "hi",
        website_image:
          "https://cdn3.iconfinder.com/data/icons/harmonicons-06/64/plus-circle-512.png"
      }
    ];*/
  };
  handleSubmit = a => {
    if (this.state.treeData.children == "") {
      var submitted_uuid = a.uuid;
      var submitted_title = a.title;
      var submitted_resource_link = a.resource_link;
      var submitted_details = a.details;
      var submitted_website = a.website;

      var submitted_website_img = this.findWebsiteImg(submitted_resource_link);

      var newTreeData = {
        name: submitted_title,
        resource_link: submitted_resource_link,
        details: submitted_details,
        uuid: submitted_uuid,
        website_image: submitted_website_img
      };

      this.setState({ treeData: newTreeData });

      this.setState({ showForm: "showBubbleInfo" });
      this.setState({ current_name: a.title });
      this.setState({ current_resource_link: a.resource_link });
      this.setState({ current_details: a.details });
    } else {
      this.setState({ showForm: "showBubbleInfo" });

      this.setState({ current_name: a.title });
      this.setState({ current_resource_link: a.resource_link });
      this.setState({ current_details: a.details });

      var submitted_website_img = this.findWebsiteImg(a.resource_link);
      this.setState({ current_website_img: submitted_website_img });

      this.findUUID(
        this.state.treeData,
        this.state.current_uuid,
        a.title,
        a.resource_link,
        a.details,
        submitted_website_img
      );
    }

    var that = this;
  };

  handleButtonToggle2 = d => {
    if (d.data.name !== "Edit and save") {
      this.setState({ showForm: "showBubbleInfo" });
      this.setState({ current_uuid: d.data.uuid });
      this.setState({
        current_name: d.data.name,
        current_resource_link: d.data.resource_link,
        current_uuid: d.data.uuid,
        current_details: d.data.details
      });
    } else {
      this.setState({ showForm: "showBubbleForm" });
      this.setState({ current_uuid: d.data.uuid });
      this.setState({
        current_name: d.data.name,
        current_resource_link: d.data.resource_link,
        current_uuid: d.data.uuid,
        current_details: d.data.details
      });
    }
  };
  handleDeleteClick = d => {
    //find UUID and then delete children
    this.setState({ current_uuid: d.data.uuid });

    this.findUUIDthenDelete(this.state.treeData, this.state.current_uuid);
  };

  handleAppendClick = d => {
    this.setState({ current_uuid: d.parent.data.uuid });
    this.findUUIDthenAppend(this.state.treeData, this.state.current_uuid);
  };

  handleAppendClickHorizontal = d => {
    this.setState({ current_uuid: d.data.uuid });
    this.findUUIDthenAppendHorizontal(this.state.treeData, d.data.uuid);
  };

  switchToExtraInfoForm = d => {
    this.setState({ showForm: "showExtraInfoForm" });
    this.setState({ current_uuid: d.data.uuid });
    this.findIfThereIsExtraInfo(this.state.treeData, d.data.uuid);
  };

  findUUIDthenDelete = (tree, uuid) => {
    if (!tree.children) return;
    tree.children = tree.children.filter(c => c.uuid !== uuid);
    tree.children.forEach(c => this.findUUIDthenDelete(c, uuid));
    this.setState({ treeData: tree });
  };

  findUUIDthenAppendHorizontal = (targetObject, id) => {
    var targetIsFound = false;
    var target = "";
    if (targetObject.uuid == id) {
      targetIsFound = true;
      target = targetObject;
    }
    if (targetIsFound == false) {
      if (targetObject.children === undefined) {
      } else {
        targetObject.children.map(x =>
          this.findUUIDthenAppendHorizontal(x, id)
        );
      }
    }
    if (targetIsFound == true) {
      target.children = [
        {
          name: "Edit and save",
          resource_link: "uh",
          uuid: uuid,
          details: "hi",
          website_image: Add,
          extra_info: ""
        }
      ];
      this.setState({ treeData: this.state.treeData });
    }
  };

  findUUIDthenUpdateExtra = (targetObject, id, input) => {
    var targetIsFound = false;
    var target = "";
    if (targetObject.uuid == id) {
      targetIsFound = true;
      target = targetObject;
    }
    if (targetIsFound == false) {
      if (targetObject.children === undefined) {
      } else {
        targetObject.children.map(x =>
          this.findUUIDthenUpdateExtra(x, id, input)
        );
      }
    }
    if (targetIsFound == true) {
      target.extra_info = input;
    }
  };

  findUUIDthenAppend = (targetObject, uuid3) => {
    var targetIsFound = false;
    var target = "";
    if (targetObject.uuid == uuid3) {
      targetIsFound = true;
      target = targetObject;
    }
    if (targetIsFound == false) {
      if (targetObject.children === undefined) {
      } else {
        targetObject.children.map(x => this.findUUIDthenAppend(x, uuid3));
      }
    }
    if (targetIsFound == true) {
      if (typeof target.children != undefined) {
        target.children.unshift({
          name: "Edit and save",
          resource_link: "uh",
          uuid: uuid,
          details: "hi",
          website_image: Add,
          extra_info: ""
        });
      }

      this.setState({ treeData: this.state.treeData });
    }
  };

  findIfThereIsExtraInfo = (targetObject, to_find_uuid) => {
    var targetIsFound = false;
    var target = "";
    if (targetObject.uuid == to_find_uuid) {
      targetIsFound = true;
      target = targetObject;
    }
    if (targetIsFound == false) {
      if (targetObject.children === undefined) {
      } else {
        targetObject.children.map(x =>
          this.findIfThereIsExtraInfo(x, to_find_uuid)
        );
      }
    } else if ((targetIsFound = true)) {
      this.setState({ current_extra_info: target.extra_info });
    }
  };
  findUUID = (
    targetObject,
    uuid2,
    submitname,
    submitted_resource_link,
    submitdetails,
    submitted_website_img
  ) => {
    var targetIsFound = false;
    var target = "";

    if (targetObject.uuid == uuid2) {
      targetIsFound = true;
      target = targetObject;
    }

    if (targetIsFound == false) {
      if (targetObject.children === undefined) {
      } else {
        targetObject.children.map(x =>
          this.findUUID(
            x,
            uuid2,
            submitname,
            submitted_resource_link,
            submitdetails,
            submitted_website_img
          )
        );
      }
    } else {
      if (target.children === undefined) {
        target.name = submitname;
        target.resource_link = submitted_resource_link;
        target.details = submitdetails;
        target.website_image = submitted_website_img;
      } else if (typeof target.children !== undefined) {
        target.name = submitname;
        target.resource_link = submitted_resource_link;
        target.details = submitdetails;
        target.website_image = submitted_website_img;
      }
    }
  };

  async saveRoadmap() {
    var toSaveData = this.state.treeData;
    var toPush = {
      roadmap: [this.state.treeData],
      name: this.state.name,
      category: this.state.category,
      time_completion: this.state.time_completion,
      roadmap_debrief: this.state.roadmap_debrief
    };

    var requestBody = {
      author_id: this.props.auth.user.id,
      author_name: this.props.auth.user.name,
      author_profile_pic: this.props.auth.user_profile_pic,
      author_bio_text: this.props.auth.user_profile_bio,
      roadmap: toPush
    };
    await this.props.addRoadmap(requestBody);
    this.props.history.push("/home");
  }
  validate = () => {
    var category = this.state.category;
    var roadmap_title = this.state.name;
    var time_completion = this.state.time_completion;
    var roadmap_debrief = this.state.roadmap_debrief;
    var regex = /^[a-zA-Z]+$/;
    if (
      category !== "" &&
      roadmap_title !== "" &&
      time_completion !== "" &&
      roadmap_debrief !== ""
    ) {
      if (time_completion === "none" || !isNaN(time_completion)) {
        this.saveRoadmap();
      } else {
        this.setState({ isThereError: true });
      }
    } else {
      this.setState({ isThereError: true });
    }
  };

  nameOnChange = event => {
    this.setState({ name: event.target.value });
  };

  categoryOnChange = event => {
    this.setState({ category: event.target.value });
  };

  authordescriptionOnChange = event => {
    this.setState({ author_description: event.target.value });
  };

  debriefOnChange = event => {
    this.setState({ roadmap_debrief: event.target.value });
  };

  timeOnChange = event => {
    this.setState({ time_completion: event.target.value });
  };

  render() {
    return (
      <div className="RoadmapAdderHeader">
        <div>
          <span className="RoadmapAdderText">Create a new roadmap!</span>
          <Button onClick={this.validate} className="RoadmapAddButton">
            SAVE THE ENTIRE ROADMAP
          </Button>
        </div>
        <tr />
        <div className="RoadmapFrom" style={{ marginTop: "3rem" }}>
          {this.state.isThereError ? (
            <div>
              <a
                style={{
                  color: "red",
                  fontSize: "20px",
                  fontWeight: "500"
                }}
              >
                Error Saving the map, did you put in a title, category, and
                debrief, btw, type in none for time if not applicable.
              </a>
            </div>
          ) : (
            <div />
          )}
          <Form className="RoadmapAdderForm">
            <Form.Group widths="equal">
              <Form.Field>
                <label>Title</label>
                <Input
                  id="form-input-control-first-name"
                  placeholder="What's the title? :)"
                  onChange={this.nameOnChange}
                  maxLength="100"
                />
              </Form.Field>
              <Form.Field
                placeholder="Choose a category!"
                onChange={this.categoryOnChange}
              >
                <label>Category</label>
                <Input
                  id="form-input-control-last-name"
                  placeholder="Choose a category!"
                  onChange={this.categoryOnChange}
                  maxLength="50"
                />
              </Form.Field>

              <Form.Field>
                <label>Time to Complete (hrs)</label>
                <Input
                  id="form-input-control-last-name"
                  placeholder="Type in none if not applicable :-)"
                  onChange={this.timeOnChange}
                  maxLength="5"
                />
              </Form.Field>
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field
                style={{ minHeight: 50, maxHeight: 50 }}
                id="form-textarea-control-about-you"
                control={TextArea}
                label="Roadmap Debrief:"
                placeholder="Give a sweet and brief description for your Roadmap!"
                maxlength="200"
                onChange={this.debriefOnChange}
              />
            </Form.Group>
          </Form>
        </div>
        <div className="InstructionsDiv">
          <span className="RoadmapAdderText">Construct the roadmap!</span>
          <hr />
          <span className="Instructions_text"> Instructions</span>
          <AccordionExampleStandard />
        </div>
        <MediaQuery minWidth={766}>
          <ul>
            <li className="SVGContainer">
              <div>
                <TreeDisplayAdd
                  roadmapData={this.state.treeData}
                  handleChange={this.handleButtonToggle}
                  handleChange2={this.handleButtonToggle2}
                  handleDeleteClick={this.handleDeleteClick}
                  handleAppendClick={this.handleAppendClick}
                  handleAppendClickHorizontal={this.handleAppendClickHorizontal}
                  switchToExtraInfoForm={this.switchToExtraInfoForm}
                />
              </div>
            </li>

            <li>
              <div>
                <TreeSidebarAdd
                  parentHandleSubmit={this.handleSubmit}
                  showForm={this.state.showForm}
                  sidebarDataName={this.state.current_name}
                  sidebarDataImg={this.state.current_resource_link}
                  sidebarDataDetails={this.state.current_details}
                  saveRoadmap={this.saveRoadmap}
                  handleExtraInfoSubmit={this.handleExtraInfoSubmit}
                  current_extra_info={this.state.current_extra_info}
                  handleEditSwitchForm={this.handleEditSwitchForm}
                  switchToBubbleForm={this.switchToBubbleForm}
                />
              </div>
            </li>
          </ul>
        </MediaQuery>
        <MediaQuery maxWidth={765}>
          <li className="SVGContainer">
            <div>
              <TreeDisplayAdd
                roadmapData={this.state.treeData}
                handleChange={this.handleButtonToggle}
                handleChange2={this.handleButtonToggle2}
                handleDeleteClick={this.handleDeleteClick}
                handleAppendClick={this.handleAppendClick}
                handleAppendClickHorizontal={this.handleAppendClickHorizontal}
                switchToExtraInfoForm={this.switchToExtraInfoForm}
              />
            </div>
          </li>
          <div>
            <TreeSidebarAdd
              parentHandleSubmit={this.handleSubmit}
              showForm={this.state.showForm}
              sidebarDataName={this.state.current_name}
              sidebarDataImg={this.state.current_resource_link}
              sidebarDataDetails={this.state.current_details}
              saveRoadmap={this.saveRoadmap}
              handleExtraInfoSubmit={this.handleExtraInfoSubmit}
              current_extra_info={this.state.current_extra_info}
              handleEditSwitchForm={this.handleEditSwitchForm}
              switchToBubbleForm={this.switchToBubbleForm}
            />
          </div>
        </MediaQuery>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  roadmap: state.roadmap,
  auth: state.auth
});

export default RoadmapAdder
