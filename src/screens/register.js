import React, {Component} from 'react';
import {auth, db} from '../firebase/config';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Image} from 'react-native';

class Registro extends Component {
    constructor(){
        super()
        
        this.state = {
            email: "",
            password: "",
            usuario: "",
            bio: "",
            foto: "",
            errors: "",
        }
    }


registrarUsuario(email,pass, userName, bio, foto){
  auth.createUserWithEmailAndPassword(email,pass)
        .then(res =>{
              db.collection("users").add({
                    creador:email,
                    nombreDeUsuario: userName, 
                    descripcion: bio,
                    imagen: foto,
                    creado: Date.now()
                })
                .then(()=>{
                    this.setState({
                        email: "",
                        password: "",
                        usuario: "",
                        bio: "",
                        foto: "",
                        errors: ""
                    })
                   
                    this.props.navigation.navigate("Inicio")
                })
                .catch(error => console.log(error))    
        })
        .catch(error => 
            this.setState({
            errors: `El error es: ${error.message}`
        })
        )}

    

}

export default Registro;