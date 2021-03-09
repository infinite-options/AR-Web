/* TODO:
  - need to test more for error cases with google signup
  - error handling for email & password,
  - password should have some complexity constraint,
  - styles are ugly, especially inputs
  - stuff like bio etc. are never used on the site
  - make first and last name required so books don't show up with a blank author name
  - tell the user to expect a confirmation email (alert not working)
*/

import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Button } from "../Button";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import SocialLogin from "./SocialLogin";

// MUI
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Tooltip, Typography } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import * as MuiButton from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";

// Icons & images
import { FaQuestionCircle } from "react-icons/fa";
import { FaGoogle, FaFacebookF, FaEnvelope } from "react-icons/fa";

const styles = {
  container: {
    display: "flex",
    flexWrap: "nowrap",

    height: "auto",
    textAlign: "center",
    justifyContent: "center",
    margin: "auto",
    backgroundColor: "#F5F5F5",
  },
  inputDiv: {
    display: "flex",
    flexWrap: "wrap",
    height: "100%",
    textAlign: "center",
    alignItems: "center",
    alignContent: "center",
    width: "65%",
  },
  emailSignIn: {
    padding: 0,
    margin: 0,
  },
  conditionalDiv: {
    //border: "1px solid black",
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
  inputUsername: {
    width: "55%",
    margin: 2,
    padding: 5,
    marginTop: 18,
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
    marginTop: 6,
  },
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    height: 420,
    borderRight: "1px solid silver",
  },
}));

function Signup(props) {
  const signup_url = process.env.REACT_APP_SERVER_BASE_URI + "SignUp";

  const [post, setPost] = useState({
    email: "",
    password: "",
    confirmPassword: "",
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
      confirmPassword: "",
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
      ["confirmPassword"]: "",
      ["username"]: "",
      ["request"]: "",
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
  };

  const [googleButtonClicked, setGoogleButtonClicked] = useState(false);
  const [userRegistered, setUserRegistered] = useState(false);
  const [userSocialMedia, setUserSocialMedia] = useState("FALSE");
  const [accessToken, setAccessToken] = useState("NULL");
  const [socialId, setSocialId] = useState("NULL");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastname] = useState("");
  const [email, setEmail] = useState("");

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    request: "",
  });

  const googleCallback = (profileObject, responseAccessToken) => {
    console.log(profileObject);
    setUserSocialMedia("GOOGLE");
    setEmail(profileObject.email);
    setAccessToken(responseAccessToken);
    setFirstName(profileObject.givenName);
    setLastname(profileObject.familyName);
    setSocialId(profileObject.googleId);
    setGoogleButtonClicked(true);
  };

  const sendPostArgs = (e) => {
    if (
      validate(post.email, post.password, post.confirmPassword, post.username)
    ) {
      let payload = {
        username: post.username,
        first_name: googleButtonClicked ? firstName : post.first_name,
        last_name: googleButtonClicked ? lastName : post.last_name,
        pen_name: "", // TODO maybe in the future give users this option
        language: "",
        likes_writing_about: "",
        bio: post.bio,
        role: selectedOption,
        gender: gender,
        educationLevel: educationLevel,
        age: age,
        careerField: careerField,
        income: income,
        email: email,
        phone: "",
        interest: "",
        hours: "",
        favorites: "",
        social: userSocialMedia,
        user_access_token: accessToken,
        user_refresh_token: "FALSE",
        mobile_access_token: "FALSE",
        mobile_refresh_token: "FALSE",
        user_refresh_token: "NULL",
        user_created_at: getDateTime(),
        social_id: socialId,
        password: post.password,
      };

      console.log(payload);
      axios
        .post(signup_url, payload)
        .then((res) => {
          console.log(res);
          if (res.data.code === 200) {
            console.log("Registration successful");
            setUserRegistered(true);
            // TODO: where to redirect after successful registration. log them in?
            props.history.push("/");
          } else if (res.data.code === 409) {
            console.log("Email already taken");
            setErrors({
              ...errors,
              ["request"]: "This email has already been registered.",
            });
          }
        })
        .catch((err) => {
          console.error(err);
        });

      clear();
    }
  };

  const getDateTime = () => {
    var today = new Date();

    var date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();

    var time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    var dateTime = date + " " + time;
    return dateTime;
  };

  const [selectedOption, setSelectedOption] = useState("");
  const [readerDivShown, setReaderDivShown] = useState(false);

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

  const validate = (email, password, confirmPassword, username) => {
    let noErrors = true;
    // if value is 1, user is doing social sign up
    if (!tabValue) {
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
      if (typeof password !== "undefined") {
        if (password !== confirmPassword) {
          setErrors({
            ...errors,
            ["password"]: "Passwords must match.",
          });
          noErrors = false;
        }
        if (password === "") {
          setErrors({
            ...errors,
            ["password"]: "This is a required field.",
          });
          noErrors = false;
        }
        if (confirmPassword === "") {
          setErrors({
            ...errors,
            ["confirmPassword"]: "This is a required field.",
          });
          noErrors = false;
        }
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
    { display: "Less than high school", value: "less than high school" },
    { display: "High school diploma or equivalent", value: "high school" },
    { display: "Some college, no degree", value: "some college no degree" },
    { display: "Associate's degree", value: "associates" },
    { display: "Bachelor's degree", value: "bachelors" },
    { display: "Master's degree", value: "masters" },
    { display: "Doctoral or professional degree", value: "doctorate or phd" },
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
              <MenuItem key={index} value={levelOption.value}>
                {levelOption.display}
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
        {!googleButtonClicked && (
          <>
            <input
              name="first_name"
              style={styles.inputRight}
              autoComplete="off"
              value={post.first_name}
              placeholder="First name"
              onChange={handleChange}
            />
            <input
              name="last_name"
              style={styles.inputRight}
              autoComplete="off"
              value={post.last_name}
              placeholder="Last name"
              onChange={handleChange}
            />
          </>
        )}
        <textarea
          name="bio"
          rows="3"
          style={styles.inputRight}
          autoComplete="off"
          value={post.bio}
          placeholder="Bio"
          onChange={handleChange}
        />
        {/* <input
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
        /> */}
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
            <div style={styles.conditionalDiv}>
              {readerForm()}
              <div style={styles.conditionalButton}>{submitButton()}</div>
            </div>
          </>
        );
      case "author":
        return (
          <>
            <div style={styles.conditionalDiv}>
              {authorForm()}
              <div style={styles.conditionalButton}>{submitButton()}</div>
            </div>
          </>
        );
      case "both": {
        if (!readerDivShown) {
          return (
            <>
              <div style={styles.conditionalDiv}>
                {readerForm()}
                <div style={styles.conditionalButton}></div>

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
              <div style={styles.conditionalDiv}>
                {authorForm()}
                <div style={styles.conditionalButton}>{submitButton()}</div>
              </div>
            </>
          );
        }
      }

      default:
        return (
          <>
            <div style={styles.conditionalDiv}>
              <div style={styles.conditionalButton}></div>
            </div>
          </>
        );
    }
  }

  const roleSelector = () => {
    return (
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
    );
  };

  const classes = useStyles();
  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  useEffect(() => {}, [tabValue]);

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
            <div className={classes.root}>
              <AppBar position="static">
                <Tabs
                  value={tabValue}
                  onChange={handleTabChange}
                  aria-label="sign up tab"
                  centered
                >
                  <Tab
                    label="Email sign up"
                    icon={<FaEnvelope />}
                    {...a11yProps(0)}
                  />
                  <Tab
                    label="Social sign up"
                    icon={<FaGoogle />}
                    {...a11yProps(1)}
                  />
                </Tabs>
              </AppBar>
              <TabPanel value={tabValue} index={0}>
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
                  <div style={styles.error}>{errors["confirmPassword"]}</div>
                  <input
                    name="confirmPassword"
                    type="password"
                    style={styles.inputLeft}
                    value={post.confirmPassword}
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
                  {roleSelector()}
                </div>
              </TabPanel>
              <TabPanel value={tabValue} index={1}>
                <SocialLogin
                  googleCallback={googleCallback}
                  callingComponent={"Signup"}
                />
                {googleButtonClicked && (
                  <>
                    <div style={styles.error}>{errors["username"]}</div>
                    <input
                      name="username"
                      style={styles.inputUsername}
                      value={post.username}
                      placeholder="What should we call you?"
                      onChange={handleChange}
                    />
                    {roleSelector()}
                    <div style={styles.error}>{errors["request"]}</div>
                  </>
                )}
              </TabPanel>
            </div>

            {handleConditionalRender()}
          </Paper>
        </Grid>
      </form>
    </>
  );
}

export default withRouter(Signup);
