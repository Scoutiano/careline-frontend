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
      // TODO: Create sessions OR breaks
    }

    if (args.requestType === "eventRemove") {
      // TODO: Remove own breaks & sessions only (Use this.state.selected)
    }
  }

  onPopupOpen(args) {
    if (args.type === "Editor") {
      // TODO: 1. Allow editor over own breaks only (Use this.state.selected)
    }

    if (args.type === "QuickInfo") {
      // TODO: All
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

  editorTemplate(props) {
    // TODO: Template containing:
    //        1. Subject (Break, Session)
    //        2. Priority
    //        3. Timeslot (Pre-selected)
    //        4. If session, enter student (Must add to API)
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
                placeholder="What are you planning?"
                data-name="subject"
                className="e-field"
                style={{ width: "100%" }}
                dataSource={["Break", "Session"]}
                // TODO onChange (Change form once selection is made)
                required
              ></DropDownListComponent>
            </td>
          </tr>
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
    // TODO: Event template containing:
    //       1. Subject (Session or Break)
    //       2. Priority (if subject is Session)
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
          popupOpen={this.onPopupOpen.bind(this)}
          editorTemplate={this.editorTemplate.bind(this)}
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
