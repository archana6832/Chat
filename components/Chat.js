import React from 'react';
import 'react-native-gesture-handler';
import { View, Platform, KeyboardAvoidingView } from 'react-native';
import { Bubble, GiftedChat, InputToolbar } from 'react-native-gifted-chat';
import AsyncStorage from '@react-native-async-storage/async-storage'; //5.4
import NetInfo from '@react-native-community/netinfo';              //5.4
import CustomActions from './CustomActions';//5.5
import MapView from 'react-native-maps';//5.5



const firebase = require('firebase'); //to connect to firebase 5.3
require('firebase/firestore');

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAbwSeL4JMHZpCktGbnK8FdfJN2jRUWdkw",
    authDomain: "chatapp-614f8.firebaseapp.com",
    projectId: "chatapp-614f8",
    storageBucket: "chatapp-614f8.appspot.com",
    messagingSenderId: "17260151676",
    appId: "1:17260151676:web:535244b3731ea1812c9af9"
};

export default class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            uid: 0,
            loggedInText: 'Logging in...',
            user: {
                _id: '',
                name: '',
                avatar: '',
            },
            isConnected: false,
            image: null,
            location: null
        }

        //initialise firebase        
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
        // reference to the Firestore messages collection
        this.referenceChatMessages = firebase.firestore().collection("messages");
    };


    //Get message to store in asyncstorage 5.4
    async getMessages() {
        let messages = '';
        try {
            messages = await AsyncStorage.getItem('messages') || [];
            this.setState({
                messages: JSON.parse(messages)
            });
        } catch (error) {
            console.log(error.message);
        }
    };

    componentDidMount() {
        // Set the page title once Chat is loaded
        let { name } = this.props.route.params
        // Adds the name to top of screen
        this.props.navigation.setOptions({ title: name })

        //To find out user's connection status
        NetInfo.fetch().then(connection => {
            //actions when user is online
            if (connection.isConnected) {
                this.setState({ isConnected: true });
                console.log('online');

                // user can sign in anonymously
                this.authUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
                    if (!user) {
                        await firebase.auth().signInAnonymously();
                    }

                    // listens for updates in the collection
                    this.unSubscribe = this.referenceChatMessages
                        .orderBy("createdAt", "desc")
                        .onSnapshot(this.onCollectionUpdate);


                    //update user state with currently active user data
                    this.setState({
                        uid: user.uid,
                        messages: [],
                        user: {
                            _id: user.uid,
                            name: name,
                            avatar: "https://placeimg.com/140/140/any",
                        },
                    });

                });
                //save messages when online
                this.saveMessages();
            } else {
                this.setState({ isConnected: false });
                console.log('offline');

                //retrieve chat from asyncstorage
                this.getMessages();
            }
        });
    }


    //unsubscribe
    componentWillUnmount() {
        this.authUnsubscribe();
        this.unSubscribe();
    }

    //stores and adds new messages to database
    addMessages() {
        const message = this.state.messages[0];
        // add a new messages to the collection
        this.referenceChatMessages.add({
            _id: message._id,
            text: message.text || "",
            createdAt: message.createdAt,
            user: this.state.user,
            image: message.image || "",
            location: message.location || null,
        });
    }

    //Save messages in the storage 5.4
    async saveMessages() {
        try {
            await AsyncStorage.setItem('messages', JSON.stringify(this.state.messages));
        } catch (error) {
            console.log(error.message);
        }
    }


    //callback function for when user sends a message        
    onSend(messages = []) {
        this.setState(
            (previousState) => ({
                messages: GiftedChat.append(previousState.messages, messages),
            }), () => {
                this.addMessages();
                this.saveMessages();
            }
        );
    }


    // allows user to see new messages when database updates 5.3
    onCollectionUpdate = (querySnapshot) => {
        const messages = [];
        // go through each doc
        querySnapshot.forEach((doc) => {
            // get the docs data
            let data = doc.data();
            messages.push({
                _id: data._id,
                text: data.text,
                createdAt: data.createdAt.toDate(),
                user: {
                    _id: data.user._id,
                    name: data.user.name,
                    avatar: data.user.avatar
                },
                image: data.image || null,
                location: data.location || null,
            });
        });
        this.setState({
            messages: messages
        });
    };



    //to delete messages  5.4
    async deleteMessages() {
        try {
            await AsyncStorage.removeItem('messages');
            this.setState({
                messages: []
            })
        } catch (error) {
            console.log(error.message);
        }
    }


    //to show default toolbar if user is online 5.4
    renderInputToolbar(props) {
        if (this.state.isConnected == false) {
        } else {
            return (
                <InputToolbar
                    {...props}
                />
            );
        }
    }

    //return a MapView when surrentMessage contains location data//5.5
    renderCustomView(props) {
        const { currentMessage } = props;
        if (currentMessage.location) {
            return (
                <MapView
                    style={{
                        width: 150,
                        height: 100,
                        borderRadius: 13,
                        margin: 3
                    }}
                    region={{
                        latitude: currentMessage.location.latitude,
                        longitude: currentMessage.location.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                />
            );
        }
        return null;
    }


    renderCustomActions = (props) => {
        return <CustomActions {...props} />;
    };

    //to change the color of sender bubble  5.2
    renderBubble(props) {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: '#000'
                    }
                }}
            />
        )
    }

    render() {
        // pulls background image selection from Start screen
        let bgColor = this.props.route.params.bgColor;

        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View
                    style={{
                        backgroundColor: bgColor,
                        width: '100%',
                        height: '100%',
                    }}
                >

                    <GiftedChat
                        renderBubble={this.renderBubble.bind(this)}
                        messages={this.state.messages}
                        renderInputToolbar={this.renderInputToolbar.bind(this)}
                        renderActions={this.renderCustomActions}
                        renderCustomView={this.renderCustomView}
                        onSend={messages => this.onSend(messages)}
                        user={{
                            _id: this.state.user._id,
                            name: this.state.name,
                            avatar: this.state.user.avatar
                        }}
                    />
                    {/* To avoid problem with keyboard in android */}
                    {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null
                    }

                </View>
            </View>
        )
    }
}

