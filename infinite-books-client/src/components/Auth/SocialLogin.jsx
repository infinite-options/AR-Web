// Called by Login.jsx

import React, { useContext } from "react";
import GoogleLogin from "react-google-login";
import Cookies from "js-cookie";
import axios from "axios";
import { Grid } from "@material-ui/core";
import { AuthContext } from "./AuthContext";
import { withRouter } from "react-router";

const SocialLogin = (props) => {
  const Auth = useContext(AuthContext);

  const responseGoogle = (response) => {
    console.log(response);
    if (response.profileObj) {
      console.log("Google response received.");
      props.googleCallback(response.profileObj, response.accessToken);

      if (props.callingComponent === "Login") {
        let responseObj = {
          email: response.profileObj.email,
          password: "",
          social_id: response.profileObj.googleId,
          signup_platform: "GOOGLE",
        };
        socialLoginAttempt(responseObj, response.accessToken);
      }
    } else {
      console.log("Google login unsuccessful");
    }
  };

  const socialLoginAttempt = (responseObj, accessToken) => {
    console.log(responseObj, accessToken);
    axios
      .post(process.env.REACT_APP_SERVER_BASE_URI + "Login", responseObj)
      .then((res) => {
        console.log(res);
        if (res.data.code === 200) {
          let userInfo = res.data.result[0];
          //console.log(userInfo);
          Cookies.set("login-session", "good");
          Cookies.set("user_uid", userInfo.user_uid);
          Auth.setIsAuth(true);
          Auth.setUsername(userInfo.username);
          let newAccountType = userInfo.role.toLowerCase();
          switch (newAccountType) {
            case "admin":
              Auth.setAuthLevel(4);
              props.history.push("/");
              break;
            case "both":
              Auth.setAuthLevel(3);
              props.history.push("/authors");
              break;
            case "author":
              Auth.setAuthLevel(2);
              props.history.push("/authors");
              break;
            case "reader":
              Auth.setAuthLevel(1);
              props.history.push("/readers");
              break;
            default:
              Auth.setAuthLevel(0);
              props.history.push("/");
              break;
          }
          props.closeHandler();
        } else if (res.data.code === 404) {
          props.history.push("/", {
            email: responseObj.email,
            accessToken: accessToken,
            socialId: responseObj.socialId,
            signup_platform: responseObj.platform,
          });
        } else if (res.data.code === 411) {
          console.log("Wrong social media");
          props.setError("social");
          let startIndex = res.data.message.indexOf("'");
          startIndex += 1;
          let endIndex = res.data.message.indexOf("'", startIndex + 1);
          let socialMediaUsed = res.data.message.slice(startIndex, endIndex);
          console.log(socialMediaUsed);
          let socialMediaUsedFormat =
            socialMediaUsed.charAt(0) + socialMediaUsed.slice(1).toLowerCase();
          let newErrorMessage = "Use " + socialMediaUsedFormat + " to login";
          props.setErrorMessage(newErrorMessage);
        } else if (res.data.code === 406) {
          console.log("Use Password Login");
          props.setError("social");
          props.setErrorMessage("Use email and password to log in.");
        } else {
          console.log("Unknown log in error");
          props.setError("Log in failed, please try again later.");
        }
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response);
        }
        console.log(err);
      });
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          isSignedIn={false}
          buttonText="Continue with Google"
          disable={false}
          cookiePolicy={"single_host_origin"}
          style={{ borderRadius: "10px" }}
        />
      </Grid>
    </Grid>
  );
};

export default withRouter(SocialLogin);
