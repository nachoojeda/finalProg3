import { View, Text, TouchableOpacity, StyleSheet,FlatList, Image } from 'react-native'
import React, {Component} from 'react'
import { auth, db } from '../../firebase/config'

class Profile extends Component {
  constructor(props){
    super(props)
    this.state ={
      allComments: [],
      infoUser: [],
      
      
    }
  }

  componentDidMount(){
    db.collection('post').where('owner', '==', auth.currentUser.email).onSnapshot(docs => {
      let comments = []
      docs.forEach(doc => {
        comments.push({
          id: doc.id,
          data: doc.data()
        })
      })

      this.setState({
        allComments: comments
      })
    })
  
  
  db.collection('users').where('owner', '==', '${auth.currentUser.email}').onSnapshot(docs => {
    let users = []
    docs.forEach(doc => {
      users.push({
        id: doc.id,
        data: doc.data()
      }) 
      this.setState({
        infoUser: users
      })
    })
  })
  }

   /*componentWillUnmount(){
    db.collection('users').onSnapshot(
      docs=>{
          let usuario = [];
          docs.forEach( doc =>{
              usuario.push({
                  id: doc.id,
                  data: doc.data()
              })
              this.setState({
                  
              })
          
          })
      })
  } */
  


  signOut(){
    auth.signOut()
    this.props.navigation.navigate('Login')
  }
  
  render(){
    return (
      <View>
        <Text>Perfil</Text>
        <Text> 
          ¡Hola! {this.state.infoUser[0]?.data.nombreDeUsuario}
          
        
        </Text>
        
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