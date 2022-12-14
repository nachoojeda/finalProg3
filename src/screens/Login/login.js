import React, {Component} from 'react';
import {auth, db} from '../../firebase/config';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Image,} from 'react-native';

class Login extends Component {
    constructor(props){
        super()
        this.state = {
            email: "",
            password: "",
            errors: "",
        }
    }

        loguearUsuario(email,pass){
        auth.signInWithEmailAndPassword(email, pass)
             .then( res => {
                 this.props.navigation.navigate("TabNavigation")
    })
            .catch(error => 
                 this.setState({
                    errors: `El error es: ${error.message}`
    })
    )}
                    


    render(){
        return(
            <View style={styles.contenedor}>

            <Image
                style = {styles.foto}
                source = {require('../../../assets/foto.png')}
                resizeMode = 'contain'
            />


            <Text style={styles.titulo}>Logueate</Text>
                
                
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

            


            {
                this.state.email =="" || this.state.password =="" ? 
                    <TouchableOpacity>
                        <Text style={styles.botonerror}>Loguearme</Text>
                    </TouchableOpacity>
                :
                    <TouchableOpacity onPress={ () => this.loguearUsuario ( this.state.email, this.state.password,)}>
                        <Text style={styles.boton}>Loguearme</Text>
                    </TouchableOpacity>                  
            }
                    <Text onPress={ () => this.props.navigation.navigate ("Register")} style={styles.link}>??No ten??s una cuenta? Registrate</Text>

                    
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
        fontSize: 16,
        margin: 15,
        backgroundColor: 'rgb(70,70,70)',
        borderRadius: 20,
        textAlign: 'center',
        padding: 5

    },

    boton:{
        fontFamily: 'monospace',
        fontSize: 16,
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

    }

    

})

export default Login;