import React from 'react'
import { View, Text, TouchableWithoutFeedback, TouchableOpacity, ToastAndroid } from 'react-native'
import Icon1 from 'react-native-vector-icons/FontAwesome'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { formatDate, money } from '../../utils/Helper'
import Clipboard from '@react-native-community/clipboard';

const Detail = (props) => {
    const copyText = () => {
        Clipboard.setString(props.route.params.id)
        // @ts-ignore
        ToastAndroid.show("ID Berhasil Dicopy", ToastAndroid.SHORT);
    }
    return (
        <>
            <View style={{ borderBottomColor: '#EAEAEA', borderBottomWidth: 1 }}>
                <View style={{ flexDirection: 'row', marginHorizontal: 30, marginVertical: 20 }}>
                    <View>
                        <Text style={{ fontWeight: "700" }}>
                            ID Transaksi: #{props.route.params.id}
                        </Text>
                    </View>
                    <TouchableOpacity onPress={() => copyText()}>
                        <View style={{ left: 5 }}>
                            <Icon name="content-copy" style={{ fontSize: 20, color: '#E9663F' }} />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ borderBottomColor: '#EAEAEA', borderBottomWidth: 2 }}>
                <View style={{ flexDirection: 'row', marginHorizontal: 30, marginVertical: 20, justifyContent: 'space-between' }}>
                    <View >
                        <Text style={{ fontWeight: "700" }}>
                            Detail Transaksi
                        </Text>
                    </View>
                    <TouchableWithoutFeedback onPress={() => props.navigation.navigate('Home')}>
                        <View >
                            <Text style={{ color: '#E9663F', fontWeight: '500' }}>Tutup</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
            <View style={{ marginHorizontal: 30, marginVertical: 30 }}>
                <View style={{ flexDirection: 'row', bottom: 10 }}>
                    <Text style={{ fontWeight: '700', fontSize: 15 }}>{String(props.route.params.beneficiary_bank).toUpperCase()}</Text>
                    <Icon1 name="arrow-right" style={{ fontSize: 15, top: 2, left: 5 }} />
                    <Text style={{ fontWeight: '700', fontSize: 15, left: 10 }}>{String(props.route.params.sender_bank).toUpperCase()}</Text>
                </View>
                <View style={{ top: 5 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontWeight: '700', fontSize: 15 }}>{String(props.route.params.beneficiary_name).toUpperCase()}</Text>
                        </View>
                        <View>
                            <Text style={{ fontWeight: '700', fontSize: 15 }}>NOMINAL</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <View>
                                <View>
                                    <Text>{String(props.route.params.account_number)}</Text>
                                </View>
                            </View>
                        </View>
                        <View>
                            <Text>{money(String(props.route.params.amount))}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ top: 20 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontWeight: '700', fontSize: 15 }}>BERITA TRANSFER</Text>
                        </View>
                        <View>
                            <Text style={{ fontWeight: '700', fontSize: 15 }}>KODE UNIK</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <View>
                                <View>
                                    <Text>{String(props.route.params.remark)}</Text>
                                </View>
                            </View>
                        </View>
                        <View>
                            <Text>{String(props.route.params.unique_code)}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ top: 30 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontWeight: '700', fontSize: 15 }}>Waktu Dibuat</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontSize: 15 }}>{formatDate(String(props.route.params.created_at).substring(0, 10))}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </>
    )
}

export default Detail;