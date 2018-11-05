import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { getLocalizedText } from '../../locales/strings';

class CheckListItem extends Component {
  constructor() {
    console.log('constructor');
    super();
    this.state = {
      checked: false
    };
  }
  componentDidMount() {
      this.setState({ checked: this.props.data.status });
}


  render() {
    console.log('********');
    console.log(this.props.data);
    console.log('**********');
    console.log(this.state.checked);
    const name = getLocalizedText(
      this.props.data.localtext,
      this.props.data.text
    );

    return (
      <View style={styles.container}>
      <CheckBox
        title={name}
        checkedIcon='check-square-o'
        uncheckedIcon='square-o'
        uncheckedColor='red'
        onPress={() => {
          this.props.dispatch(requestPerson({ checklistItemData: this.props.data, checklistItemValue: !this.state.checked, userId: this.props.currentUserId }));
          this.setState({ checked: !this.state.checked });
        }}
        checked={this.state.checked}
        containerStyle={{ padding: 20, margin: 0, marginRight: 0, marginLeft: 0, backgroundColor: 'white' }}
        textStyle={{ fontSize: 16 }}
      />
      <TouchableOpacity
        onPress={() => Actions.ReportEngineer({ substep: this.props.data.substep, stepId: this.props.data.step })}
        style={{ backgroundColor: '#FAFAFA', height: 40, borderWidth: 0, alignItems: 'center', justifyContent: 'center' }}
      >
        <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold' }}>Report</Text>
      </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  console.log('CHECKLISTKO_mapStateToPropsko_bhitra');
  console.log(state);
  return {
    currentUserGroup: state.currentUserGroup.currentUserGroup,
    currentUserId: state.currentUserGroup.currentUserId,
  };
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    flexDirection: 'column',
    flex: 1,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)'
  }
});

export default connect(mapStateToProps)(CheckListItem);
