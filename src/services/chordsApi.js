import axios from 'axios';

const baseURL = 'https://api.uberchord.com/v1/chords';

const chordApi = async (chordsString) => {
    const chordsToCall = `${baseURL}${chordsString}`;
        try {
            const response = await axios.get(chordsToCall);
            const apiData = response.data;
            
            return apiData;
            
        }catch (error) {
            return "error"
        }
}

export default chordApi;