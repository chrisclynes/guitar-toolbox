import axios from 'axios';

const URL = 'https://guitar-chords.p.rapidapi.com/select/chord';

export const getChordsData = async (chord) => {
    try {
        console.log("trying")
        const {data: {data}} = await axios.get(URL, {
            params: {
                chord: chord
            },
            headers: {
                'X-RapidAPI-Host': 'guitar-chords.p.rapidapi.com',
                'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_GuitarChords_API_KEY
              }
        });
        console.log(data)
        return data;
    }catch (error) {
        console.log(error)
    }
}