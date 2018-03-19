import React, { Component } from 'react'
import { StyleSheet, View, Image, Text } from 'react-native'
import { connect } from 'react-redux'
import { ImagePicker, WingBlank, SegmentedControl, Button } from 'antd-mobile'

import { createAction,NavigationActions } from '../utils'

const data = [{
  url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
  id: '2121',
}, {
  url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
  id: '2122',
}]

@connect(({ themes }) => ({
  themesList: themes.list,
  loading: themes.loading,
 }))
class Home extends Component {
  static navigationOptions = {
    title: '首页',
    tabBarLabel: '首页',
    tabBarIcon: ({ focused, tintColor }) => (
      <Image
        style={[styles.icon, { tintColor: focused ? tintColor : 'gray' }]}
        source={require('../images/house.png')}
      />
    ),
  }

  state = {
    files: data,
    multiple: false,
  }

  onChange = (files, type, index) => {
    console.log(files, type, index)
    this.setState({
      files,
    })
  }

  onSegChange = (e) => {
    const index = e.nativeEvent.selectedSegmentIndex
    this.setState({
      multiple: index === 1,
    })
  }

  gotoDetail = () => {
    console.log('Detail')
    this.props.dispatch(NavigationActions.navigate({ routeName: 'Detail' }))
  }

  fetchThemes = () => {
    const { dispatch, } = this.props
    console.log('themes')
    dispatch(createAction('themes/fetch')())
  }

  render() {
    const { files } = this.state
    const { themesList } = this.props
    return (

      <View style={styles.container}>
        <Text>{`${JSON.stringify(themesList)}`}</Text>
        <WingBlank>
          <SegmentedControl
            values={['切换到单选', '切换到多选']}
            selectedIndex={this.state.multiple ? 1 : 0}
            onChange={this.onSegChange}
          />
          <ImagePicker
            files={files}
            onChange={this.onChange}
            onImageClick={(index, fs) => console.log(index, fs)}
            selectable={files.length < 5}
            multiple={this.state.multiple}
          />
        </WingBlank>
        <Button onClick={this.gotoDetail}>Goto Detail</Button>

        <Button onClick={this.fetchThemes}>获取豆瓣</Button>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 32,
    height: 32,
  },
})

export default Home
