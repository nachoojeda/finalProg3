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

        render(){
            return(
                <View style={styles.container}>
    
                    
    
    
                    <Text style={styles.titulo}>Regístrate</Text>
                    
                    
                    <View style={styles.form}>
                    <Text style={styles.errors}>{this.state.errors}</Text>
    
    
                        <TextInput 
                            placeholder= 'Email'
                            keyboardType= 'email-address'
                            onChangeText={ 
                                texto => this.setState({
                                    email : texto
                                })
                            }
                            value = {this.state.email}
                            style={styles.campo}
                        />
                        <TextInput 
                            placeholder= 'password'
                            keyboardType= 'default'
                            secureTextEntry = {true}
                            onChangeText={ texto => this.setState({password : texto})}
                            value = {this.state.password}
                            style={styles.campo}
                        />
                        <TextInput 
                            placeholder= 'Nombre de Usuario'
                            keyboardType= 'default'
                            onChangeText={ texto => this.setState({usuario : texto})}
                            value = {this.state.usuario}
                            style={styles.campo}
                        />
                        <TextInput 
                            placeholder= 'Biografía'
                            keyboardType= 'default'
                            onChangeText={ texto => this.setState({bio : texto})}
                            value = {this.state.bio}
                            style={styles.campo}
                        />  
                        <TextInput 
                            placeholder= 'Foto de Perfil'
                            keyboardType= 'default'
                            onChangeText={ texto => this.setState({foto : texto})}
                            value = {this.state.foto}
                            style={styles.campo}
                        />    
    
                
    
    
                {
                    this.state.email =="" || this.state.password =="" || this.state.usuario == "" ? 
                        <TouchableOpacity>
                            <Text style={styles.botonerror}>Registrarme</Text>
                        </TouchableOpacity>
                    :
                        <TouchableOpacity onPress={ () => this.registrarUsuario ( this.state.email, this.state.password, this.state.usuario, this.state.bio, this.state.foto)}>
                            <Text style={styles.boton}>Registrarme</Text>
                        </TouchableOpacity>
                }
                        <Text onPress={ () => this.props.navigation.navigate ("Login")} style={styles.link}>¿Ya tenés una cuenta? Inicia Sesión</Text>
                        
                    </View>
                </View>
            
    
            )
        }
    }
    
    
    
    export default Registro;