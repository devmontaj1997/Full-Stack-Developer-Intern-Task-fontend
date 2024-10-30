import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { PiDotsNineThin } from "react-icons/pi";
import FormHandleHooks from "../hooks/formHandleHooks";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  creatExerciseApiSlice,
  deleteExerciseApiSlice,
  deleteSaveExerciseApiSlice,
  getExerciseApiSlice,
  getSaveExerciseApiSlice,
  saveExerciseApiSlice,
} from "../feature/exercise/exerciseAPISlice";
import {
  exerciseSelector,
  setEmtyMessage,
} from "../feature/exercise/exerciseSlice";
import createTostify from "../utiles/createTostify";
const ExerciseAssignmentUI = () => {
  // usedispatch
  const dispatch = useDispatch();
  // useSelector
  const {
    exercise,
    saveExercise,
    message,
    error,
    loader,
    deleting,
    loaderForSaveExerccise,
  } = useSelector(exerciseSelector);

  
  

  // Create exercise
  const { input, handleSetInput, formReset } = FormHandleHooks({
    exercise: "",
    set: "",
    reps: "",
    holdTime: "",
    side: "",
    dayOfWeek: [],
    dailyFrequency: "",
    therapistNotes: "",
  });

  // get check box data
  const [dayOfWeek, setDayOfWeek] = useState([]);
  const handleInputCheckBox = (e) => {
    const { checked, value } = e.target;

    if (checked) {
      setDayOfWeek([...dayOfWeek, value]);
    } else {
      setDayOfWeek(dayOfWeek.filter((item) => item !== value));
    }
  };

  // handleInputSubMit
  const handleInputSubMit = (e) => {
    e.preventDefault();

    dispatch(creatExerciseApiSlice({ ...input, dayOfWeek }));

    setDayOfWeek([]);
  };

  // handleclearAll
  const handleClearAll = () => {
    formReset();
    setDayOfWeek([]);
  };
  // for delete exercise
  const handleDeleteExercise = (id) => {
    dispatch(deleteExerciseApiSlice(id));
  };
  // for delete saveExercise
  const handleDeletesaveExercise = (id) => {
    
   dispatch(deleteSaveExerciseApiSlice(id));
  };
  // for Duplicate exercise
  const handleDuplicateExercise = (item) => {
    dispatch(creatExerciseApiSlice(item));
  };
  // save exercise
  const handleInputsaveAscombo = (item) => {
    dispatch(saveExerciseApiSlice(item));
  };

  //  for handleShowsaveExercise
  const [showSaveData, setshowSaveData]= useState(false)
  const handleShowsaveExercise = (e) => {
    e.preventDefault()
    setshowSaveData(!showSaveData);
  };

  useEffect(() => {
    dispatch(getExerciseApiSlice());
    dispatch(getSaveExerciseApiSlice())
  }, [dispatch]);

  useEffect(() => {
    if (message) {
      createTostify(message, "success");
      dispatch(setEmtyMessage());
      formReset();
      setDayOfWeek([]);
    }
    if (error) {
      createTostify(error);
      dispatch(setEmtyMessage());
    }
  }, [message, error, formReset, dispatch]);
  return (
    <>
      <div className="mainDiv mt-3">
        <Row>
          <Col xs="0" md="1"></Col>
          <Col xs="12" md="10">
            <div className="mainContentArea">
              <Card>
                <Card.Body>
                  <Card.Title className="text-center pb-2 border-bottom">
                    Exercise Assignment
                  </Card.Title>

                  {/* Exercise Create Area Start */}
                  <div className="formArea mt-3">
                    <form action="">
                      <div className="parent">
                        <Row>
                          <Col xs="12" sm="6" md="3">
                            <div className="selectEx mb-2">
                              <Form.Select
                                aria-label="Default select example"
                                name="exercise"
                                onChange={handleSetInput}
                                value={input.exercise}
                              >
                                <option value="">Select Exercise</option>
                                <option value="LowerBody">Lower Body</option>
                                <option value="UpperBody">Upper Body</option>
                                <option value="Core">Core</option>
                              </Form.Select>
                            </div>
                          </Col>
                          <Col xs="6" sm="3" md="1">
                            <div className="Set mb-2">
                              <input
                                onChange={handleSetInput}
                                type="text"
                                name="set"
                                value={input.set}
                                className="form-control"
                                placeholder="Set"
                              />
                            </div>
                          </Col>
                          <Col xs="6" sm="3" md="1">
                            <div className="Reps mb-2">
                              <input
                                onChange={handleSetInput}
                                type="text"
                                name="reps"
                                value={input.reps}
                                className="form-control"
                                placeholder="Reps"
                              />
                            </div>
                          </Col>
                          <Col xs="12" sm="3" md="3">
                            <div className="HoldTime mb-2">
                              <input
                                onChange={handleSetInput}
                                type="text"
                                name="holdTime"
                                value={input.holdTime}
                                className="form-control"
                                placeholder="Hold Time (in seconds)"
                              />
                            </div>
                          </Col>
                          <Col xs="6" sm="6" md="2">
                            <div className="Side mb-2">
                              <Form.Select
                                aria-label="Default select example"
                                value={input.side}
                                name="side"
                                onChange={handleSetInput}
                              >
                                <option value="">Select Side</option>
                                <option value="Left">Left</option>
                                <option value="Right">Right</option>
                                <option value="LeftAndRight">
                                  Left and Right
                                </option>
                              </Form.Select>
                            </div>
                          </Col>
                          <Col xs="6" sm="3" md="2">
                            <div className="clearBtn">
                              <Button onClick={handleClearAll}>
                                Clear All
                              </Button>
                            </div>
                          </Col>
                        </Row>
                      </div>

                      {/* Exercise List Start */}
                      <div
                        className="fullArea p-2 rounded-3"
                        style={{ height: "350px", overflow: "scroll" }}
                      >
                        {exercise.length > 0
                          ? exercise
                              .slice()
                              .reverse()
                              .map((item) => (
                                <div
                                  key={item.id}
                                  className="exerciseArea mt-3 rounded-2 p-3"
                                  style={{ background: "#F2F5FA" }}
                                >
                                  <Row>
                                    <Col xxl="1" xl="1">
                                      <div className="icon">
                                        <PiDotsNineThin
                                          style={{
                                            fontSize: "40px",
                                            marginBottom: "20px",
                                            transform: "translate(0px, 15px)",
                                          }}
                                        />
                                      </div>
                                    </Col>
                                    <Col xxl="11" xl="11">
                                      <div className="rightArea">
                                        <table className="table">
                                          <tbody>
                                            <tr>
                                              <td>
                                                <div className="exerciseName">
                                                  <strong>
                                                    {item.exercise}
                                                  </strong>
                                                </div>
                                              </td>
                                              <td>
                                                <div className="DublicateButtonArea">
                                                  {item.side !==
                                                    "LeftAndRight" && (
                                                    <div
                                                      onClick={() =>
                                                        handleDuplicateExercise(
                                                          item
                                                        )
                                                      }
                                                      style={{
                                                        padding: "1px 10px",
                                                        cursor: "pointer",
                                                      }}
                                                      className="rounded-2 border-1 bg-primary text-light"
                                                    >
                                                      Duplicate
                                                    </div>
                                                  )}
                                                </div>
                                              </td>
                                              <td>
                                                <div className="buttonArea">
                                                  <div
                                                    style={{
                                                      padding: "1px 10px",
                                                    }}
                                                    className="rounded-2 border-1 bg-primary text-light"
                                                  >
                                                    {item.side}
                                                  </div>
                                                </div>
                                              </td>
                                              <td>
                                                <div className="deleteButtonArea">
                                                  <div
                                                    onClick={() =>
                                                      handleDeleteExercise(
                                                        item.id
                                                      )
                                                    }
                                                    style={{
                                                      padding: "1px 10px",
                                                      cursor: "pointer",
                                                    }}
                                                    className="rounded-2 border-1 bg-primary text-light"
                                                  >
                                                    Delete
                                                  </div>
                                                </div>
                                              </td>
                                              <td>
                                                <div className="saveAscombo">
                                                  <div
                                                    onClick={() =>
                                                      handleInputsaveAscombo(
                                                        item
                                                      )
                                                    }
                                                    style={{
                                                      padding: "1px 10px",
                                                      cursor: "pointer",
                                                    }}
                                                    className="rounded-2 border-1 bg-primary text-light"
                                                  >
                                                    Save Exercise
                                                  </div>
                                                </div>
                                              </td>
                                            </tr>
                                            <tr>
                                              <td>
                                                <span
                                                  className="d-block bg-white p-2 rounded"
                                                  style={{ fontWeight: "500" }}
                                                >
                                                  SetCount{" "}
                                                  <strong className="text-primary">
                                                    ({item.set})
                                                  </strong>
                                                </span>
                                              </td>
                                              <td>
                                                <span
                                                  className="d-block bg-white p-2 rounded"
                                                  style={{ fontWeight: "500" }}
                                                >
                                                  RepsCount{" "}
                                                  <strong className="text-primary">
                                                    ({item.reps})
                                                  </strong>
                                                </span>
                                              </td>
                                              <td>
                                                <span
                                                  className="d-block bg-white p-2 rounded"
                                                  style={{ fontWeight: "500" }}
                                                >
                                                  HoldTime{" "}
                                                  <strong className="text-primary">
                                                    ({item.holdTime})
                                                  </strong>
                                                  s
                                                </span>
                                              </td>
                                              <td colSpan="2"></td>
                                            </tr>
                                            <tr>
                                              <td colSpan="3">
                                                <div className="dayOfWeek d-flex align-items-center">
                                                  <div
                                                    className="bg-white p-2"
                                                    style={{
                                                      fontWeight: "500",
                                                      borderRight: "1px solid",
                                                    }}
                                                  >
                                                    Day Of Week
                                                  </div>
                                                  <ul className="d-flex flex-wrap mb-0">
                                                    {item.dayOfWeek.length > 0
                                                      ? item.dayOfWeek.map(
                                                          (day) => (
                                                            <li
                                                              key={day}
                                                              className="bg-white p-2"
                                                              style={{
                                                                listStyle:
                                                                  "none",
                                                                fontWeight:
                                                                  "500",
                                                                borderRight:
                                                                  "1px solid",
                                                              }}
                                                            >
                                                              {day}
                                                            </li>
                                                          )
                                                        )
                                                      : "No date found"}
                                                  </ul>
                                                </div>
                                              </td>
                                              <td colSpan="2">
                                                <div className="dailyFrequency">
                                                  <div
                                                    className="bg-white p-2"
                                                    style={{
                                                      fontWeight: "500",
                                                    }}
                                                  >
                                                    Daily Frequency{" "}
                                                    <strong className="text-primary">
                                                      ({item.dailyFrequency})
                                                    </strong>
                                                    /Day
                                                  </div>
                                                </div>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </div>
                                    </Col>
                                  </Row>
                                </div>
                              ))
                          : "No Exercise Found"}
                      </div>

                      {/* Days and Frequency Section */}
                      <div className="DayAndFrequencySection mt-3">
                        <Row>
                          <Col xs="12" md="9">
                            <div className="dayOfWeek">
                              <strong>Day Of Week</strong>
                              <div className="mt-2 d-flex gap-2">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="flexCheckDefault"
                                  name="dayOfWeek"
                                  value="sun"
                                  onChange={handleInputCheckBox}
                                  checked={dayOfWeek.includes("sun")}
                                />

                                <label className="form-check-label">Sun</label>

                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  name="dayOfWeek"
                                  value="mon"
                                  onChange={handleInputCheckBox}
                                  checked={dayOfWeek.includes("mon")}
                                />

                                <label className="form-check-label">Mon</label>

                                <input
                                  className="form-check-input "
                                  type="checkbox"
                                  name="dayOfWeek"
                                  value="tue"
                                  onChange={handleInputCheckBox}
                                  checked={dayOfWeek.includes("tue")}
                                />

                                <label className="form-check-label">Tue</label>

                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  name="dayOfWeek"
                                  value="wed"
                                  onChange={handleInputCheckBox}
                                  checked={dayOfWeek.includes("wed")}
                                />

                                <label className="form-check-label">Wed</label>

                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  name="dayOfWeek"
                                  value="thu"
                                  onChange={handleInputCheckBox}
                                  checked={dayOfWeek.includes("thu")}
                                />

                                <label className="form-check-label">Thu</label>

                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  name="dayOfWeek"
                                  value="fri"
                                  onChange={handleInputCheckBox}
                                  checked={dayOfWeek.includes("fri")}
                                />

                                <label className="form-check-label">Fri</label>

                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  name="dayOfWeek"
                                  value="sat"
                                  onChange={handleInputCheckBox}
                                  checked={dayOfWeek.includes("sat")}
                                />

                                <label className="form-check-label">Sat</label>
                              </div>
                            </div>
                          </Col>
                          <Col xs="12" md="3">
                            <div className="dailyFrequency">
                              <strong>Daily Frequency</strong>
                              <input
                                name="dailyFrequency"
                                onChange={handleSetInput}
                                type="text"
                                value={input.dailyFrequency}
                                className="form-control mt-1"
                                placeholder="sessions/Day"
                              />
                            </div>
                          </Col>
                        </Row>
                      </div>

                      {/* Therapist Notes Area */}
                      <div className="therapistNotes my-3">
                        <strong>Therapist Notes</strong>
                        <textarea
                          className="form-control mt-2"
                          name="therapistNotes"
                          onChange={handleSetInput}
                          value={input.therapistNotes}
                          style={{ background: "#EBF1FB" }}
                          placeholder="Add Notes"
                        ></textarea>
                      </div>

                      {/* Submit Area */}
                      <div className="submitArea justify-content-end d-flex gap-2">
                        <button
                          className="btn btn-primary"
                          onClick={handleShowsaveExercise}
                        >
                          {loaderForSaveExerccise
                            ? "loading....."
                            : " Show Save Exercise"}
                        </button>
                    
                        <button
                          className="btn btn-primary"
                          type="submit"
                          onClick={handleInputSubMit}
                        >
                          {loader ? "Creating....." : "Add Entry"}
                        </button>
                      </div>
                    </form>

                    {/* show Save Exercise  start*/}
                    {showSaveData && <div
                      className="fullArea p-2 rounded-3"
                      
                    >
                      {saveExercise.length > 0
                        ? saveExercise.slice().reverse()
                            .map((item) => (
                              <div
                                key={item.id}
                                className="exerciseArea mt-3 rounded-2 p-3"
                                style={{ background: "#F2F5FA" }}
                              >
                                <Row>
                                  <Col xxl="1" xl="1">
                                    <div className="icon">
                                      <PiDotsNineThin
                                        style={{
                                          fontSize: "40px",
                                          marginBottom: "20px",
                                          transform: "translate(0px, 15px)",
                                        }}
                                      />
                                    </div>
                                  </Col>
                                  <Col xxl="11" xl="11">
                                    <div className="rightArea">
                                      <table className="table">
                                        <tbody>
                                          <tr>
                                            <td>
                                              <div className="exerciseName">
                                                <strong>{item.exercise}</strong>
                                              </div>
                                            </td>
                                            <td>
                                              <div className="DublicateButtonArea">
                                                {item.side !==
                                                  "LeftAndRight" && (
                                                  <div
                                                    onClick={() =>
                                                      handleDuplicateExercise(
                                                        item
                                                      )
                                                    }
                                                    style={{
                                                      padding: "1px 10px",
                                                      cursor: "pointer",
                                                    }}
                                                    className="rounded-2 border-1 bg-primary text-light"
                                                  >
                                                    Duplicate
                                                  </div>
                                                )}
                                              </div>
                                            </td>
                                            <td>
                                              <div className="buttonArea">
                                                <div
                                                  style={{
                                                    padding: "1px 10px",
                                                  }}
                                                  className="rounded-2 border-1 bg-primary text-light"
                                                >
                                                  {item.side}
                                                </div>
                                              </div>
                                            </td>
                                            <td>
                                              <div className="deleteButtonArea">
                                                <div
                                                  onClick={() =>
                                                    handleDeletesaveExercise(
                                                      item.id
                                                    )
                                                  }
                                                  style={{
                                                    padding: "1px 10px",
                                                    cursor: "pointer",
                                                  }}
                                                  className="rounded-2 border-1 bg-primary text-light"
                                                >
                                                  {deleting ?"Deleting...": " Delete"}
                                                 
                                                </div>
                                              </div>
                                            </td>
                                            <td></td>
                                          </tr>
                                          <tr>
                                            <td>
                                              <span
                                                className="d-block bg-white p-2 rounded"
                                                style={{ fontWeight: "500" }}
                                              >
                                                SetCount{" "}
                                                <strong className="text-primary">
                                                  ({item.set})
                                                </strong>
                                              </span>
                                            </td>
                                            <td>
                                              <span
                                                className="d-block bg-white p-2 rounded"
                                                style={{ fontWeight: "500" }}
                                              >
                                                RepsCount{" "}
                                                <strong className="text-primary">
                                                  ({item.reps})
                                                </strong>
                                              </span>
                                            </td>
                                            <td>
                                              <span
                                                className="d-block bg-white p-2 rounded"
                                                style={{ fontWeight: "500" }}
                                              >
                                                HoldTime{" "}
                                                <strong className="text-primary">
                                                  ({item.holdTime})
                                                </strong>
                                                s
                                              </span>
                                            </td>
                                            <td colSpan="2"></td>
                                          </tr>
                                          <tr>
                                            <td colSpan="3">
                                              <div className="dayOfWeek d-flex align-items-center">
                                                <div
                                                  className="bg-white p-2"
                                                  style={{
                                                    fontWeight: "500",
                                                    borderRight: "1px solid",
                                                  }}
                                                >
                                                  Day Of Week
                                                </div>
                                                <ul className="d-flex flex-wrap mb-0">
                                                  {item.dayOfWeek.length > 0
                                                    ? item.dayOfWeek.map(
                                                        (day) => (
                                                          <li
                                                            key={day}
                                                            className="bg-white p-2"
                                                            style={{
                                                              listStyle: "none",
                                                              fontWeight: "500",
                                                              borderRight:
                                                                "1px solid",
                                                            }}
                                                          >
                                                            {day}
                                                          </li>
                                                        )
                                                      )
                                                    : "No date found"}
                                                </ul>
                                              </div>
                                            </td>
                                            <td colSpan="2">
                                              <div className="dailyFrequency">
                                                <div
                                                  className="bg-white p-2"
                                                  style={{
                                                    fontWeight: "500",
                                                  }}
                                                >
                                                  Daily Frequency{" "}
                                                  <strong className="text-primary">
                                                    ({item.dailyFrequency})
                                                  </strong>
                                                  /Day
                                                </div>
                                              </div>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </Col>
                                </Row>
                              </div>
                            ))
                        : "No Save Exercise Found"}
                    </div>}

                    

                    {/* show Save Exercise  end*/}
                  </div>
                </Card.Body>
              </Card>
            </div>
          </Col>
          <Col xs="0" md="1"></Col>
        </Row>
      </div>
    </>
  );
};

export default ExerciseAssignmentUI;
