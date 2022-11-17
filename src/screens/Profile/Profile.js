import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, {Component} from 'react'
import { auth, db } from '../../firebase/config'

class Profile extends Component {
  constructor(props){
    super(props)
    this.state ={
      allComments: []
    }
  }

  componentDidMount(){
    db.collection('post').onSnapshot(docs => {
      let comments = []
      docs.forEach(doc => {
        comments.push({
          id: doc.id,
          data: doc.data()
        })
      })

      this.setState({
        allComments: comments
      }, () => console.log(this.state.allComments))
    })
  }



  signOut(){
    auth.signOut()
    this.props.navigation.navigate('Login')
  }
  
  render(){
    return (
      <View>
        <Text>Perfil</Text>
        <text> ¡Hola! Mi nombre es {db.use}</text>
        <TouchableOpacity 
          onPress={() => this.signOut()}
          style={styles.button}  
        >
          <Text>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  button:{
    padding:10,
    borderColor:'red',
    borderWidth: 1
  }
})


export default Profile