
import io from 'socket.io-client';
// let host = location.origin;
let host = 'http://meeting.chugang.net:3001'
const socket = io.connect(host);
export default socket;
