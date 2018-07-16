/**
 * react-native-checkbox-form
 * Checkbox component for react native, it works on iOS and Android
 * https://github.com/cuiyueshuai/react-native-checkbox-form.git
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  ScrollView,
  Text,
  Dimensions,
  TouchableWithoutFeedback
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

const WINDOW_WIDTH = Dimensions.get('window').width;

class CheckboxForm extends Component {
  constructor(props) {
    super(props);
    this.renderCheckItem = this.renderCheckItem.bind(this);
    this._onPress = this._onPress.bind(this);
    this.state = {
      dataSource: props.dataSource
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      dataSource: nextProps.dataSource
    });
  }

  static propTypes = {
    dataSource: PropTypes.array,
    formHorizontal: PropTypes.bool,
    labelHorizontal: PropTypes.bool,
    itemShowKey: PropTypes.string,
    itemCheckedKey: PropTypes.string,
    iconSize: PropTypes.number,
    iconColor: PropTypes.string,
    onChecked: PropTypes.func,
  };

  static defaultProps = {
    dataSource: [],
    formHorizontal: false,
    labelHorizontal: true,
    itemShowKey: 'label',
    itemCheckedKey: 'checked',
    iconSize: 20,
    iconColor: '#2f86d5',
  };

  _onPress(item, i) {
    const outputArr = this.state.dataSource.slice(0);
    outputArr[i] = item;
    this.setState({ dataSource: outputArr });

    if (this.props.onChecked) {
      this.props.onChecked(outputArr);
    }
  }

  renderCheckItem(item, i) {
    const { itemShowKey, itemCheckedKey, iconSize, iconColor, textStyle } = this.props;
    const isChecked = item[itemCheckedKey] || false;

    return (
      <TouchableWithoutFeedback
        key={i}
        onPress={() => {
          item[itemCheckedKey] = !isChecked;
          this._onPress(item, i);
        }}
      >
        <View
          style={{ flexDirection: this.props.labelHorizontal ? 'row' : 'column',
            justifyContent: 'center', alignItems: 'center' }}
        >
          <Icon
            name={isChecked ? 'md-checkbox' : 'ios-square-outline'}
            size={iconSize}
            color={iconColor}
          />
          <View
            style={{ marginLeft: 5 }}
          >
            <Text style={{...textStyle}}>{'' + item[itemShowKey]}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  render() {
    return (
      <ScrollView
        {...this.props}
        horizontal={ this.props.formHorizontal}
        style={[{ width: WINDOW_WIDTH }, this.props.style]}
      >
        {
          this.state.dataSource.map((item, i) => this.renderCheckItem(item, i))
        }
      </ScrollView>
    );
  }

}

export default CheckboxForm;
