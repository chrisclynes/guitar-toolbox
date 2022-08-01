import convertTones from "./convertTones";
import axios from 'axios';

const baseURL = 'https://api.uberchord.com/v1/chords/';

const chordApi = async (prevChord, selectorVals) => {
    const {root, quality, alterations} = selectorVals;
    const chordToCall = `${baseURL}${root.replace(/(#)/g, "%23")}_${quality === "Major" ? '' : 'm'}${alterations.toLowerCase()}`;
        try {
            const response = await axios.get(chordToCall);
            const apiData = response.data[0];
            
            return {
                chordName: `${apiData.chordName.replace(/(,)/g, '')}${apiData.enharmonicChordName !== apiData.chordName ? ` or ${apiData.enharmonicChordName.replace(/(,)/g, '')}` : ""}`,
                strings: apiData.strings,
                tones: `${apiData.tones}${apiData.enharmonicChordName !== apiData.chordName ? ` or ${convertTones(apiData.tones)}` : ""}`
                }
            
        }catch (error) {
            return "error"
        }
}

export default chordApi;