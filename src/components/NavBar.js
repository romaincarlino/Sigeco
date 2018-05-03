import {TouchableHighlight, Text, View, Image, StatusBar, TouchableWithoutFeedback} from 'react-native';
import React, {Component} from 'react';
import Images from '../constants/Images';
import Colors from "../constants/Colors";

class NavBar extends Component {

    render() {
        return (
            <View style={styles.background}>
                <TouchableHighlight style={styles.backarrowTouchable}
                    onPress={() => this.props.backFunction(this.props.context)}>
                    <Image style={styles.backarrow} source={Images.back}/>
                </TouchableHighlight>
                <Text style={styles.title}>{this.props.title}</Text>
                <TouchableHighlight style={styles.rightTouchable}
                    onPress={() => this.props.imageFunction(this.props.context)}>
                    <Image source={this.props.image} style={styles.right}/>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = {
    background: {
        flexDirection: 'row',
        backgroundColor: Colors.blue,
        alignItems:'center',
        height: 50,
    },
    backarrowTouchable: {
        width: 30,
        height: 30,
        position:'absolute',
        left:10,
    },
    backarrow: {
        width: 30,
        height: 30,
    },
    title: {
        marginRight: 50,
        marginLeft: 50,
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold'
    },
    rightTouchable: {
        position:'absolute',
        right:10,
        width: 40,
        height: 40,
    },
    right: {
        width: 40,
        height: 40,
    }
};

export default NavBar;