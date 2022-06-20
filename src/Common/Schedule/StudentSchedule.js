import * as React from "react";
import * as ReactDOM from "react-dom";
import UserProfile from "../Authentication/UserProfile";
import {
  ScheduleComponent,
  Day,
  Week,
  WorkWeek,
  Month,
  Inject,
  ViewsDirective,
  ViewDirective,
  ResourceDirective,
} from "@syncfusion/ej2-react-schedule";
import { registerLicense } from "@syncfusion/ej2-base";
import { DateTimePickerComponent } from "@syncfusion/ej2-react-calendars";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { extend, L10n, Internationalization } from "@syncfusion/ej2-base";
import { Form } from "react-bootstrap";
import axios from "axios";

L10n.load({
  "en-US": {
    schedule: {
      saveButton: "Request",
      cancelButton: "Close",
      deleteButton: "Remove",
      newEvent: "Request session",
    },
  },
});
registerLicense(
  "ORg4AjUWIQA/Gnt2VVhhQlFaclhJXGFWfVJpTGpQdk5xdV9DaVZUTWY/P1ZhSXxRdkNiW39ZcHRXQ2NUUUQ="
);

export default class StudentSchedule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeslots: [],
      counselors: [],
      selected: -1,
    };
    this.onAddClick = this.onAddClick.bind(this);
    this.formatDate = this.formatDate.bind(this);
    this.processSelect = this.processSelect.bind(this);
    this.isSlotAvailable = this.isSlotAvailable.bind(this);
    this.instance = new Internationalization();
  }

  isSlotAvailable(startTime, endTime) {
    const data = this.scheduleObj.dataModule.dataManager.dataSource.json;
    var isSlotAvailable = true;

    const startDate = this.formatDate(startTime).replace(" ", "T") + ":00";
    const endDate = this.formatDate(endTime).replace(" ", "T") + ":00";

    console.log("startDate: ", startDate, " endTime: ", endDate);
    console.log("Schedule: ", data);

    for (var i = 0; i < data.length; i++) {
      if (data[i].startTime === startDate && data[i].endTime === endDate) {
        console.log(data[i].startTime, " ", startDate);
        isSlotAvailable = false;
        break;
      }
    }

    console.log(isSlotAvailable);
    return isSlotAvailable;
  }

  async componentDidMount() {
    const { data } = await axios
      .get("/timeslot/counselor/-1")
      .catch(function (error) {
        console.log(error);
      });
    this.setState({ timeslots: data });

    const response = await axios.get("/user/counselor").catch(function (error) {
      console.log(error);
    });
    this.setState({ counselors: response.data });
  }

  refreshAllTemplate() {
    this.scheduleObj.refreshTemplates();
  }

  onAddClick() {
    let Data = [
      {
        subject: "Break",
        startTime: "2022-06-15T12:40:00",
        endTime: "2022-06-15T12:40:00",
      },
      {
        subject: "Session",
        startTime: "2022-06-15T11:40:00",
        endTime: "2022-06-15T11:40:00",
      },
    ];
    this.scheduleObj.addEvent(Data);
  }

  formatDate(date) {
    let res =
      date.getFullYear() +
      "-" +
      (date.getMonth() + 1).toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      }) +
      "-" +
      date.getDate().toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      }) +
      " " +
      date.getHours().toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      }) +
      ":" +
      date.getMinutes().toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      });

    return res;
  }

  async onActionBegin(args) {
    console.log(args.requestType);
    if (
      args.requestType === "eventCreate" ||
      args.requestType === "eventChange"
    ) {
      console.log(
        "Result: ",
        this.isSlotAvailable(args.data[0].startTime, args.data[0].endTime)
      );
      if (!this.isSlotAvailable(args.data[0].startTime, args.data[0].endTime)) {
        console.log("Not available");
        args.cancel = true;
      } else {
        console.log("Available");
        let data = args.data instanceof Array ? args.data[0] : args.data;
        data.recurrenceRule = null;
        data.startTime = this.formatDate(data.startTime);
        data.endTime = this.formatDate(data.endTime);

        console.log("Selected counselor: " + this.state.selected);
        data.counselorId = this.state.selected;
        args.cancel = true;
        const response = await axios({
          method: "post",
          url: "/timeslot",
          data: data,
          headers: {
            "Content-Type": "application/json",
          },
        }).catch(function (error) {
          console.log("Error: " + error);
        });

        this.scheduleObj.addEvent(response.data);
      }
    }

    // Cancel deletion if not owned by student.
    if (args.requestType === "eventRemove") {
      console.log("Deleting...");
      if (UserProfile.getId() !== args.data[0].createdBy) {
        console.log("Failed, you do not own this time slot");
        args.cancel = true;
      } else {
        console.log("ID: ", args.data[0].id);
        axios.delete("/timeslot/" + args.data[0].id);
      }
    }
  }

  onPopupOpen(args) {
    // console.log("Args: ", args.data);
    console.log(
      "Schedule: ",
      this.scheduleObj.dataModule.dataManager.dataSource.json
    );

    if (args.type === "Editor") {
      const starTime = new Date(args.data.startTime);
      const endTime = new Date(args.data.endTime);
      console.log(starTime);
      console.log(endTime);
      console.log("Result", this.isSlotAvailable(starTime, endTime));
      if (!this.isSlotAvailable(starTime, endTime)) {
        console.log("Not free");
        if (args.data.createdBy !== UserProfile.getId()) {
          console.log("Not yours");
          args.cancel = true;
        }
      }

      if (args.data.startTime < new Date()) {
        args.cancel = true;
      }
    }

    if (args.type === "QuickInfo") {
      if (args.data.createdBy !== UserProfile.getId()) {
        args.cancel = true;
      }
      if (args.data.startTime < new Date()) {
        args.cancel = true;
      } else {
        var dialogObj = args.element.ej2_instances[0];
        dialogObj.hide();
        var currentAction = args.target.classList.contains("e-work-cells")
          ? "Add"
          : "Save";
        this.scheduleObj.openEditor(args.data, currentAction);
      }
    }
  }

  // onEventRendered(args) {
  //   if (args.data.subject === "Session") {
  //     args.element.style.backgroundColor = "#f48ae6";
  //   }
  //   if (args.data.subject === "Break") {
  //     args.element.style.backgroundColor = "#464646";
  //   }
  // }

  onEventRendered(args) {
    if (args.data.createdBy === UserProfile.getId()) {
      args.element.style.backgroundColor = "#AA0000";
    } else {
      args.element.style.backgroundColor = "#333";
    }
  }

  editorTemplate(props) {
    return props !== undefined ? (
      <table
        className="custom-event-editor"
        style={{ width: "100%", cellpadding: "5" }}
      >
        <tbody>
          <tr>
            <td className="e-textlabel">Priority</td>
            <td style={{ colspan: "4" }}>
              <DropDownListComponent
                id="priority"
                placeholder="How urgent is your situation?"
                data-name="priority"
                className="e-field"
                style={{ width: "100%" }}
                dataSource={["NORMAL", "INTERMEDIATE", "URGENT"]}
                required
              ></DropDownListComponent>
            </td>
          </tr>

          <tr style={{ height: "60px" }}></tr>
          <tr>
            <td className="e-textlabel">Type</td>
            <td style={{ colspan: "4" }}>
              <input
                disabled
                id="subject"
                className="e-field e-input"
                type="text"
                name="subject"
                value="Session"
                style={{ width: "100%" }}
              />
            </td>
          </tr>
          <tr>
            <td className="e-textlabel">From</td>
            <td style={{ colspan: "4" }}>
              <DateTimePickerComponent
                disabled
                id="startTime"
                format="dd/MM/yy hh:mm a"
                data-name="startTime"
                value={new Date(props.startTime || props.StartTime)}
                className="e-field"
              ></DateTimePickerComponent>
            </td>
          </tr>
          <tr>
            <td className="e-textlabel">To</td>
            <td style={{ colspan: "4" }}>
              <DateTimePickerComponent
                disabled
                id="endTime"
                format="dd/MM/yy hh:mm a"
                data-name="endTime"
                value={new Date(props.endTime || props.EndTime)}
                className="e-field"
              ></DateTimePickerComponent>
            </td>
          </tr>
        </tbody>
      </table>
    ) : (
      <div></div>
    );
  }

  eventTemplate(props) {
    return (
      <div className="template-wrap">
        <div className="subject" style={{ background: props.PrimaryColor }}>
          Reserved
        </div>
        <div className="subject" style={{ background: props.PrimaryColor }}>
          {" (" + props.subject + ")"}
        </div>
      </div>
    );
  }

  // eventTemplate(props) {
  //   return (
  //     <div className="template-wrap">
  //       <div className="subject" style={{ background: props.PrimaryColor }}>
  //         {props.subject}
  //       </div>
  //       <div className="subject" style={{ background: props.PrimaryColor }}>
  //         {" (" + props.priority + ")"}
  //       </div>
  //     </div>
  //   );
  // }

  async processSelect(e) {
    if (e.target.value === -1) {
      const { data } = await axios
        .get("/timeslot/counselor/-1")
        .catch(function (error) {
          console.log(error);
        });
      this.setState({ timeslots: data, selected: -1 });
    } else {
      const { data } = await axios
        .get("/timeslot/counselor/" + e.target.value)
        .catch(function (error) {
          console.log(error);
        });
      this.setState({ timeslots: data, selected: e.target.value });
    }
  }

  render() {
    return (
      <>
        <Form.Select onChange={this.processSelect}>
          <option value="-1">All</option>
          {this.state.counselors.map((counselor) => (
            <option value={counselor.id}>{counselor.username}</option>
          ))}
        </Form.Select>
        <ScheduleComponent
          actionBegin={this.onActionBegin.bind(this)}
          eventRendered={this.onEventRendered.bind(this)}
          popupOpen={this.onPopupOpen.bind(this)}
          editorTemplate={this.editorTemplate.bind(this)}
          timeScale={{ enable: true, interval: 40, slotCount: 1 }}
          ref={(t) => (this.scheduleObj = t)}
          height="500px"
          showWeekend={false}
          workHours={{
            highlight: true,
            start: "8:00",
            end: "17:00",
          }}
          startHour="08:00"
          endHour="17:00"
          workDays={[6, 1, 2, 3, 4]}
          eventSettings={{
            dataSource: this.state.timeslots,
            fields: {
              id: "id",
              subject: { name: "subject" },
              startTime: { name: "startTime" },
              endTime: { name: "endTime" },
              priority: { name: "priority" },
              recurrenceRule: { name: "recurrenceRule" },
            },
            template: this.eventTemplate.bind(this),
            //   allowEditing: false,
            //   allowAdding: false,
            //   allowDeleting: false,
          }}
        >
          <ViewsDirective>
            <ViewDirective option="Week" />
          </ViewsDirective>
          <Inject services={[Day, Week, WorkWeek, Month]} />
        </ScheduleComponent>
      </>
    );
  }
}
