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
import { RecurrenceEditor } from "@syncfusion/ej2-react-schedule";
import { RecurrenceEditorComponent } from "@syncfusion/ej2-react-schedule";
import { Form } from "react-bootstrap";
import RecurrenceRule from "./RecurrenceRule";
import axios from "axios";

L10n.load({
  "en-US": {
    schedule: {
      saveButton: "Reserve",
      cancelButton: "Close",
      deleteButton: "Remove",
      newEvent: "Reserve timeslot",
    },
  },
});
registerLicense(
  "ORg4AjUWIQA/Gnt2VVhhQlFaclhJXGFWfVJpTGpQdk5xdV9DaVZUTWY/P1ZhSXxRdkNiW39ZcHRXQ2NUUUQ="
);

export default class CounselorSchedule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeslots: [],
      counselors: [],
      selected: UserProfile.getId(),
    };
  }

  async componentDidMount() {
    const { data } = await axios
      .get("/timeslot/counselor/" + this.state.selected)
      .catch(function (error) {
        console.log(error);
      });
    this.setState({ timeslots: data });
    const response = await axios.get("/user/counselor").catch(function (error) {
      console.log(error);
    });
    this.setState({ counselors: response.data });
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
    if (args.requestType === "eventCreate") {
      RecurrenceRule.setRead(false);

      if (
        !this.scheduleObj.isSlotAvailable(
          args.data[0].startTime,
          args.data[0].endTime
        )
      ) {
        args.cancel = true;
      } else {
        args.data[0].RecurrenceRule = RecurrenceRule.getRecurrenceRule();
        args.data[0].recurrenceRule = args.data[0].RecurrenceRule;
        RecurrenceRule.setRecurrenceRule("");

        args.data[0].startTime = this.formatDate(args.data[0].startTime);
        args.data[0].endTime = this.formatDate(args.data[0].endTime);
        args.data[0].priority = "NORMAL";
        args.data[0].counselorId = UserProfile.getId();
        console.log(args.data[0]);

        console.log("Creation Date: ", args.data[0].creationDate);
        if (args.data[0].creationDate === undefined) {
          const response = await axios({
            method: "post",
            url: "/timeslot",
            data: args.data[0],
            headers: {
              "Content-Type": "application/json",
            },
          }).catch(function (error) {
            console.log("Error: " + error);
          });

          console.log(response.data);

          console.log(this.scheduleObj.dataModule.dataManager.dataSource);

          this.scheduleObj.addEvent(response.data);
        }
      }
    }

    console.log(args.requestType);
    if (args.requestType === "eventChange") {
      let data = args.data instanceof Array ? args.data[0] : args.data;
      data.recurrenceRule = null;
      data.startTime = this.formatDate(data.startTime);
      data.endTime = this.formatDate(data.endTime);
      data.RecurrenceRule = RecurrenceRule.getRecurrenceRule();
      data.recurrenceRule = data.RecurrenceRule;
      RecurrenceRule.setRecurrenceRule("");
      data.counselorId = UserProfile.getId();
      args.cancel = true;

      console.log("Change Data: ", data);
      const response = await axios({
        method: "put",
        url: "/timeslot/" + data.id,
        data: data,
        headers: {
          "Content-Type": "application/json",
        },
      }).catch(function (error) {
        console.log("Error: " + error);
      });

      console.log(response.data);
      this.scheduleObj.saveEvent(response.data);
    }

    if (args.requestType === "eventRemove") {
      console.log("Deleting...");
      console.log(args.data[0]);
      console.log(UserProfile.getId());
      console.log(args.data[0].createdBy);
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
    console.log(args);
    if (args.type === "Editor") {
      console.log(args);
      if (
        !this.scheduleObj.isSlotAvailable(
          args.data.startTime,
          args.data.endTime
        ) &&
        args.data.subject === "Session"
      ) {
        args.cancel = true;
      } else {
        RecurrenceRule.setRead(true);
        this.scheduleObj.eventWindow.recurrenceEditor = this.recurrObject;
      }

      // var formElement = args.element.querySelector(".e-schedule-form");
      // console.log(formElement);
      // var validator = formElement.ej2_instances[0];

      // validator.addRules("subject", { required: [true, "Required field"] });
      // console.log(
      //   "Recurrence Editor ",
      //   this.scheduleObj.eventWindow.recurrenceEditor
      // );
      // TODO: 1. Allow editor over own breaks only (Use this.state.selected)
    }
  }

  onEventRendered(args) {
    if (args.data.subject === "Session") {
      args.element.style.backgroundColor = "#f48ae6";
    }
    if (args.data.subject === "Break") {
      args.element.style.backgroundColor = "#464646";
    }
  }

  handleSubjectSelection(e) {
    if (e.target.value === "Session") {
      document.getElementById("priority").setAttribute("data-name", "priority");
      document.getElementById("priority").setAttribute("aria-required", "true");
      document.getElementById("priority_row").style.visibility = "visible";
      document.getElementById("priority_lbl").style.visibility = "visible";

      document.getElementById("student").setAttribute("data-name", "student");
      document.getElementById("student").setAttribute("aria-required", "true");
      document.getElementById("student").style.visibility = "visible";
      document.getElementById("student_lbl").style.visibility = "visible";

      // var formElement = document.querySelector(".e-schedule-form");
      // var validator = formElement.ej2_instances[0];
      // validator.addRules("priority", { required: [true, "Required field"] });
      // validator.addRules("student", { required: [true, "Required field"] });
    }

    if (e.target.value === "Break") {
      // var formElement = document.querySelector(".e-schedule-form");
      // var validator = formElement.ej2_instances[0];
      // validator.addRules("priority", { required: [false, "Required field"] });
      // validator.addRules("student", { required: [false, "Required field"] });

      console.log(document.getElementById("priority").style.display);
      document.getElementById("priority").setAttribute("data-name", "");
      document
        .getElementById("priority")
        .setAttribute("aria-required", "false");
      document.getElementById("priority_row").style.visibility = "hidden";
      document.getElementById("priority_lbl").style.visibility = "hidden";

      document.getElementById("student").setAttribute("data-name", "");
      document.getElementById("student").setAttribute("aria-required", "false");
      document.getElementById("student").style.visibility = "hidden";
      document.getElementById("student_lbl").style.visibility = "hidden";
    }
  }

  handleChange(args) {
    if (RecurrenceRule.getRead()) {
      RecurrenceRule.setRecurrenceRule(args.value);
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
            <td className="e-textlabel">Type</td>
            <td style={{ colspan: "4" }}>
              <DropDownListComponent
                id="subject"
                name="subject"
                placeholder="What are you planning?"
                data-name="subject"
                className="e-field e-input e-error e-subject"
                style={{ width: "100%" }}
                dataSource={["Session", "Break"]}
                onChange={this.handleSubjectSelection}
              ></DropDownListComponent>
            </td>
          </tr>

          <tr>
            <td
              className="e-textlabel"
              id="priority_lbl"
              style={{ visibility: "hidden" }}
            >
              Priority
            </td>
            <td
              style={{ colspan: "4", visibility: "hidden" }}
              id="priority_row"
            >
              <DropDownListComponent
                id="priority"
                placeholder="How urgent is your situation?"
                data-name="priority"
                name="priority"
                className="e-field e-input e-error e-subject"
                style={{ width: "100%" }}
                dataSource={["NORMAL", "INTERMEDIATE", "URGENT"]}
              ></DropDownListComponent>
            </td>
          </tr>
          <tr>
            <td
              className="e-textlabel"
              id="student_lbl"
              style={{ visibility: "hidden" }}
            >
              Student ID
            </td>
            <td style={{ colspan: "4", visibility: "hidden" }}>
              <input
                id="student"
                className="e-field e-input e-error"
                aria-required="true"
                aria-invalid="true"
                type="number"
                name="studentId"
                data-name="studentId"
                style={{
                  width: "100%",
                  marginLeft: "1.6rem",
                  marginBottom: "1.6rem",
                }}
              />
            </td>
          </tr>
          <tr>
            <td colSpan={4}>
              <RecurrenceEditorComponent
                style={{ width: "100%" }}
                frequencies={["none", "daily", "weekly"]}
                change={this.handleChange}
                ref={(recurrObject) => (this.recurrObject = recurrObject)}
                id="RecurrenceEditor"
              />
            </td>
          </tr>
          <tr style={{ height: "60px" }}></tr>

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
    if (props.subject === "Session") {
      return (
        <div className="template-wrap">
          <div className="subject" style={{ background: props.PrimaryColor }}>
            {props.subject}
          </div>
          <div className="subject" style={{ background: props.PrimaryColor }}>
            {" (" + props.priority + ")"}
          </div>
        </div>
      );
    } else {
      return (
        <div className="template-wrap">
          <div className="subject" style={{ background: props.PrimaryColor }}>
            {props.subject}
          </div>
        </div>
      );
    }
  }

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
          editorTemplate={this.editorTemplate.bind(this)}
          popupOpen={this.onPopupOpen.bind(this)}
          showQuickInfo={false}
          timeScale={{ enable: true, interval: 40, slotCount: 1 }}
          ref={(t) => (this.scheduleObj = t)}
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
              counselorId: { name: "counselorId" },
              studentId: { name: "studentId" },
            },
            template: this.eventTemplate.bind(this),
            // allowEditing: false,
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
