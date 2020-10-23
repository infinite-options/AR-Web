import React from "react";

//mui
import { Paper } from "@material-ui/core";

const styles = {
  container: {
    width: "90%",
    height: "auto",
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    alignItems: "center",
    marginLeft: "auto",
    marginRight: "auto",
    padding: 20,
  },
};

function ReaderProfile(props) {
  return (
    <>
      <Paper style={styles.container}>
        <form>
          In order to help provide authors with some statistical information,
          please take a moment to tell us about yourself. Your answers will be
          anonymized, and will not be associated with you in any way. For more
          information, check out our privacy policy.
          <label>
            TBD: <input type="text" name="name" />
          </label>
          <label>
            TBD: <input type="text" name="name" />
          </label>
          <label>
            TBD: <input type="text" name="name" />
          </label>
          <label>
            TBD: <input type="text" name="name" />
          </label>
          <label>
            TBD: <input type="text" name="name" />
          </label>
          <label>
            TBD: <input type="text" name="name" />
          </label>
          <label>
            TBD: <input type="text" name="name" />
          </label>
          <label>
            TBD: <input type="text" name="name" />
          </label>
          <label>
            TBD: <input type="text" name="name" />
          </label>
          <label>
            TBD: <input type="text" name="name" />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </Paper>
    </>
  );
}
export default ReaderProfile;
