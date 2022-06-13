import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import {
  Inject,
  ScheduleComponent,
  Day,
  Week,
  Month,
} from "@syncfusion/ej2-react-schedule";
import { DataManager, ODataV4Adaptor } from "@syncfusion/ej2-data";
import { registerLicense } from "@syncfusion/ej2-base";

const Schedule = ({ dataSource }) => {
  registerLicense(
    "ORg4AjUWIQA/Gnt2VVhhQlFaclhJXGFWfVJpTGpQdk5xdV9DaVZUTWY/P1ZhSXxRdkNiW39ZcHRXQ2NUUUQ="
  );

  useEffect(() => {
    dataSource.forEach((element) => formatDate(element));
  }, []);

  const formatDate = (element) => {
    var stringStartDate = element.startTime.toString();
    stringStartDate = stringStartDate.substring(0, 10);
    var startDate = new Date(stringStartDate);
    startDate.setFullYear(stringStartDate.substring(0, 4));
    startDate.setMonth(stringStartDate.substring(5, 7) - 1);
    startDate.setDate(stringStartDate.substring(8, 10));
    startDate.setHours(stringStartDate.substring(11, 13));
    startDate.setMinutes(stringStartDate.substring(14, 16));

    element.startTime = startDate;

    var stringEndDate = element.startTime.toString();
    stringStartDate = stringEndDate.substring(0, 10);
    var endDate = new Date(stringEndDate);
    endDate.setFullYear(stringEndDate.substring(0, 4));
    endDate.setMonth(stringEndDate.substring(5, 7) - 1);
    endDate.setDate(stringEndDate.substring(8, 10));
    endDate.setHours(stringEndDate.substring(11, 13));
    endDate.setMinutes(stringEndDate.substring(14, 16));

    element.endTime = endDate;
  };
  const dataManger = new DataManager({
    url: "http://localhost:54738/Home/LoadData", // Here need to mention the web api sample running path
    crudUrl: "http://localhost:54738/Home/UpdateData",
    crossDomain: true,
    adaptor: new ODataV4Adaptor(),
  });

  return (
    <>
      {dataSource.map((session) => (
        <p>{session.startTime.toString()}</p>
      ))}
      <ScheduleComponent
        height="500px"
        width="700px"
        eventSettings={{
          dataSource: dataSource,
          fields: {
            // id: "id",
            // subject: { name: "subject" },
            startTime: { name: "startTime" },
            endTime: { name: "endTime" },
          },
          allowEditing: false,
        }}
      >
        <Inject services={[Day, Week, Month]} />
      </ScheduleComponent>
    </>
  );
};

export default Schedule;
