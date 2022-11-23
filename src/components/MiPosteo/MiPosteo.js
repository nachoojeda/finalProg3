import { Text, View , TouchableOpacity, Image, StyleSheet} from 'react-native'
import React, { Component } from 'react'
import {FontAwesome} from '@expo/vector-icons'
import {db, auth} from '../../firebase/config'
import firebase from 'firebase'

class Posteo extends Component {

  constructor(props){
    super(props)
    this.state = {
      likeCount: this.props.data.likes.length,
      isMyLike: false
    }
  }

  componentDidMount(){
    let myLike = this.props.data.likes.includes(auth.currentUser.email)
    if(myLike){
      this.setState({
        isMyLike:true
      })
    }
  }

  like(){
    db
    .collection('post')
    .doc(this.props.id)
    .update({
      likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
    })
    .then(()=> {
      this.setState({
        isMyLike:true,
        likeCount: this.state.likeCount + 1
      })
    })
    .catch(err => console.log(err))

  }


  unlike(){
    db
    .collection('post')
    .doc(this.props.id)
    .update({
      likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
    })
    .then(()=> {
      this.setState({
        isMyLike:false,
        likeCount: this.state.likeCount - 1
      })
    })
    .catch(e => console.log(e))
  }

  deletePost(){
    db.collection('post')
    .doc(this.props.id)
    .delete({ 
    })
    .then()
}

  render() {
    console.log(this.props)
    return (
      <View style={styles.contenedor}>
         
        <TouchableOpacity onPress={()=> this.props.navigation.navigate(
        'HomeNavigation',
        {
          screen: 'FriendProfile',
          params:{
            email:this.props.data.owner
          }
        }
      )}>
        <Text style={styles.texto}> Posteo de : {this.props.data.owner} </Text>
      </TouchableOpacity>
        <Image style={styles.image} 
                         source={{uri:this.props.data.foto}}
                         resizeMode='contain'/>

        <Text style={styles.texto}>"{this.props.data.description}"</Text>
      
       <View>
       <Text style={styles.texto}> Likes: {this.state.likeCount}</Text> 
      {
          this.state.isMyLike ? 
          <TouchableOpacity style={styles.texto}
          onPress={()=> this.unlike()}>
          <FontAwesome name='heart' color='black' size={14} />
        </TouchableOpacity> 
        :
        <TouchableOpacity style={styles.texto}
        onPress={()=> this.like()}>
          <FontAwesome name='heart-o' color='red' size={14} />
        </TouchableOpacity>
        }
       </View>


       <View>
          <TouchableOpacity onPress={() => this.props.navigation.navigate(
            'Comment',
            {id:this.props.id}
            )}>
            <Text style={styles.boton}> Agregar comentario</Text>
          </TouchableOpacity>
        </View>
        <View>
        <TouchableOpacity style={styles.boton} onPress={()=> this.deletePost()}> <Text>Borrar Post</Text> </TouchableOpacity>
        </View>
       
      </View>

    )
  }
}

const styles = StyleSheet.create({
  image: {
   height: 400,
   width: 400, 
   alignItems: 'center',

 } 

 ,

 contenedor:{
  flex:3,
  backgroundColor: 'rgb(255,255,242)',
  alignItems: 'center',
  justifyContent: 'center',
  margin: 30
}
,
texto:{
  backgroundColor: 'rgb(255,255,242)',
  fontFamily: 'monospace',
  fontSize: 20,
  textAlign: 'center',
  color: 'rgb(128, 128, 128)',
  

}, 
boton:{
  fontFamily: 'monospace',
  fontSize: 16,
  margin: 10,
  backgroundColor: 'rgb(173, 216, 230)',
  borderRadius: 20,
  textAlign: 'center',
  padding: 5

},
})

export default Posteo



















