import { Text, View, TextInput, TouchableOpacity, StyleSheet, Image} from 'react-native'
import React, { Component } from 'react'
import {auth, db} from '../../firebase/config'
import Camara from '../../components/Camara/Camara'


 class Post extends Component {

    constructor(){
        super()
        this.state = {
            description: '',
            mostrarCamara: true ,
            fotoUrl: ''
        }
    }

    enviar(description){
        db.collection('post').add({
            owner: auth.currentUser.email,
            createdAt: Date.now(),
            description: description,
            likes: [],
            comments:[] ,
            foto: this.state.fotoUrl

        })

        .then(resp => console.log('funciono el posteo'))
        .catch(err => console.log(err))
    }

    cuandoSubaLaImagen(url){
        this.setState({
            mostrarCamara:false,
            fotoUrl: url
        })
    }
    
    render() {
        return (
            <View style = {styles.container}>
                
                {
                    this.state.mostrarCamara ? 

            <Camara style = {styles.camaraBody}
            cuandoSubaLaImagen = {(url) => this.cuandoSubaLaImagen(url)}
            /> 
            :
             <View> 
                <TextInput
             keyboardType='default'
             onChangeText={text => this.setState({description: text})}
             value={this.state.description}
             style={styles.input}
             placeholder='Deja la descripcion'
             />
             <TouchableOpacity onPress={() => this.enviar(this.state.description)}>
                 <Text>
                     Enviar
                 </Text>
             </TouchableOpacity>

             </View>
                }
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
    flex: 1
    }, 
    camaraBody:{
        height: 500
    }, 
    input:{
        borderWidth:1,
        height:48
    } 
})

export default Post