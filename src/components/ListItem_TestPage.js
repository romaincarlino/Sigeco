import React, {Component} from 'react';
import {Text, View} from 'react-native';
import Colors from '../constants/Colors';
import RadioForm from 'react-native-radio-form';

class ListItem_TestPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            value: null,
            data_source: [
                {label: 'Oui', value: 1},
                {label: 'Non', value: 0},
            ]
        }
    }

    componentDidMount() {
        //facultatif?
        data_source = [
            {label: 'Oui', value: 1},
            {label: 'Non', value: 0},
        ];
        if (this.props.item.facultatif == '1') {
            data_source.push({label: 'Non \nconcerné', value: -1});
        }
        this.setState({
            data_source: data_source,
        });
    }

    changeValue(value) {
        this.setState(
            {value: value}
        );

        this.props.changeValueItem(value, this.props.item.positionInPointsCle, this.props.context);
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
                        initial={this.props.item.value != undefined ? this.props.item.value : null}
                        outerColor={Colors.black}
                        innerColor={Colors.black}
                        onPress={(data) => {
                            this.changeValue(data.value)
                        }}
                    />
                </View>
            </View>
        );
    }


}

const styles = {
    item: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: Colors.gray,
        borderBottomWidth: 1,
        paddingTop: 5,
        paddingBottom: 5,
        marginLeft: 10,
        marginRight: 10,
    },
    point: {
        flex: 2,
        color: Colors.black,
    },
    expectedResult: {
        flex: 6,
        marginLeft: 10,
        color: Colors.black,
    },
    validate: {
        flex: 3,
    },
    radioForm: {}
};


export default ListItem_TestPage;

