const convertTones = (tones) => {
    const tonesMapFlat = {Ab: "G#", Bb: "A#", Db: "C#", Eb: "D#", Gb: "F#"}
    const tonesMapSharp = {"G#": "Ab", "A#": "Bb", "C#": "Db", "D#": "Gb", "F#": "Gb"}
    const regExFlat = /[A-Z]b/g;
    const regExSharp = /[A-Z]#/g;
    if(tones.match(/[A-Z]b/g)){
      return tones.replace(regExFlat, (match) => tonesMapFlat[match])
    } else {
      return tones.replace(regExSharp, (match) => tonesMapSharp[match])
    }
}
export default convertTones