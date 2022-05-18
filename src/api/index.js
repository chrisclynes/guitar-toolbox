import axios from 'axios';

const URL = 'https://api.uberchord.com/v1/chords/';

const getChordsData = async (root, quality) => {
    try {
        const response = await axios.get(`${URL}${root}${quality}`)
        console.log(response.data[0])
        return response.data[0];
    }catch (error) {
        console.log(error)
    }
}

export default getChordsData;