import React, { Component } from "react";
import * as d3 from "d3";

import Add from "../images/189754-user-interface/svg/add.svg";
import UpArrow from "../images/189754-user-interface/svg/up-arrow.svg";
import Next from "../images/189754-user-interface/svg/next.svg";
import Delete from "../images/189754-user-interface/svg/delete.svg";
class TreeDisplayAdd extends Component {
  constructor(props) {
    super(props);
  }

  handleChange = d => {
    this.props.handleChange(d);
  };

  handleChange2 = d => {
    this.props.handleChange2(d);
  };

  handleDeleteClick = d => {
    this.props.handleDeleteClick(d);
  };

  handleAppendClick = d => {
    this.props.handleAppendClick(d);
  };

  handleAppendClickHorizontal = d => {
    this.props.handleAppendClickHorizontal(d);
  };

  switchToExtraInfoForm = d => {
    this.props.switchToExtraInfoForm(d);
  };

  componentDidMount() {
    d3.select("li")
      .select("svg")
      .remove("g");

    var height = 500;
    var that = this;
    var treeData = this.props.roadmapData;
    // Set the dimensions and margins of the diagram
    var height1 = window.innerHeight;

    d3.select("svg").remove("li");

    // append the svg object to the body of the page
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin

    var svg = d3
      .select("li")

      .append("svg")
      .attr("class", "tree1")

      .call(
        d3.zoom().on("zoom", function() {
          svg.attr("transform", d3.event.transform);
        })
      )
      .attr("width", 1000)
      .attr("height", 600)
      .append("g");


    var gradient2 = svg
      .append("svg:defs")
      .append("svg:linearGradient")
      .attr("id", "gradient2")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "100%")
      .attr("y2", "100%")
      .attr("spreadMethod", "pad");

    gradient2
      .append("svg:stop")
      .attr("offset", "0%")
      .attr("stop-color", "#ed21e6")
      .attr("stop-opacity", 1);

    gradient2
      .append("svg:stop")
      .attr("offset", "100%")
      .attr("stop-color", "white")
      .attr("stop-opacity", 1);
    //.attr("transform", "translate(+600," + +-300 + ")");

    var i = 0,
      duration = 0,
      root;

    // declares a tree layout and assigns the size
    var treemap = d3.tree().size([window.innerHeight, window.innerWidth]);

    root = d3.hierarchy(treeData, function(d) {
      return d.children;
    });
    root.x0 = height / 2;
    root.y0 = 0;

    // Collapse after the second level

    update(root);

    // Collapse the node and all it's children
    function collapse(d) {
      if (d.children) {
        d._children = d.children;
        d._children.forEach(collapse);
        d.children = null;
      }
    }

    function update(source) {
      // Assigns the x and y position for the nodes

      var treeData = treemap(root);

      // Compute the new tree layout.
      var nodes = treeData.descendants(),
        links = treeData.descendants().slice(1),
        more_button = treeData.descendants();

      // Normalize for fixed-depth.
      nodes.forEach(function(d) {
        d.y = d.depth * 180;
      });

      // ****************** Nodes section ***************************

      // Update the nodes...
      var node = svg.selectAll("g.node").data(nodes, function(d) {
        return d.id || (d.id = ++i);
      });

      // Enter any new modes at the parent's previous position.
      var nodeEnter = node
        .enter()
        .append("g")
        .attr("class", "node")

        //if deleted, bubbles come from the very top, is weird
        .attr("transform", function(d) {
          return "translate(" + source.y0 + "," + source.x0 + ")";
        });

      // Add Circle for the nodes
      nodeEnter
        .append("circle")
        .attr("class", "node")
        .attr("r", 1e-6)
        .style("fill", function(d) {
          return d._children ? "lightsteelblue" : "#fff";
        });
      nodeEnter

        .append("circle")
        .attr("class", "extra_info")
        .attr("fill", "url(#gradient2)")
        .on("click", switchToExtraInfoForm)

        .attr("cy", function(d) {
          if (d.parent != null) {
            d.x_pos = d.x;
            d.parent_x_pos = d.parent.x;
          }
          if (d.parent_x_pos != null) {
            return (d.x_pos + d.parent_x_pos) / 2 - d.x_pos;
          }
        })
        .attr("cx", -90)
        .attr("r", function(d) {
          if (d.parent != null) {
            return 17;
          }
        });

      // EXTRA_INFO DELETE BUTTON

      /*
  // Add labels for the nodes
        nodeEnter
          .append("text")
          .attr("dy", 0)
          .attr("x", function(d) {
            return d.children || d._children ? -13 : 13;
          })
          .attr("text-anchor", function(d) {
            return d.children || d._children ? "end" : "start";
          })
          .text(function(d) {
            return d.data.name;
          });
  */
      var diameter = 30;
      nodeEnter
        .append("image")
        .on("click", click)
        .attr("xlink:href", function(d) {
          return d.data.website_image;
        })
        .attr("height", diameter * 2)
        .attr("transform", "translate(-30," + -30 + ")");
      nodeEnter
        .append("image")
        .on("click", appendClickHorizontal)
        .attr("xlink:href", Next)
        .attr("height", function(d) {
          if (d.children == null || d.children == undefined) {
            return 20;
          } else return 0;
        })
        .attr("transform", "translate(60," + "-10" + ")");

      nodeEnter
        .append("image")
        .on("click", appendClick)
        .attr("xlink:href", UpArrow)
        .attr("height", function(d) {
          if (d.parent != null && d == d.parent.children[0]) {
            return 20;
          } else return 0;
        })
        .attr("transform", "translate(-10," + "-80" + ")");
      // UPDATE
      var nodeUpdate = nodeEnter.merge(node);

      // Transition to the proper position for the node
      nodeUpdate
        .transition()
        .duration(duration)
        .attr("transform", function(d) {
          return "translate(" + d.y + "," + d.x + ")";
        });

      // Update the node attributes and style
      nodeUpdate
        .select("circle.node")
        .attr("r", diameter)

        .style("fill", function(d) {
          return "#81dafb";
        })
        .attr("cursor", "pointer");

      nodeUpdate
        .append("image")
        .on("click", deleteClick)
        .attr("xlink:href", Delete)
        .attr("height", 20)

        .attr("transform", "translate(17," + 15 + ")");

      // Remove any exiting nodes
      var nodeExit = node
        .exit()
        .transition()
        .duration(duration)
        .attr("transform", function(d) {
          return "translate(" + source.y + "," + source.x + ")";
        })
        .remove();

      // On exit reduce the node circles size to 0
      nodeExit.select("circle").attr("r", 1e-6);

      // On exit reduce the opacity of text labels
      nodeExit.select("text").style("fill-opacity", 1e-6);

      // ****************** links section ***************************

      // Update the links...
      var link = svg.selectAll("path.link").data(links, function(d) {
        return d.id;
      });

      // Enter any new links at the parent's previous position.
      var linkEnter = link
        .enter()
        .insert("path", "g")
        .attr("class", "link")
        .attr("d", function(d) {
          var o = { x: source.x0, y: source.y0 };
          return diagonal(o, o);
        });

      // UPDATE
      var linkUpdate = linkEnter.merge(link);

      // Transition back to the parent element position
      linkUpdate
        .transition()
        .duration(duration)
        .attr("d", function(d) {
          return diagonal(d, d.parent);
        });

      // Remove any exiting links
      var linkExit = link
        .exit()
        .transition()
        .duration(duration)
        .attr("d", function(d) {
          var o = { x: source.x, y: source.y };
          return diagonal(o, o);
        })
        .remove();

      // Store the old positions for transition.
      nodes.forEach(function(d) {
        d.x0 = d.x;
        d.y0 = d.y;
      });

      // Creates a curved (diagonal) path from parent to the child nodes
      function diagonal(s, d) {
        var path = `M ${s.y} ${s.x}
              C ${(s.y + d.y) / 2} ${s.x},
                ${(s.y + d.y) / 2} ${d.x},
                ${d.y} ${d.x}`;

        return path;
      }
      function switchToExtraInfoForm(d) {
        that.switchToExtraInfoForm(d);
      }

      // Toggle children on click.
      function click(d) {
        if (d.children) {
          d._children = d.children;
          d.children = null;
        } else {
          d.children = d._children;
          d._children = null;
        }
        update(d);
        that.handleChange2(d);
      }
      function click2(d) {
        //that.setState({ text: d.data.name });
        that.handleChange(d);
      }

      function deleteClick(d) {
        that.handleDeleteClick(d);
      }

      function appendClick(d) {
        that.handleAppendClick(d);
      }
      function appendClickHorizontal(d) {
        that.handleAppendClickHorizontal(d);
      }
    }
  }

  componentDidUpdate() {
    d3.select("li")
      .select("svg")
      .remove("g");

    var height = 500;
    var that = this;
    var treeData = this.props.roadmapData;
    // Set the dimensions and margins of the diagram
    var height1 = window.innerHeight;

    d3.select("svg").remove("li");

    // append the svg object to the body of the page
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin

    var svg = d3
      .select("li")

      .append("svg")
      .attr("class", "tree1")

      .call(
        d3.zoom().on("zoom", function() {
          svg.attr("transform", d3.event.transform);
        })
      )
      .attr("width", 1000)
      .attr("height", 600)
      .append("g");

    var gradient2 = svg
      .append("svg:defs")
      .append("svg:linearGradient")
      .attr("id", "gradient2")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "100%")
      .attr("y2", "100%")
      .attr("spreadMethod", "pad");

    gradient2
      .append("svg:stop")
      .attr("offset", "0%")
      .attr("stop-color", "#ed21e6")
      .attr("stop-opacity", 1);

    gradient2
      .append("svg:stop")
      .attr("offset", "100%")
      .attr("stop-color", "white")
      .attr("stop-opacity", 1);
    //.attr("transform", "translate(+600," + +-300 + ")");

    var i = 0,
      duration = 0,
      root;

    // declares a tree layout and assigns the size
    var treemap = d3.tree().size([window.innerHeight, window.innerWidth]);

    root = d3.hierarchy(treeData, function(d) {
      return d.children;
    });
    root.x0 = height / 2;
    root.y0 = 0;

    // Collapse after the second level

    update(root);

    // Collapse the node and all it's children
    function collapse(d) {
      if (d.children) {
        d._children = d.children;
        d._children.forEach(collapse);
        d.children = null;
      }
    }

    function update(source) {
      // Assigns the x and y position for the nodes

      var treeData = treemap(root);

      // Compute the new tree layout.
      var nodes = treeData.descendants(),
        links = treeData.descendants().slice(1),
        more_button = treeData.descendants();

      // Normalize for fixed-depth.
      nodes.forEach(function(d) {
        d.y = d.depth * 180;
      });

      // ****************** Nodes section ***************************

      // Update the nodes...
      var node = svg.selectAll("g.node").data(nodes, function(d) {
        return d.id || (d.id = ++i);
      });

      // Enter any new modes at the parent's previous position.
      var nodeEnter = node
        .enter()
        .append("g")
        .attr("class", "node")

        //if deleted, bubbles come from the very top, is weird
        .attr("transform", function(d) {
          return "translate(" + source.y0 + "," + source.x0 + ")";
        });

      // Add Circle for the nodes
      nodeEnter
        .append("circle")
        .attr("class", "node")
        .attr("r", 1e-6)
        .style("fill", function(d) {
          return d._children ? "lightsteelblue" : "#fff";
        });
      nodeEnter

        .append("circle")
        .attr("class", "extra_info")
        .attr("fill", "url(#gradient2)")
        .on("click", function(d) {
          switchToExtraInfoForm(d);
          if (gToolTip.style.visibility === "visible") return "hidden";
          else return gToolTip.style("visibility", "visible");
        })

        .on("mouseover", function(d) {
          return gToolTip.style("visibility", "visible");
        })
        .on("mouseout", function(d) {
          return gToolTip.style("visibility", "hidden");
        })

        .attr("cy", function(d) {
          if (d.parent != null) {
            d.x_pos = d.x;
            d.parent_x_pos = d.parent.x;
          }
          if (d.parent_x_pos != null) {
            return (d.x_pos + d.parent_x_pos) / 2 - d.x_pos;
          }
        })
        .attr("cx", -90)
        .attr("r", function(d) {
          if (d.parent != null) {
            return 17;
          }
        });

      var diameter = 30;
      nodeEnter
        .append("image")
        .on("click", click)
        .attr("xlink:href", function(d) {
          return d.data.website_image;
        })
        .attr("height", diameter * 2)
        .attr("transform", "translate(-30," + -30 + ")");
      nodeEnter
        .append("image")
        .on("click", appendClickHorizontal)
        .attr("xlink:href", Next)
        .attr("height", function(d) {
          if (d.children == null || d.children == undefined) {
            return 20;
          } else return 0;
        })
        .attr("transform", "translate(60," + "-10" + ")");

      nodeEnter
        .append("image")
        .on("click", appendClick)
        .attr("xlink:href", UpArrow)
        .attr("height", function(d) {
          if (d.parent != null && d == d.parent.children[0]) {
            return 20;
          } else return 0;
        })
        .attr("transform", "translate(-10," + "-80" + ")");

      var gToolTip = nodeEnter
        .append("g")

        .style("visibility", "hidden");

      var rectToolTip = gToolTip.append("rect");

      //  .style("visibility", "hidden")

      var textToolTip = gToolTip
        .append("text")

        .attr("id", "toUse")
        .attr("class", "textToolTip")
        .text(function(d) {
          return d.data.extra_info;
        })
        .each(function(d) {
          d.textWidth = this.getBBox().width;
        })
        .attr("y", function(d) {
          if (d.parent != null) {
            d.x_pos = d.x;
            d.parent_x_pos = d.parent.x;
          }
          if (d.parent_x_pos != null) {
            return (d.x_pos + d.parent_x_pos) / 2 - d.x_pos - 25;
          }
        })
        .attr("x", function(d) {
          return -90 - d.textWidth / 2;
        });

      var polyTip = gToolTip

        .append("polygon")
        .attr("points", function(d) {
          if (d.parent == null) {
            return null;
          } else {
            return "-7,20 7,20 0,30";
          }
        })
        .style("fill", "black")
        .style("stroke", "black")
        //first para is x, second para is y, we are moving x by -90 and y by the d.x+d.x/2 whatever

        .attr("transform", function(d) {
          var y = (d.x_pos + d.parent_x_pos) / 2 - d.x_pos - 43;
          var x = -90;
          // "translate(" + x + "," + y + ")";
          return "translate(" + x + "," + y + ")";
        });

      rectToolTip.attr("width", function(d) {
        if (d.textWidth === 0 && d.parent !== null) {
          return 20;
        } else if (d.parent === null || d.parent === undefined) return 0;
        else return d.textWidth + 10;
      });
      rectToolTip
        .attr("height", 20)
        .attr("y", function(d) {
          if (d.parent != null) {
            d.x_pos = d.x;
            d.parent_x_pos = d.parent.x;
          }
          if (d.parent_x_pos != null) {
            return (d.x_pos + d.parent_x_pos) / 2 - d.x_pos - 40;
          }
        })
        .attr("x", function(d) {
          if (d.textWidth === 0 && d.parent != null) {
            return -100;
          } else return -(90 + d.textWidth / 2) - 5;
        })

        .attr("rx", 5)
        .attr("ry", 5);

      // UPDATE
      var nodeUpdate = nodeEnter.merge(node);

      // Transition to the proper position for the node
      nodeUpdate
        .transition()
        .duration(duration)
        .attr("transform", function(d) {
          return "translate(" + d.y + "," + d.x + ")";
        });

      // Update the node attributes and style
      nodeUpdate
        .select("circle.node")
        .attr("r", diameter)

        .style("fill", function(d) {
          return "#81dafb";
        })
        .attr("cursor", "pointer");

      nodeUpdate
        .append("image")
        .on("click", deleteClick)
        .attr("xlink:href", Delete)
        .attr("height", 20)

        .attr("transform", "translate(17," + 15 + ")");

      // Remove any exiting nodes
      var nodeExit = node
        .exit()
        .transition()
        .duration(duration)
        .attr("transform", function(d) {
          return "translate(" + source.y + "," + source.x + ")";
        })
        .remove();

      // On exit reduce the node circles size to 0
      nodeExit.select("circle").attr("r", 1e-6);

      // On exit reduce the opacity of text labels
      nodeExit.select("text").style("fill-opacity", 1e-6);

      // ****************** links section ***************************

      // Update the links...
      var link = svg.selectAll("path.link").data(links, function(d) {
        return d.id;
      });

      // Enter any new links at the parent's previous position.
      var linkEnter = link
        .enter()
        .insert("path", "g")
        .attr("class", "link")
        .attr("d", function(d) {
          var o = { x: source.x0, y: source.y0 };
          return diagonal(o, o);
        });

      // UPDATE
      var linkUpdate = linkEnter.merge(link);

      // Transition back to the parent element position
      linkUpdate
        .transition()
        .duration(duration)
        .attr("d", function(d) {
          return diagonal(d, d.parent);
        });

      // Remove any exiting links
      var linkExit = link
        .exit()
        .transition()
        .duration(duration)
        .attr("d", function(d) {
          var o = { x: source.x, y: source.y };
          return diagonal(o, o);
        })
        .remove();

      // Store the old positions for transition.
      nodes.forEach(function(d) {
        d.x0 = d.x;
        d.y0 = d.y;
      });

      // Creates a curved (diagonal) path from parent to the child nodes
      function diagonal(s, d) {
        var path = `M ${s.y} ${s.x}
              C ${(s.y + d.y) / 2} ${s.x},
                ${(s.y + d.y) / 2} ${d.x},
                ${d.y} ${d.x}`;

        return path;
      }
      function switchToExtraInfoForm(d) {
        that.switchToExtraInfoForm(d);
      }

      // Toggle children on click.
      function click(d) {
        if (d.children) {
          d._children = d.children;
          d.children = null;
        } else {
          d.children = d._children;
          d._children = null;
        }
        update(d);
        that.handleChange2(d);
      }
      function click2(d) {
        //that.setState({ text: d.data.name });
        that.handleChange(d);
      }

      function deleteClick(d) {
        that.handleDeleteClick(d);
      }

      function appendClick(d) {
        that.handleAppendClick(d);
      }
      function appendClickHorizontal(d) {
        that.handleAppendClickHorizontal(d);
      }
    }
  }
  render() {
    return null;
  }
}

export default TreeDisplayAdd;
