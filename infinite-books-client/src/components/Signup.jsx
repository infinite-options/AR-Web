// TODO:
// error handling for email & password,
// password should have some complexity constraint,
// use redux to maintain app login state,
// the inputs are ugly,

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "./Button";
import { withRouter } from "react-router-dom";

// MUI
import { Paper, Tooltip, Typography } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

// Icons & images
import { FaQuestionCircle } from "react-icons/fa";

const styles = {
  container: {
    display: "flex",
    flexWrap: "nowrap",
    //border: "1px solid gray",
    height: 420,
    textAlign: "center",
    justifyContent: "center",
    padding: 15,
    margin: "auto",
    backgroundColor: "#e0f2f1",
    borderRadius: 5,
  },
  inputDiv: {
    display: "flex",
    flexWrap: "wrap",
    height: "100%",
    textAlign: "center",
    alignItems: "center",
    alignContent: "center",
    width: "65%",
    padding: "2px",
  },
  emailSignIn: {
    width: "50%",
    borderRight: "1px solid lightgray",
  },
  conditionalDiv: {
    // border: "1px solid black",
    width: "45%",
    height: "80%",
    padding: 10,
    margin: 10,
  },
  conditionalButton: {
    marginTop: 10,
    marginLeft: "auto",
    marginRight: "auto",
    height: 36,
    width: 74,
  },
  inputLeft: {
    width: "55%",
    margin: 2,
    padding: 5,
    marginTop: 6,
  },
  inputRight: {
    width: "85%",
    margin: 2,
    padding: 5,
    marginBottom: 10,
  },
  button: {
    textTransform: "none",
    fontSize: 14,
    backgroundColor: "#31555c",
    color: "#fff",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    marginTop: 7,
    marginBottom: 7,
    marginLeft: 10,
    marginRight: 15,
  },
  chipUnselected: {
    padding: 8,
    margin: 3,
    color: "gray",
  },
  chipSelected: {
    padding: 8,
    margin: 3,
    color: "blue",
  },
  text: {
    padding: "2px",
    color: "gray",
  },
  FormControl: {
    padding: 2,
    width: "90%",
  },
  InputLabel: {
    padding: 20,
  },
  error: {
    height: 6,
    color: "red",
    fontSize: 8,
    textDecoration: "italic",
  },
};

function Signup(props) {
  const url =
    "https://ls802wuqo5.execute-api.us-west-1.amazonaws.com/dev/api/v2/SignUp"; // TODO

  const [post, setPost] = useState({
    email: "",
    password: "",
    password2: "",
    username: "",
    pen_name: "",
    bio: "",
    language: "",
    likes_writing_about: "",
  });

  // When directed to this page from a link, returns to top of page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const clear = () => {
    setPost({
      email: "",
      password: "",
      password2: "",
      username: "",
      pen_name: "",
      bio: "",
      language: "",
      likes_writing_about: "",
    });
  };

  const clearErrors = () => {
    setErrors({
      ...errors,
      ["email"]: "",
      ["password"]: "",
      ["password2"]: "",
      ["username"]: "",
    });
  };

  function submitForm(e) {
    e.preventDefault();
    if (userRegistered) {
      props.history.push("/"); // <--- The page you want to redirect your user to. (home page for now)
    }
  }

  // For text fields
  const handleChange = (e) => {
    clearErrors();
    e.persist();
    setPost({ ...post, [e.target.name]: e.target.value });
    console.log(post);
  };

  const [userRegistered, setUserRegistered] = useState(false);

  const sendPostArgs = (e) => {
    if (validate(post.email, post.password, post.password2, post.username)) {
      // https://ls802wuqo5.execute-api.us-west-1.amazonaws.com/dev/api/v2/SignUp
      const post_url = url;
      console.log(post_url);
      let payload = {
        /*
          {
            "username":"testing",
            "first_name":"te",
            "last_name":"st",
            "pen_name":"name",
            "bio":"bio",
            "language":"en",
            "likes_writing_about":"test",
            "role":"testingrole",
            "gender":"M",
            "educationLevel":"test",
            "age":"100",
            "careerField":"test",
            "income":"10000000000000000",
            "email":"abcxyz@gmail.com",
            "phone":"4084084088",
            "interest":"good books",
            "hours":"10",
            "favorites":"fantasy",
            "social":"FALSE",
            "access_token":"NULL",
            "refresh_token":"NULL",
            "password":"1234"
          }
        */

        username: post.username,
        first_name: "",
        last_name: "",
        pen_name: post.pen_name,
        bio: post.bio,
        language: post.language,
        likes_writing_about: post.likes_writing_about,
        role: selectedOption,
        gender: gender,
        educationLevel: educationLevel,
        age: age,
        careerField: careerField,
        income: income,
        email: post.email,
        phone: "",
        interest: "",
        hours: "",
        favorites: "",
        social: "FALSE",
        access_token: "NULL",
        refresh_token: "NULL",
        password: post.password,
      };
      console.log(payload);
      axios
        .post(post_url, payload)
        .then((res) => {
          console.log(res);
          let arr = [{ message: res.data.message }];
          console.log(arr);
        })
        .catch((err) => {
          console.error(err);
        });
      clear();
    }
  };

  const [selectedOption, setSelectedOption] = useState("");
  const [readerDivShown, setReaderDivShown] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    password2: "",
    username: "",
  });

  useEffect(() => {}, [selectedOption]);

  const createClickHandler = (label) => (e) => {
    setSelectedOption(label);
  };

  const handleButtonClick = () => {
    setReaderDivShown(true);
  };

  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [educationLevel, setEducationLevel] = useState("");
  const [careerField, setCareerField] = useState("");
  const [income, setIncome] = useState("");

  //TODO: instead of having 6 different functions for each select event,
  // find a way to consolidate them into one.
  const handleGenderSelect = (e) => {
    setGender(e.target.value);
  };

  const handleAgeSelect = (e) => {
    setAge(e.target.value);
  };

  const handleEducationSelect = (e) => {
    setEducationLevel(e.target.value);
  };

  const handleCareerSelect = (e) => {
    setCareerField(e.target.value);
  };

  const handleIncomeSelect = (e) => {
    setIncome(e.target.value);
  };

  const validate = (email, password1, password2, username) => {
    let noErrors = true;
    if (typeof email !== "undefined") {
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!pattern.test(post.email)) {
        setErrors({
          ...errors,
          ["email"]: "Please enter valid email address.",
        });
        noErrors = false;
      }
      if (email === "") {
        setErrors({
          ...errors,
          ["email"]: "This is a required field.",
        });
        noErrors = false;
      }
    }
    if (typeof password1 !== "undefined") {
      if (password1 !== password2) {
        setErrors({
          ...errors,
          ["password"]: "Passwords must match.",
        });
        noErrors = false;
      }
      if (password1 === "") {
        setErrors({
          ...errors,
          ["password"]: "This is a required field.",
        });
        noErrors = false;
      }
      if (password2 === "") {
        setErrors({
          ...errors,
          ["password2"]: "This is a required field.",
        });
        noErrors = false;
      }
    }
    if (typeof username !== "undefined") {
      if (username === "") {
        setErrors({
          ...errors,
          ["username"]: "This is a required field.",
        });
        noErrors = false;
      }
    }
    if (noErrors) {
      setUserRegistered(true);
    }
    return noErrors;
  };

  const genders = ["Male", "Female", "Non-binary/Other", "Prefer not to say"];

  const ages = [
    "Under 18",
    "18-24",
    "25-34",
    "35-44",
    "45-54",
    "55-64",
    "65 or older",
  ];

  const educationLevels = [
    "Less than high school",
    "High school diploma or equivalent",
    "Some college, no degree",
    "Associate's degree",
    "Bachelor's degree",
    "Master's degree",
    "Doctoral or professional degree",
  ];

  const careerFields = [
    "Architecture and Engineering",
    "Arts and Design",
    "Building and Grounds Cleaning",
    "Business and Financial",
    "Community and Social Service",
    "Computer and Information Technology",
    "Construction and Extraction",
    "Education, Training, and Library",
    "Entertainment and Sports",
    "Farming, Fishing, and Forestry",
    "Food Preparation and Serving",
    "Healthcare",
    "Installation, Maintenance, and Repair",
    "Legal",
    "Life, Physical, and Social Science",
    "Management",
    "Math",
    "Media and Communication",
    "Military",
    "Office and Administrative Support",
    "Personal Care and Service",
    "Production",
    "Protective Service",
    "Sales",
    "Transportation and Material Moving",
  ];

  const incomes = [
    "Less than $25,000",
    "$25,000 to $49,999",
    "$50,000 to $74,999",
    "$75,000 to $99,999",
    "$100,000 to $149,999",
    "$150,000 to $200,000",
    "Over $200,000",
  ];

  const tooltipText =
    "The information you provide here will be used to help us customize our recommendations, and provide feedback to authors about demographic information. This data will be anonymized, and will not be sold or used to identify you.";
  function readerForm(props) {
    return (
      <>
        <Grid container direction="row" alignItems="center">
          <Typography style={{ padding: 10 }}>
            Please tell us a little bit about yourself.
          </Typography>

          <Tooltip arrow title={tooltipText}>
            <div>
              <FaQuestionCircle style={{ color: "grey" }} />
            </div>
          </Tooltip>
        </Grid>
        <FormControl style={styles.FormControl}>
          <InputLabel style={styles.InputLabel}>Gender</InputLabel>
          <Select value={gender} onChange={handleGenderSelect}>
            {genders.map((genderOption, index) => (
              <MenuItem key={index} value={genderOption}>
                {genderOption}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl style={styles.FormControl}>
          <InputLabel style={styles.InputLabel}>Education level</InputLabel>
          <Select value={educationLevel} onChange={handleEducationSelect}>
            {educationLevels.map((levelOption, index) => (
              <MenuItem key={index} value={levelOption}>
                {levelOption}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl style={styles.FormControl}>
          <InputLabel style={styles.InputLabel}>Age</InputLabel>
          <Select value={age} onChange={handleAgeSelect}>
            {ages.map((ageOption, index) => (
              <MenuItem key={index} value={ageOption}>
                {ageOption}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl style={styles.FormControl}>
          <InputLabel style={styles.InputLabel}>Career field</InputLabel>
          <Select value={careerField} onChange={handleCareerSelect}>
            {careerFields.map((careerOption, index) => (
              <MenuItem key={index} value={careerOption}>
                {careerOption}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl style={styles.FormControl}>
          <InputLabel style={styles.InputLabel}>Median Income</InputLabel>
          <Select value={income} onChange={handleIncomeSelect}>
            {incomes.map((incomeOption, index) => (
              <MenuItem key={index} value={incomeOption}>
                {incomeOption}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </>
    );
  }

  function authorForm(props) {
    return (
      <>
        <Typography style={{ padding: 10 }}>
          Please fill out some information about you as an author
        </Typography>
        <input
          name="pen_name"
          style={styles.inputRight}
          autoComplete="off"
          value={post.pen_name}
          placeholder="Your pen name"
          onChange={handleChange}
        />
        <textarea
          name="bio"
          rows="3"
          style={styles.inputRight}
          autoComplete="off"
          value={post.bio}
          placeholder="Bio"
          onChange={handleChange}
        />
        <input
          name="language"
          style={styles.inputRight}
          autoComplete="off"
          value={post.language}
          placeholder="Language you write in"
          onChange={handleChange}
        />
        <input
          name="likes_writing_about"
          style={styles.inputRight}
          autoComplete="off"
          value={post.likes_writing_about}
          placeholder="What do you like writing about?"
          onChange={handleChange}
        />
      </>
    );
  }

  function submitButton(props) {
    return (
      <>
        <Button
          buttonStyle="btn--primary"
          name="submitButton"
          onClick={() => sendPostArgs()}
        >
          Submit
        </Button>
      </>
    );
  }

  function handleConditionalRender() {
    switch (selectedOption) {
      case "reader":
        return (
          <>
            <div style={styles.conditionalDiv}>{readerForm()}</div>
            <div style={styles.conditionalButton}>{submitButton()}</div>
          </>
        );
      case "author":
        return (
          <>
            <div style={styles.conditionalDiv}>{authorForm()}</div>
            <div style={styles.conditionalButton}>{submitButton()}</div>
          </>
        );
      case "both": {
        if (!readerDivShown) {
          return (
            <>
              <div style={styles.conditionalDiv}>{readerForm()}</div>
              <div style={styles.conditionalButton}>
                <Button
                  buttonStyle="btn--primary"
                  name="submitButton"
                  onClick={handleButtonClick}
                >
                  Next
                </Button>
              </div>
            </>
          );
        } else {
          return (
            <>
              <div style={styles.conditionalDiv}>{authorForm()}</div>
              <div style={styles.conditionalButton}>{submitButton()}</div>
            </>
          );
        }
      }

      default:
        return (
          <>
            <div style={styles.conditionalDiv}></div>
            <div style={styles.conditionalButton}></div>
          </>
        );
    }
  }

  return (
    <>
      {/* outmost container */}
      <form onSubmit={submitForm.bind(this)}>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          style={styles.container}
        >
          <Paper elevation={3} style={styles.inputDiv}>
            <div style={styles.emailSignIn}>
              <div style={styles.error}>{errors["email"]}</div>
              <input
                name="email"
                type="email"
                style={styles.inputLeft}
                value={post.email}
                placeholder="Email Address"
                onChange={handleChange}
              />
              <div style={styles.error}>{errors["password"]}</div>
              <input
                name="password"
                type="password"
                style={styles.inputLeft}
                value={post.password}
                placeholder="Password"
                onChange={handleChange}
              />
              <div style={styles.error}>{errors["password2"]}</div>
              <input
                name="password2"
                type="password"
                style={styles.inputLeft}
                value={post.password2}
                placeholder="Confirm Password"
                onChange={handleChange}
              />
              <div style={styles.error}>{errors["username"]}</div>
              <input
                name="username"
                style={styles.inputLeft}
                value={post.username}
                placeholder="What should we call you?"
                onChange={handleChange}
              />

              <div>
                <Typography variant="h5" style={{ margin: 10, padding: 10 }}>
                  Who do you want to use this site as?
                </Typography>
                <Chip
                  style={
                    selectedOption === "reader"
                      ? styles.chipSelected
                      : styles.chipUnselected
                  }
                  label="Reader"
                  variant="outlined"
                  clickable
                  color={selectedOption === "reader" ? "primary" : "default"}
                  onClick={createClickHandler("reader")}
                />
                <Chip
                  style={
                    selectedOption === "author"
                      ? styles.chipSelected
                      : styles.chipUnselected
                  }
                  label="Author"
                  variant="outlined"
                  clickable
                  color={selectedOption === "author" ? "primary" : "default"}
                  onClick={createClickHandler("author")}
                />
                <Chip
                  style={
                    selectedOption === "both"
                      ? styles.chipSelected
                      : styles.chipUnselected
                  }
                  label="Both"
                  variant="outlined"
                  clickable
                  color={selectedOption === "both" ? "primary" : "default"}
                  onClick={createClickHandler("both")}
                />
              </div>
            </div>

            {handleConditionalRender()}
          </Paper>
        </Grid>
      </form>
    </>
  );
}

export default withRouter(Signup);
