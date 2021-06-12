import React, { useState } from "react";
import { render } from "react-dom";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import networkgraph from "highcharts/modules/networkgraph";

networkgraph(Highcharts);

(function(H) {
  H.Series.prototype.onMouseOut = function() {
    // trigger the event only if listeners exist
    var series = this,
      options = series.options,
      chart = series.chart,
      tooltip = chart.tooltip,
      hoverPoint = chart.hoverPoint;

    // #182, set to null before the mouseOut event fires
    chart.hoverSeries = null;

    // trigger mouse out on the point, which must be in this series
    if (hoverPoint) {
      hoverPoint.onMouseOut();
    }

    // fire the mouse out event
    if (series && options.events.mouseOut) {
      H.fireEvent(series, "mouseOut");
    }

    // hide the tooltip
    if (
      tooltip &&
      !series.stickyTracking &&
      (!tooltip.shared || series.noSharedTooltip)
    ) {
      tooltip.hide();
    }
  };
})(Highcharts);

const LineChart = () => {
  const [pointClick, handlePointClick] = useState(null);
  const [chartOptions, setChartOptions] = useState({
    chart: {
      type: "networkgraph",
      events: {
        load() {
          if (!this.series[0].linksHidden) {
            this.series[0].linksHidden = true;
            console.log(this.series[0].points, "pppppppppppppppppp");
            this.series[0].points.forEach(p => {
              if (p.from !== "Borrower") {
                p.graphic.hide().addClass("hide-tree-element");
                p.toNode.graphic.hide().addClass("hide-tree-element");
                p.toNode.dataLabel.hide().addClass("hide-tree-element");
                p.graphic.hide();
                p.toNode.graphic.css({
                  opacity: 0
                });
                p.toNode.isHidden = true;
                p.toNode.dataLabel.css({
                  opacity: 0
                });
              }
            });
          }
        }
      }
    },
    plotOptions: {
      networkgraph: {
        layoutAlgorithm: {
          enableSimulation: false
        },
        point: {
          events: {
            click(e) {
              handlePointClick(e.point);
            }
          }
        }
      }
    },
    series: [
      {
        dataLabels: {
          enabled: true,
          linkFormat: "",
          allowOverlap: true
        },
        marker: {
          radius: 35
        },
        nodes: [
          {
            id: "Borrower",
            marker: {
              lineColor: "red",
              radius: 35,
              lineWidth: 3
            },
            color: "#203864"
          },
          {
            id: "Auditors",
            marker: {
              radius: 25
            },
            color: "#4472c4"
          },
          {
            id: "Directors",
            marker: {
              lineColor: "red",
              radius: 25,
              lineWidth: 3
            },
            color: "#4472c4"
          },
          {
            id: "Shareholders",
            marker: {
              radius: 25
            },
            color: "#4472c4"
          },
          {
            id: "ContactInfo",
            marker: {
              radius: 25
            },
            color: "#7c7c7c"
          },
          {
            id: "Suppliers",
            marker: {
              radius: 25
            },
            color: "#c55a11"
          },
          {
            id: "Buyers",
            marker: {
              lineColor: "red",
              radius: 25,
              lineWidth: 3
            },
            color: "#7030a0"
          },
          {
            id: "aud1",
            marker: {
              radius: 15
            },
            color: "#4472c4"
          },
          {
            id: "aud2",
            marker: {
              radius: 15
            },
            color: "#4472c4"
          },
          {
            id: "dir1",
            marker: {
              lineColor: "red",
              radius: 15,
              lineWidth: 3
            },
            color: "#4472c4"
          },
          {
            id: "dir2",
            marker: {
              radius: 15
            },
            color: "#4472c4"
          },
          {
            id: "sh1",
            marker: {
              radius: 15
            },
            color: "#4472c4"
          },
          {
            id: "sh2",
            marker: {
              radius: 15
            },
            color: "#4472c4"
          },
          {
            id: "sup1",
            marker: {
              radius: 15
            },
            color: "#c55a11"
          },
          {
            id: "sup2",
            marker: {
              radius: 15
            },
            color: "#c55a11"
          },
          {
            id: "ci1",
            marker: {
              radius: 15
            },
            color: "#7c7c7c"
          },
          {
            id: "ci2",
            marker: {
              radius: 15
            },
            color: "#7c7c7c"
          },
          {
            id: "b2",
            marker: {
              lineColor: "red",
              radius: 15,
              lineWidth: 3
            },
            color: "#7030a0"
          },
          {
            id: "Directors1",
            marker: {
              lineColor: "red",
              radius: 25,
              lineWidth: 3
            },
            name: "Directors",
            color: "#4472c4"
          },
          {
            id: "direct",
            marker: {
              lineColor: "red",
              radius: 15,
              lineWidth: 3
            },
            color: "#4472c4",
            name: "dir1"
          }
        ],
        data: [
          { from: "Borrower", to: "Auditors" },
          { from: "Borrower", to: "Directors", color: "red", width: 3 },
          { from: "Borrower", to: "Shareholders" },
          { from: "Borrower", to: "Suppliers" },
          { from: "Borrower", to: "Buyers", color: "red", width: 3 },
          { from: "Borrower", to: "ContactInfo" },
          { from: "Auditors", to: "aud1" },
          { from: "Auditors", to: "aud2" },
          { from: "Directors", to: "dir1", color: "red", width: 3 },
          { from: "Directors", to: "dir2" },
          { from: "Shareholders", to: "sh1" },
          { from: "Shareholders", to: "sh2" },
          { from: "Suppliers", to: "sup1" },
          { from: "Suppliers", to: "sup2" },
          { from: "ContactInfo", to: "ci1" },
          { from: "ContactInfo", to: "ci2" },
          { from: "Buyers", to: "b2", color: "red", width: 3 },
          { from: "b2", to: "Directors1", color: "red", width: 3 },
          { from: "Directors1", to: "direct", color: "red", width: 3 }
        ]
      }
    ]
  });

  handlePointClick = e => {
    //  e.series.points[0].remove();
    var point = e;
    // point.linksFrom.forEach(link => {
    //   if (link.toNode.isHidden) {
    //     link.graphic.show();
    //     link.toNode.graphic.css({
    //       opacity: 1
    //     });
    //     link.toNode.dataLabel.css({
    //       opacity: 1
    //     });
    //     link.toNode.isHidden = false;
    //   } else {
    //     link.graphic.hide();
    //     link.toNode.graphic.css({
    //       opacity: 0
    //     });
    //     link.toNode.dataLabel.css({
    //       opacity: 0
    //     });
    //     link.toNode.isHidden = true;
    //   }
    // });
    if (!point.linksHidden) {
      point.linksHidden = true;
      point.linksFrom.forEach(function(link) {
        link.graphic.hide().addClass("hide-tree-element");
        link.toNode.graphic.hide().addClass("hide-tree-element");
        link.toNode.dataLabel.hide().addClass("hide-tree-element");
      });
    } else {
      point.linksHidden = false;
      point.linksFrom.forEach(function(link) {
        link.graphic.show().removeClass("hide-tree-element");
        link.toNode.graphic.show().removeClass("hide-tree-element");
        link.toNode.dataLabel.show().removeClass("hide-tree-element");
      });
    }
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  );
};

render(<LineChart />, document.getElementById("root"));
