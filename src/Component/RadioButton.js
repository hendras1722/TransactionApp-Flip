import React, { useState } from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'

const RadioButton = (props) => {
    const [value, setValue] = useState(null)

    const Choose = (e) => {
        props.pickRadioButton(e)
        setValue(e)
        props.setShow(false)
        // if (props.pickRadioButton()) {
        //     setValue(props.pickRadioButton())
        // }
    }

    const listRadio = () => (
        props.List.map(res => {
            return (
                <View key={res.key} style={styles.container}>
                    <TouchableOpacity
                        style={styles.radioCircle}
                        onPress={() => Choose(res.key)}
                    >
                        {value === res.key && <View style={styles.selectedRb} />}
                    </TouchableOpacity>
                    <Text style={styles.radioText}>{res.text}</Text>
                </View>
            )
        })

    )

    return (
        <View>
            {listRadio()}
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        marginBottom: 30,
        alignItems: 'center',
        flexDirection: 'row'
    },
    radioText: {
        marginLeft: 10,
        fontSize: 16,
        color: '#000'
    },
    radioCircle: {
        height: 25,
        width: 25,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: '#FF5D3D',
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedRb: {
        width: 15,
        height: 15,
        borderRadius: 50,
        backgroundColor: '#FF5D3D',
    },
    result: {
        marginTop: 20,
        color: 'white',
        fontWeight: '600',
        backgroundColor: '#F3FBFE',
    },
});

export default RadioButton;