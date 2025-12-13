import {RTCPeerCommection,mediaDevices} from "react-native-webrtc"
 

export const RTC_CONFIG={
    iceServers:[
       { urls: "stun:stun.l.google.com:19302" }
    ]
}