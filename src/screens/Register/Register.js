import React, {Component} from 'react';
import {auth, db} from '../../firebase/config';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Image} from 'react-native';
import Camara from '../../components/Camara/Camara';

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
            showCamara: false,
            disabled: true
        }
    }
    componentDidMount(){ 
        auth.onAuthStateChanged(
        user => {
            if (user){
                this.props.navigation.navigate('TabNavigation')
            }
        })
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
                   
                    this.props.navigation.navigate("Login")
                })
                .catch(error => console.log(error))    
        })
        .catch(error => 
            this.setState({
            errors: `El error es: ${error.message}`
        })
        )}


        onImageUpload(url){
            this.setState({
                foto: url,
                showCamera: false,
            })
            
        }

        render(){
            return(
                <View style={styles.contenedor}>
    
                 <Image
                    style = {styles.foto}
                    source = {require('../../../assets/foto.png')}
                    resizeMode = 'contain'
                />
    
    
                    <Text style={styles.titulo}>Regístrate</Text>
                    
                    
                    <View style={styles.formulario}>
                    <Text style={styles.error}>{this.state.errors}</Text>
    
    
                        <TextInput 
                            placeholder= 'Email'
                            keyboardType= 'email-address'
                            onChangeText={ 
                                texto => this.setState({
                                    email : texto
                                })
                            }
                            value = {this.state.email}
                            style={styles.texto}
                        />
                        <TextInput 
                            placeholder= 'password'
                            keyboardType= 'default'
                            secureTextEntry = {true}
                            onChangeText={ texto => this.setState({password : texto})}
                            value = {this.state.password}
                            style={styles.texto}
                        />
                        <TextInput 
                            placeholder= 'Nombre de Usuario'
                            keyboardType= 'default'
                            onChangeText={ texto => this.setState({usuario : texto})}
                            value = {this.state.usuario}
                            style={styles.texto}
                        />
                        <TextInput 
                            placeholder= 'Biografía'
                            keyboardType= 'default'
                            onChangeText={ texto => this.setState({bio : texto})}
                            value = {this.state.bio}
                            style={styles.texto}
                        />  
                       
    
                      { this.state.showCamera ?
                        <View style={{width: '100vw', heigth: '100vh'}}>
                            <Camara onImageUpload={url => this.onImageUpload(url)}/> 
                        </View> 
                        :
                        <TouchableOpacity style={styles.fotoperfil} onPress={()=> this.setState({showCamera:true})}>
                            <Text>Subir foto de perfil </Text>
                        </TouchableOpacity>
                    }
    
    
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

    const styles = StyleSheet.create({

        contenedor:{
            flex:1,
            backgroundColor: 'rgb(0,0,0)',
            alignItems: 'center',
            justifyContent: 'center'
        },

        titulo:{
            fontFamily: 'monospace',
             fontSize: 40,
             margin: 35,
             color: 'rgb(128, 128, 128)'
            
        },

        formulario:{
            backgroundColor: 'rgb(128, 128, 128)',
            borderRadius: 8,
            padding: 20

        },

        error:{
            fontFamily: 'monospace',
            fontSize: 8,
            margin: 5,
            color: 'rgb(0,0,0)'
        },

        texto:{
            backgroundColor: 'rgb(0,0,0)',
            fontFamily: 'monospace',
            fontSize: 11,
            margin: 14,
            borderRadius: 5,
            textAlign: 'center',
            color: 'rgb(128, 128, 128)',
            padding: 8

        },

        botonerror:{
            fontFamily: 'monospace',
            fontSize: 18,
            margin: 15,
            backgroundColor: 'rgb(70,70,70)',
            borderRadius: 20,
            textAlign: 'center',
            padding: 5

        },

        boton:{
            fontFamily: 'monospace',
            fontSize: 18,
            margin: 15,
            backgroundColor: 'rgb(70,70,70)',
            borderRadius: 20,
            textAlign: 'center',
            padding: 5 
        },

        link:{
            fontFamily: 'monospace',
            fontSize:12,
            margin: 3

        },

        foto:{
            height: 170,
            width: 140 

        },

        fotoperfil:{
            color: 'rgb(300,300,300)',
            backgroundColor: 'rgb(50,50,50)',
            fontFamily: 'monospace',
            fontSize: 9,
            margin: 20,
            borderRadius: 10,
            textAlign: 'center',
            padding: 8
        }

    })
    
    
    
    export default Registro;