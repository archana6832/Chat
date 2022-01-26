import React, { Component } from 'react';
import {
    View, Text, StyleSheet, Platform, KeyboardAvoidingView,
    ImageBackground
} from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';


export default class Chat extends React.Component {
    constructor() {
        super();
        this.state = {
            messages: [],
        }
    };
    componentDidMount() {
        // get username prop from Start.js
        let { name } = this.props.route.params;
        // Adds the name to top of screen
        this.props.navigation.setOptions({ title: name });
        //
        this.setState({
            messages: [
                {
                    _id: 1,
                    text: 'Hello developer',
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'React Native',
                        avatar: 'https://placeimg.com/140/140/any',
                    },
                },
                {
                    _id: 2,
                    text: `${name} has entered the Chat room`,
                    createdAt: new Date(),
                    system: true,
                },
            ],
        })
    }
    onSend(messages = []) {
        this.setState((previousState) => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }));
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

        //let name = this.props.route.params.name; // OR ...
        // let { name } = this.props.route.params;
        //this.props.navigation.setOptions({ title: name });

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
                            _id: 1,
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

