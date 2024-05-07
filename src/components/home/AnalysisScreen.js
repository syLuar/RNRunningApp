import { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import MapView from 'react-native-maps';
import FilterButton from '../utilities/FilterButton';
import CalendarStrip from "react-native-calendar-strip";
import { Ionicons } from "@expo/vector-icons"; 
import { avatar_boy, cloudy, light_rain, night, rainy, sunny, thunder } from '../../assets';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { LineChart } from "react-native-chart-kit";
import { DASHBOARD } from '../../config';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const AnalysisScreen = () =>{

    const object = {
        "April 03":{
            "weather": "Rainy",
            "temperature": 23,
            "distance": 2.41,
            "speed": 6,
            "elevation": {
                "gain": 20,
                "loss": 25
            },
            "time": {
                "hour": 0,
                "min": 30
            },
            "calories": 98
        },
        "April 04":{
            "weather": "Light Rain",
            "temperature": 24,
            "distance": 5.05,
            "speed": 8,
            "elevation": {
                "gain": 140,
                "loss": 90
            },
            "time": {
                "hour": 0,
                "min": 53
            },
            "calories": 190
        },
        "April 05":{
            "weather": "Cloudy",
            "temperature": 28,
            "distance": 9.02,
            "speed": 10,
            "elevation": {
                "gain": 100,
                "loss": 50
            },
            "time": {
                "hour": 1,
                "min": 30
            },
            "calories": 300
        },
        "April 06":{
            "weather": "Cloudy",
            "temperature": 30,
            "distance": 7.32,
            "speed": 9.4,
            "elevation": {
                "gain": 90,
                "loss": 75
            },
            "time": {
                "hour": 1,
                "min": 5
            },
            "calories": 260
        },
        "April 07":{
            "weather": "Night",
            "temperature": 22,
            "distance": 5.11,
            "speed": 10,
            "elevation": {
                "gain": 80,
                "loss": 30
            },
            "time": {
                "hour": 0,
                "min": 55
            },
            "calories": 200
        },
        "April 08":{
            "weather": "Thunder",
            "temperature": 21,
            "distance": 0,
            "speed": 0,
            "elevation": {
                "gain": 0,
                "loss": 0
            },
            "time": {
                "hour": 0,
                "min": 0
            },
            "calories": 0
        },
        "April 09":{
            "weather": "Sunny",
            "temperature": 34,
            "distance": 10.15,
            "speed": 11,
            "elevation": {
                "gain": 140,
                "loss": 120
            },
            "time": {
                "hour": 1,
                "min": 30
            },
            "calories": 300
        },
    }

    const {userInfo, userToken} = useContext(AuthContext)
    
    const [currentDate, setCurrentDate] = useState('');
    const [greeting, setGreeting] = useState('')
    const [filter, setFilter] = useState('Daily');
    const [data, setData] = useState(object['April 03']);
    const [img, setImg] = useState(null)

    useEffect(() => {
        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year
        var hours = new Date().getHours(); //To get the Current Hours
        setCurrentDate(`${convertDate[month]} ${date}, ${year}`);
        setGreeting(convertHours(hours));
    }, []);

    const convertDate = {
        1: "January",
        2: "February",
        3: "March",
        4: "April",
        5: "May",
        6: "June",
        7: "July",
        8: "August",
        9: "September",
        10: "October",
        11: "November",
        12: "December"
    }

    const convertHours = (hours) =>{
        if (hours >= 0 && hours < 12){
            return 'Good morning!'
        }
        else if (hours >= 12 && hours < 18){
            return 'Good afternoon!'
        }
        else {
            return 'Good evening!'
        }
    }

    const chartConfig = {
        backgroundGradientFromOpacity: 0,
        backgroundGradientToOpacity: 0,
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`
    };

    const speed = {
        datasets: [
            {
                data: [20, 45, 28, 80, 99, 43],
                color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
            }
        ],
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.card}>
                <View style={styles.cardLeft}>
                    <Text style={styles.text}>{currentDate}</Text>
                    <View style={styles.header}>
                        <Text style={styles.subtitle}>
                            {greeting}
                        </Text>
                    </View>
                    <View style={styles.content}>
                        <Text style={styles.text}>
                            Always stay updated on your running progress ~
                        </Text>
                    </View>
                </View>
                <View style={styles.cardRight}>
                    <Image source={avatar_boy} style={styles.avatar}/>
                </View>
            </View>

            <View style={styles.filterContainer}>
                <FilterButton
                    text={'Daily'}
                    selectedFilter={filter} 
                    setFilter={setFilter}
                />
                <FilterButton 
                    text={'Weekly'} 
                    selectedFilter={filter} 
                    setFilter={setFilter}
                />
                <FilterButton 
                    text={'Monthly'} 
                    selectedFilter={filter} 
                    setFilter={setFilter}
                />
                <FilterButton 
                    text={'Yearly'} 
                    selectedFilter={filter} 
                    setFilter={setFilter}
                />
            </View>

            <CalendarStrip 
                scrollable
                scrollerPaging
                style={{height:100, marginHorizontal: 20, left: -3}}
                calendarHeaderContainerStyle={{flex: 1, flexDirection: 'row', alignItems:'flex-start', marginLeft:15}}
                calendarHeaderStyle={{color: 'white', fontSize: 20}}
                dateNameStyle={{color: 'white', fontSize: 16, fontWeight: 700}}
                dateNumberStyle={{color: 'white'}}
                dayContainerStyle={{backgroundColor: 'grey', borderRadius: 10, width: 45}}
                highlightDateNameStyle={{color: 'white', fontSize: 16, fontWeight: 700}}
                highlightDateNumberStyle={{color: 'white'}}
                highlightDateContainerStyle={{backgroundColor: '#9360e3', borderRadius: 10}}
                upperCaseDays={false}
                iconContainer={{
                    display: 'none'
                }}
                onDateSelected={(date)=>{
                    const month = convertDate[parseInt(date.format('MM'))]
                    const day = date.format('DD')
                    const fullDate = `${month} ${day}`
                    if (object[fullDate] == null) return
                    setData(object[fullDate])

                    let image = ""
                    
                    switch(object[fullDate].weather){
                        case "Sunny": image = sunny
                            break
                        case "Rainy": image = rainy
                            break
                        case "Light Rain": image = light_rain
                            break
                        case "Thunder": image = thunder
                            break
                        case "Cloudy": image = cloudy
                            break
                        case "Night": image = night
                            break
                    }
                    setImg(image)
                }}
            />

            <View style={styles.data}>
                <View style={styles.dataInfo}>
                    <Text style={styles.dataHeader}>Run History & Statistics</Text>
                    <View
                        style={{
                            borderBottomColor: 'grey',
                            borderBottomWidth: 3,
                            marginHorizontal: 8,
                            marginVertical: 4
                        }}
                    />
                    <Text style={styles.text2}>Running from Nanyang Technological University Hall 3 to NTU North Spine</Text>
                </View>
                <View style={styles.mapContainer}>
                    <MapView style={styles.map} 
                        initialRegion={{
                            latitude: 1.3483,
                            longitude: 103.6831,
                            latitudeDelta: 0.01,
                            longitudeDelta: 0.01,
                        }}
                        scrollEnabled={false}
                        rotateEnabled={false}
                        zoomEnabled={false}
                    />
                    <TouchableOpacity style={styles.mapButton}>
                        <Text style={styles.text}>View My Running Track</Text>
                        <Ionicons name={"chevron-forward"} size={18} color={"white"}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.grid}>
                    <View style={styles.gridBox}>
                        <Text style={styles.text2}>Weather</Text>
                        <View style={styles.gridBoxContent}>
                            <Image source={img} style={styles.weather}/>
                            <Text style={styles.text}>{data.weather}</Text>
                            <Text style={styles.text}>{data.temperature} Degree Celsius</Text>
                        </View>
                    </View>
                    <View style={styles.gridBox}>
                        <Text style={styles.text2}>Distance</Text>
                        <View style={styles.gridBoxContent}>
                            <AnimatedCircularProgress
                                size={95}
                                width={6}
                                fill={data.distance*10}
                                tintColor="#9360e3"
                                rotation={0}
                                lineCap={'round'}
                            >
                                {() => (
                                    <View style={styles.gridBoxContent}>
                                        <Text style={styles.purpleHeader}>{data.distance}</Text>
                                        <Text style={styles.purpleSubheader}>km</Text>
                                    </View>  
                                )}
                            </AnimatedCircularProgress>
                            <Text style={styles.text}>{(data.distance * 9).toFixed(1)}% of your goals</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.grid}>
                    <View style={styles.gridBox}>
                        <Text style={styles.text2}>Average Speed</Text>
                        <View style={styles.gridBoxContent}>
                            <LineChart
                                data={speed}
                                width={160}
                                height={100}
                                chartConfig={chartConfig}
                            />
                            <Text style={styles.purpleSubheader}>{data.speed}km/hr</Text>
                        </View>
                    </View>
                    <View style={styles.gridBox}>
                        <View style={styles.gridBoxTime}>
                            <Text style={styles.text2}>
                                Time
                            </Text>
                            <Ionicons name={"timer"} size={24} color={'white'}/>
                        </View> 
                        <View style={styles.gridBoxContent}>
                            <AnimatedCircularProgress
                                size={95}
                                width={6}
                                fill={(data.time.hour*60+data.time.min)/1.2}
                                tintColor="#9360e3"
                                rotation={0}
                                lineCap={'round'}
                            >
                                {() => (
                                    <View style={styles.gridBoxContent}>
                                        <Text style={styles.purpleHeader}>{data.time.hour} hour</Text>
                                        <Text style={styles.purpleSubheader}>{data.time.min} min</Text>
                                    </View>
                                )}
                            </AnimatedCircularProgress>
                        </View>
                    </View>
                </View>
                <View style={styles.grid}>
                    <View style={styles.gridBox}>
                        <Text style={styles.text2}>Elevation Changes</Text>
                        <View style={styles.gridBoxElevation}>
                            <Ionicons name={"add"} size={30} color={'#9360e3'} style={{padding:3}}/>
                            <Text style={styles.text}>Total Elevation Gain: {data.elevation.gain} m</Text>
                        </View>
                        <View style={styles.gridBoxElevation}>
                            <Ionicons name={"remove-outline"} size={30} color={'#9360e3'} style={{padding:3}}/>
                            <Text style={styles.text}>Total Elevation Loss: {data.elevation.loss} m</Text>
                        </View>
                    </View>
                    <View style={styles.gridBox}>
                        <Text style={styles.text2}>Calories Burned</Text>
                        <View style={styles.gridBoxContent}>
                            <AnimatedCircularProgress
                                style={{marginBottom:-60}}
                                size={125}
                                width={20}
                                fill={data.calories/5}
                                tintColor="#9360e3"
                                rotation={270}
                                arcSweepAngle={180}
                                backgroundColor="#3e3e3e"
                            />
                            <Text style={styles.purpleHeader}>{data.calories}</Text>
                            <Text style={styles.purpleSubheader}>kcal</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={{paddingBottom: 120}}></View>
        </ScrollView>
    );
};

 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#393839',
    },
    card: {
        backgroundColor: '#9360e3',
        borderRadius: 25,
        padding: 16,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        height: 150,
        margin: 20,
        marginTop: 50,
        flex: 1,
        flexDirection: 'row'
    },
    cardLeft:{
        width: 170,
        flexDirection: 'column'
    },
    cardRight:{
        bottom: 16,
        position: 'relative'
    },
    avatar:{
        width: 150,
        height: 150,
        position: 'absolute'
    },
    header: {
        marginBottom: 16,
    },
    date: {
        color: 'white',
        marginBottom: 36,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
    },
    subtitle: {
        fontSize: 22,
        color: 'white',
        fontWeight: '600'
    },
    content: {
        
    },
    text: {
        fontSize: 13,
        color: 'white',
    },
    text2: {
        fontSize: 16,
        color: 'white',
        fontWeight: '500',
        padding: 13
    },
    filterContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginHorizontal: 10,
        marginBottom: 20
    },
    data:{
        marginHorizontal: 10,
    },
    dataHeader: {
        paddingLeft: 13,
        color: '#9360e3',
        fontWeight: '600',
        fontSize: 20
    },
    dataInfo: {
        marginTop: 30
    },
    map: {
        flex: 1, 
        width: '100%',
        height: '100%',
        borderRadius: 25,
    },
    mapContainer: {
        backgroundColor: 'white',
        borderWidth: 4,
        borderColor: 'grey',
        height: 150,
        marginVertical: 20,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
        position: 'relative'
    },
    mapButton:{
        backgroundColor: '#9360e3',
        borderRadius: 10,
        width: 200,
        padding: 12,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        position: "absolute"
    },
    grid:{
        flexDirection:'row',
        justifyContent: 'space-between',
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 6,
    },
    gridBox:{
        backgroundColor: '#282828',
        borderRadius: 30,
        height: 170,
        flex: 1,
        margin: 10,
    },
    gridBoxContent:{
        alignItems: 'center',
    },
    gridBoxTime:{
        flexDirection: 'row',
        alignItems: 'center'
    },
    gridBoxElevation:{
        flexDirection: 'row',
        alignItems: 'center',
        width: 130,
        marginTop: 12
    },
    weather:{
        height: 75,
        width: 70,
        marginBottom: 10
    },
    purpleHeader: {
        color: '#9360e3',
        fontWeight: '700',
        fontSize: 20
    },
    purpleSubheader: {
        color: '#9360e3',
        fontWeight: '500',
        fontSize: 16
    }
});

export default AnalysisScreen