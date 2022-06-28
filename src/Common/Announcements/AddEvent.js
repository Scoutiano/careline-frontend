import React from "react";
import ReactDom from "react-dom";
import { useState, useEffect } from "react";
import styles from "./AddEvent.module.css";
// import PropTypes from 'prop-types'; // ES6
// import { response } from "express";
// import DateTimeField from "react-bootstrap-datetimepicker";
import DateTimePicker from 'react-datetime-picker/dist/DateTimePicker.css';
import { Container } from "react-bootstrap";
import TopNav from "../../Student/Navigation/TopNav/TopNav";
const AddEvent = (props) => {

    const [eventBody, setEventBody] = useState({
        title: "",
        content: "",
        date: "",
    });
    const [title, setTitle] = useState("");
    const [btnText, setBtnText] = useState("")

    const titleText = {
        editTitle: "Edit Event",
        newTitle: "Add New Event",
    };
    const btnInfo = {
        editText: "Update",
        newText: "Add",
    }

    useEffect(() => {
        if (props.editMode === true) {

            setTitle(titleText.editTitle);
            setBtnText(btnInfo.editText);

        } else if (props.editMode === false) {
            setTitle(titleText.newTitle);
            setTitle(btnInfo.newText);
        }
    }, [props.editMode]);
    const updateDate = (event) => {
        eventBody.date = event.target.value;
    };
    const updateTitle = (event) => {
        eventBody.title = event.target.value;
    };
    const updateContent = (event) => {
        eventBody.content = event.target.value;
    };
    // useEffect(() => {
    //   setEventBody(eventBody);
    // }, [updateTitle, updateContent, updatePriority])
    const sendEvent = (event) => { }
    //here sned api with ticke info to backend to it can be fetched in the counslor side
    // const eventBody = {
    //   title: eventBody.title,
    //   content: eventBody.content,
    //   priority: eventBody.priority,
    // };
    // axios
    //   .post(
    //     "https://cors-anywhere.herokuapp.com/https://careline-bzu.herokuapp.com/event",
    //     eventBody
    //   )
    //   .then((response) => setEventId(response.data.id));
    //     event.preventDefault();
    //     const requestOption = {
    //         method: 'POST',
    //         body: JSON.stringify(eventBody),
    //         headers: { 'Content-Type': "application/json" }
    //     };
    //     fetch("https://careline.netlify.app/event", requestOption)
    //         .then(response => response.json())
    //         .then(res => console.log("success:", res))
    //         .then(data => setArrayEvents(data));
    // }
    return (
        <>
            <TopNav />
            {/* <div className="container-fluid bg-light" id="viewport"> */}
            <div className="row flex-nowrap">
                <Container className="col m-4 py-3 text-body">
                    <h1 className="shadow-sm mb-4 p-3 rounded bg-white">
                        {title}
                    </h1>

                    <div className={styles.modal}>
                        <div className={styles.container}>

                            <input
                                placeHolder="Event Title"
                                className={styles.input}
                                onChange={updateTitle}
                            >
                                {props.editMode ? eventBody.title : ""}
                            </input>

                            <textarea onChange={updateContent} placeHolder="Details" >
                                {props.editMode ? eventBody.details : ""}

                            </textarea>

                            <DateTimePicker format="y-MM-dd hh:mm:ss a" onChange={updateDate} >
                                {props.editMode ? eventBody.date : ""}
                            </DateTimePicker>

                            <div className={styles.footer}>
                                <button className={styles.saveBtn} onClick={sendEvent}>
                                    {btnText}
                                </button>
                                <button className={styles.closeBtn} onClick={props.onClose}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>

                </Container>
            </div>
           
        </>
    );
};

export default AddEvent;
