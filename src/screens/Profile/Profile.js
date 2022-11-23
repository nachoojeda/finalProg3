import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
import React, { Component } from 'react'
import { auth, db } from '../../firebase/config'
import Posteo from '../../components/Posteo/Posteo';
import MiPosteo from '../../components/MiPosteo/MiPosteo'

//Nombre de usuario. 
// Email del usuario.
// Mini bio (si la cargó al registrarse).
// Foto de perfil (si cargó una al registrarse).
// La cantidad total de posteos publicados por el usuario.
// Mostrar todos los posteos del usuario. 

// Permitir borrar posteos.
// Botón para el logout completo del usuario. Si el logout se realiza correctamente la aplicación debe redirigir al usuario a la pantalla de login.
// Las pantallas serán accesibles únicamente para los usuarios logueados.


class Profile extends Component {

  //falta pasar las props de navegacion para que cuando haga sign out mande al usuario a la pagina login

  constructor(props) {
    super(props)
    this.state = {
      allPosts: [],
      infoUser: {},
      id: ''
    }
  }
  componentDidMount() {

    db.collection('post').where('owner', '==', auth.currentUser.email)
      .orderBy('createdAt', 'desc')
      .onSnapshot(docs => {
        let posts = []
        docs.forEach(doc => {
          posts.push({
            id: doc.id,
            data: doc.data()
          })
        })
        this.setState({
          allPosts: posts
        },
          () => console.log(this.state.allPosts)
        )

      })

    db.collection('users')
      .where('creador', '==', auth.currentUser.email)
      .onSnapshot(doc => {
        doc.forEach(doc =>
          this.setState({
            id: doc.id,
            infoUser: doc.data()
          }))

      })


  }

  //   componentWillUnmount(){
  //     db.collection('users').onSnapshot(
  //         docs=>{
  //             let usuario = [];
  //             docs.forEach( doc =>{
  //                 usuario.push({
  //                     id: doc.id,
  //                     data: doc.data()
  //                 })
  //                 this.setState({

  //                 })
  //             })
  //         }
  //     )
  //     }

  // eliminar(){
  //     db.collection('users').doc
  //     .delete(

  //     ).then(()=> 
  //     this.props.navigation.navigate('Register'))

  // }

  signOut() {
    auth.signOut()
    this.props.navigation.navigate('Login')
  }
  render() {
    return (
      <View style={styles.contenedor}>
      <>
        <div>
          <Text style={styles.container0}>Este es tu perfil!</Text>
          <li>

            <ul><Text style={styles.container3} > Bienvenido a tu perfil {this.state.infoUser.nombreDeUsuario}! </Text></ul>
            <ul><Text style={styles.container3}> La biografia del usuario: {this.state.infoUser.descripcion}</Text></ul>
            <ul><Text style={styles.container3}> Tu mail: {auth.currentUser.email} </Text> </ul>
            <ul><Text style={styles.container3}> Tu perfil se creo: {auth.currentUser.metadata.creationTime} </Text> </ul>
          </li>


          {/* <TouchableOpacity onPress={ () => this.eliminar()}>
                <Text>Eliminar perfil</Text>
            </TouchableOpacity> */}
        </div>
        <View style={styles.container3}> <FlatList
          data={this.state.allPosts}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => <MiPosteo navigation={this.props.navigation} data={item.data} id={item.id} />} //RENDERIZA UN COMPONENTE POST que le paso a traves de la prop data toda la info que se guarda en items (data sale del push de doc.data
        />  </View>


        <TouchableOpacity onPress={() => this.signOut()}>
          <Text style={styles.boton}> Cerrar tu sesión</Text>
        </TouchableOpacity>
      </>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  contenedor:{
    backgroundColor: 'rgb(128, 128, 128)',
    flex: 1
},
  
  container0: {
    fontFamily: 'monospace',
    color: 'rgb(0,0,0)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container2: {
    flex: 3
  },
  container3: {
    fontFamily: 'monospace',
    color: 'rgb(0,0,0)',
    flex: 5
  },
  image: {
    height: 300
  },
  boton: {
    fontFamily: 'monospace',
    fontSize: 16,
    margin: 15,
    backgroundColor: 'rgb(0, 0, 0)',
    color: 'rgb(128, 128, 128)',
    borderRadius: 20,
    textAlign: 'center',
    padding: 5

  },
})
export default Profile
