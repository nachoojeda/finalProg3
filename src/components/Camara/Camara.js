import { Text, View, StyleSheet} from 'react-native'
import React, { Component } from 'react'
import {AutoFocus, Camera} from 'expo-camera'

 class Camara extends Component {

    constructor(){
        super()
        this.metodosCamara = null
        this.state = {
          showCamara: false
        }
    }
    componentDidMount(){
        Camera.requestCameraPermissionsAsync()
        .then(()=> {
          this.setState({
            showCamara: true
          })
        })
        .catch(err => console.log(err))
    }
  render() {
    return (
      <View style={styles.container}>
        <Camera style={styles.camaraBody}
                type={Camera.Constants.Type.back}
                ref={metodos => this.metodosCamara = metodos}/>
        <Text>Camera</Text>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container:{
      flex:1
  },
  camaraBody:{
      height: 500
  }
})
export default Camara