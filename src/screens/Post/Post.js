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
        .then(()=> (this.setState({
            description: '', 
            mostrarCamara: true, 
            fotoUri: '',}))) 
            
        .catch(err => console.log(err))

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
             style={styles.texto}
             placeholder='Deja la descripcion'
             />
             <TouchableOpacity onPress={() => this.enviar(this.state.description)}>
                 <Text style={styles.boton}>
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
    flex: 1 ,
    backgroundColor: 'rgb(255,255,242)',
        alignItems: 'center',
        justifyContent: 'center'
    }, 
    camaraBody:{
        height: 100
    }, 
     texto:{
        backgroundColor: 'rgb(255,255,242)',
        fontFamily: 'monospace',
        fontSize: 13,
        margin: 14,
        borderRadius: 12,
        textAlign: 'center',
        color: 'rgb(128, 128, 128)',
        padding: 8

    } ,
    boton:{
        fontFamily: 'monospace',
        fontSize: 16,
        margin: 15,
        backgroundColor: 'rgb(173, 216, 230)',
        borderRadius: 20,
        textAlign: 'center',
        padding: 5

    },
})

export default Post