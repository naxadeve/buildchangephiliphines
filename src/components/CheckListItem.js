import React, { Component } from "react";
import { View, Text, LayoutAnimation } from "react-native";
import { Button, CheckBox, Card } from "react-native-elements";
import { Actions } from "react-native-router-flux";
import { ToggleCircle } from "./common";
import { strings, getLocalizedText } from "../../locales/strings";

class CheckListItem extends Component {
  constructor() {
    super();
    this.state = {
      checked: false
    };
  }

  render() {
    const name = getLocalizedText(
      this.props.data.localtext,
      this.props.data.text
    );
    return (
      <Card title={name} style={styles.container}>
        <CheckBox
          center
          title="Pending"
          checkedTitle="Completed"
          iconType="material-community"
          checkedIcon="check-outline"
          uncheckedIcon="close-outline"
          uncheckedColor="red"
          onPress={() => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
            this.setState({ checked: !this.state.checked });
          }}
          checked={this.state.checked}
        />
        <Button
          buttonStyle={{
            backgroundColor: "#6383aa"
          }}
          onPress={() => Actions.ReportForm({ checklist: this.props.data })}
          title={strings.action_report}
        />
      </Card>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 14,
    color: "#000"
  },
  subtitleStyle: {
    paddingLeft: 12,
    fontSize: 18,
    color: "#ddd"
  },
  cointainerStyle: {
    justifyContent: "space-between",
    borderBottomWidth: 0,
    backgroundColor: "#fff",
    flexDirection: "row",
    position: "relative"
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between"
  }
};

export default CheckListItem;
