import React, { Fragment, useState, useEffect } from 'react';
import { TextInput, View, Text, TouchableOpacity, Modal, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign'
import Icon1 from 'react-native-vector-icons/FontAwesome'
import Icon2 from 'react-native-vector-icons/Octicons'
import ModalSort from '../../Component/ModalSort'
import { getUser } from '../../utils/getUser'
import { money, formatDate } from '../../utils/Helper'

const Home = (props) => {
    const [Show, setShow] = useState(false)
    const [getList, setGetList] = useState([])
    const [loadingGet, setLoadingGet] = useState(true)
    const [refreshing, setRefreshing] = useState(false)
    const [stopRender, setStopRender] = useState(true)



    const getListTransaction = async () => {
        const datas = await getUser()
        const data = []
        const result = datas.data
        Object.keys(result).map(item => data.push(result[item]));
        setGetList(data)
        setLoadingGet(false)
        setRefreshing(false)
        setStopRender(true)
    }

    const Sort = (e) => {
        if (e) {
            switch (e) {
                case 'Urutkan':
                    setStopRender(false)
                    break;
                case 'NamaA-Z':
                    const result = getList.sort((a, b) => {
                        if (String(a.beneficiary_name).toLowerCase() < String(b.beneficiary_name).toLowerCase()) { return -1 }
                        else { return 0 }
                    })
                    setGetList(result)
                    setStopRender(false)
                    break;
                case 'NamaZ-A':
                    const result1 = getList.sort((a, b) => {
                        if (String(a.beneficiary_name).toLowerCase() > String(b.beneficiary_name).toLowerCase()) { return -1 }
                        else { return 0 }
                    })
                    setGetList(result1)
                    setStopRender(false)
                    break;
                case 'NewDate':
                    const result2 = getList.sort((a, b) => {
                        if (a.created_at < b.created_at) { return -1 }
                        return 0
                    })
                    setGetList(result2)
                    setStopRender(false)
                    break;
                case 'LastDate':
                    const result3 = getList.sort((a, b) => {
                        if (a.created_at > b.created_at) { return -1 }
                        return 0
                    })
                    setGetList(result3)
                    setStopRender(false)
                    break;
                default:
                    break;
            }
        } else {
            getListTransaction()
        }
    }

    const searchName = (e, value) => {
        if (value) {
            const filtered = getList.filter(item => item ? String(item.beneficiary_name).toLowerCase().includes(String(value).toLowerCase()) : setGetList(null))
            setGetList(filtered)
            setStopRender(false)
        } else {
            Sort()
        }
    }

    const handleRefreshing = () => {
        setRefreshing(true)
        setLoadingGet(false)
        Sort()
    }
    useEffect(() => {
        if (stopRender) {
            setInterval(() => {
                Sort()
            }, 20000);
        }
    }, [])
    const renderItem = ({ item }) => (
        <View style={{ height: 'auto', backgroundColor: '#FFF', borderLeftColor: item.status === "SUCCESS" ? '#58B483' : '#E9663F', borderLeftWidth: 7, marginHorizontal: 10, padding: 15, borderRadius: 6, flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 }}>
            <View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontSize: 15, fontWeight: '700' }}>{String(item.beneficiary_bank).toUpperCase()}</Text>
                    <Icon1 name="arrow-right" style={{ fontSize: 15, top: 2, left: 5 }} />
                    <Text style={{ fontSize: 15, left: 10, fontWeight: '700' }}>{String(item.sender_bank).toUpperCase()}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontSize: 15 }}>{String(item.beneficiary_name).toUpperCase()}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontSize: 15 }}>{money(item.amount)}</Text>
                    <Icon2 name="primitive-dot" style={{ fontSize: 15, top: 3, left: 5 }} />
                    <Text style={{ fontSize: 15, left: 10 }}>{formatDate(String(item.completed_at).substring(0, 10))}</Text>
                </View>
            </View>
            <View style={{ alignItems: 'center', display: 'flex', flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => props.navigation.navigate('Detail', item)}>
                    <View style={{ backgroundColor: item.status === "SUCCESS" ? '#50B885' : '#FFF', borderWidth: 2, borderColor: item.status === "SUCCESS" ? '#58B483' : '#E9663F', padding: 5, borderRadius: 8 }}>
                        <Text style={{ fontWeight: "700", fontSize: 12, color: item.status === "SUCCESS" ? '#FFF' : '#000' }}>{item.status === "SUCCESS" ? "Berhasil" : "Pengecekan"}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
    return (
        <Fragment>
            <View style={{ flex: 1, backgroundColor: '#e8edec' }}>
                <View style={{ padding: 10 }}>
                    <View style={{ backgroundColor: '#FFF', flexDirection: 'row', borderRadius: 6 }}>
                        <Icon name="search1" style={{ position: 'relative', fontSize: 28, marginVertical: 20, marginHorizontal: 5 }} />
                        <TextInput style={{ paddingLeft: 0, paddingRight: 10, width: '60%', backgroundColor: 'transparent' }} placeholder="Cari name, bank atau nominal" onChangeText={(e) => searchName("search", e)} />
                        <TouchableOpacity onPress={() => setShow(true)}>
                            <View style={{ flexDirection: 'row', marginVertical: 22 }}>
                                <Text style={{ fontSize: 16, color: '#F0896F', fontWeight: '700' }}>URUTKAN</Text><Icon1 name="sort-down" style={{ fontSize: 16, left: 5, color: '#F0896F' }} />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <Modal transparent={true} visible={Show} animationType="fade" onRequestClose={() => setShow(false)}>
                    {/* <TouchableOpacity activeOpacity={1} onPressOut={() => setShow(false)}> */}
                    <View style={{ backgroundColor: '#000000aa', flex: 1 }}>
                        <ModalSort setShow={setShow} pickRadioButton={Sort} />
                    </View>
                    {/* </TouchableOpacity> */}
                </Modal>
                <View style={{ backgroundColor: '#e8edec', flex: 1, paddingBottom: 10 }}>
                    {
                        loadingGet ? (
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Text>Loading...</Text>
                                <Text>Data Sedang Di Proses</Text>
                            </View>
                        ) : (
                                <FlatList
                                    data={getList}
                                    renderItem={renderItem}
                                    keyExtractor={item => item.id}
                                    refreshing={refreshing}
                                    onRefresh={handleRefreshing}
                                />
                            )
                    }

                </View>
            </View>
        </Fragment>
    );
}


export default React.memo(Home);