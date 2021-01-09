import React, { useState } from 'react'
import { View, Text } from 'react-native'
import RadioButton from './RadioButton'

const ModalSort = (props) => {
    const List = [
        {
            key: 'Urutkan',
            text: 'Urutkan',
        },
        {
            text: 'name A-Z',
            key: 'NamaA-Z',
        },
        {
            text: 'name Z-A',
            key: 'NamaZ-A',
        },
        {
            text: 'Tanggal Terbaru',
            key: 'NewDate',
        },
        {
            text: 'Tanggal Terlama',
            key: 'LastDate',
        }
    ];
    return (
        <View style={{ backgroundColor: '#FFF', flex: 1, marginTop: 80, marginLeft: 50, marginRight: 50, marginBottom: 100, padding: 60, borderRadius: 20 }}>
            <RadioButton List={List} setShow={props.setShow} pickRadioButton={props.pickRadioButton} />
        </View>
    )
}

export default ModalSort;