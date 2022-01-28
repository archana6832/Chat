import React from 'react';
import 'react-native-gesture-handler';
import { View, Platform, KeyboardAvoidingView } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';

const firebase = require('firebase'); //to connect to firebase 
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
            }
        }

        //initialise firebase
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
        // reference to the Firestore messages collection
        this.referenceChatMessages = firebase.firestore().collection("messages");
    };


    //component DidMount
    componentDidMount() {
        // get username prop from Start.js
        let { name } = this.props.route.params;
        // Adds the name to top of screen
        this.props.navigation.setOptions({ title: name });
        this.authUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
            if (!user) {
                firebase.auth().signInAnonymously();
                return
            }
            // update user state with currently active user data
            this.setState({
                uid: user.uid,
                messages: [],
                user: {
                    _id: user.uid,
                    name: name,
                },
            });
            // create reference to active user's messages
            this.referenceMessagesUser = firebase
                .firestore()
                .collection('messages')
                .where('uid', '==', this.state.uid);
            this.unsubscribe = this.referenceChatMessages
                .orderBy('createdAt', 'desc')
                .onSnapshot(this.onCollectionUpdate);
        });
    }

    ///unsubscribe

    componentWillUnmount() {
        this.authUnsubscribe();
        this.unsubscribe();
    }

    // stores and adds new messages to database
    addMessage() {
        const message = this.state.messages[0];
        this.referenceChatMessages.add({
            uid: this.state.uid,
            _id: message._id,
            text: message.text,
            createdAt: message.createdAt,
            user: message.user,
        });
    }
    // callback function for when user sends a message
    onSend(messages = []) {
        this.setState(
            (previousState) => ({
                messages: GiftedChat.append(previousState.messages, messages),
            }),
            () => {
                this.addMessage();
            }
        );
    }
    // allows user to see new messages when database updates
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
                },
            });
        });
        this.setState({
            messages: messages
        });
    }

    //to change the color of sender bubble
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
                        renderBubble={this.renderBubble.bind(this)} //To change color of sender chat bubble
                        messages={this.state.messages}
                        onSend={(messages) => this.onSend(messages)}
                        user={{
                            _id: this.state.user._id,
                            name: this.state.user.name,

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

