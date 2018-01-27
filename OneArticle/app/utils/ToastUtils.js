import Toast from 'react-native-root-toast'

let show = (data)=>{
    if(data != null) {
        Toast.show(data,{
            duration: Toast.durations.SHORT,
            position: Toast.positions.CENTER ,
            shadow: true,
            hideOnPress: true,
            delay: 0,
            backgroundColor: '#222222',
            textColor: '#f0f0f0',
        })
    }
}

export {show}