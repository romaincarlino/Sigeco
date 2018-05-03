import React, {Component} from 'react';
import {Switch, Text, View} from 'react-native';
import Colors from '../constants/Colors';
import RadioForm from 'react-native-radio-form';

class ListItem_TestPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            value: 4,
            data_source: [
                {label: 'Oui', value: 1},
                {label: 'Non', value: 0},
            ]
        }
    }

    componentDidMount() {
        if (this.props.item.facultatif == '1') {
            this.setState({
                data_source: [
                    {label: 'Oui', value: 1},
                    {label: 'Non', value: 0},
                    {label: 'Non \nconcerné', value: -1}
                ]
            });
        }
    }

    render() {
        resultat_attendu = this.props.item.resultat_attendu.replace(/<br>/g, "\n");

        return (
            <View style={styles.item}>
                <Text style={styles.point}>{this.props.item.point_cle}</Text>
                <Text style={styles.expectedResult}>{resultat_attendu}</Text>
                <View style={styles.validate}>
                    <RadioForm
                        dataSource={this.state.data_source}
                        circleSize={20}
                        initial={this.state.value}
                        outerColor={Colors.black}
                        innerColor={Colors.black}
                        onPress={(value) => {this.setState({value: value})}}
                    />
                </View>
            </View>
        );
    }


}

const styles = {
    item: {
        paddingLeft: 10,
        paddingRight: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: Colors.gray,
        borderBottomWidth: 1,
        paddingTop: 5,
        paddingBottom: 5,
        marginLeft:10,
        marginRight:10,
    },
    point: {
        flex: 2,
        color: Colors.black,
    },
    expectedResult: {
        flex: 6,
        marginLeft: 5,
        color: Colors.black,
    },
    validate: {
        flex: 3,
    },
    radioForm:{
        backgroundColor: 'white'
    }
};


export default ListItem_TestPage;

