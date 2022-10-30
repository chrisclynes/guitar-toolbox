import images from "./images";

const majorKeys = [
    { "A Major": { I: "A", ii: "B_m", iii: "C%23_m", IV: "D", V: "E", vi: "F%23_m", vii: "G%23_dim" }},
    { "B Major": { I: "B", ii: "C%23_m", iii: "D%23_m", IV: "E", V: "F%23", vi: "G%23_m", vii: "A%23_dim" }},
    { "C Major": { I: "C", ii: "D_m", iii: "E_m", IV: "F", V: "G", vi: "A_m", vii: "B_dim" }},
    { "D Major": { I: "D", ii: "E_m", iii: "F%23_m", IV: "G", V: "A", vi: "B_m", vii: "C%23_dim" }},
    { "E Major": { I: "E", ii: "F_m", iii: "G%23_m", IV: "A", V: "B", vi: "C%23_m", vii: "D%23_dim" }},
    { "F Major": { I: "F", ii: "G_m", iii: "A_m", IV: "Bb", V: "C", vi: "D_m", vii: "E_dim" }},
    { "G Major": { I: "G", ii: "A_m", iii: "B_m", IV: "C", V: "D", vi: "E_m", vii: "F%23_dim" }},
    { "Bb Major": { I: "Bb", ii: "C_m", iii: "D_m", IV: "Eb", V: "F", vi: "G_m", vii: "A_dim" }},
    { "A# Major": { I: "A%23", ii: "C_m", iii: "D_m", IV: "D%23", V: "F", vi: "G_m", vii: "A_dim" }},
    { "Db Major": { I: "Db", ii: "Eb_m", iii: "F_m", IV: "Gb", V: "Ab", vi: "Bb_m", vii: "C_dim" }},
    { "C# Major": { I: "C%23", ii: "D%23_m", iii: "F_m", IV: "A%23", V: "G%23", vi: "A%23_m", vii: "C_dim" }},
    { "Eb Major": { I: "Eb", ii: "F_m", iii: "G_m", IV: "Ab", V: "Bb", vi: "C_m", vii: "D_dim" }},
    { "F# Major": { I: "F%23", ii: "G%23_m", iii: "A%23_m", IV: "B", V: "C%23", vi: "D%23_m", vii: "E%23_dim" }},
    { "Gb Major": { I: "Gb", ii: "Ab_m", iii: "Bb_m", IV: "B", V: "Db", vi: "Eb_m", vii: "F_dim" }},
    { "Ab Major": { I: "Ab", ii: "Bb_m", iii: "C_m", IV: "Db", V: "Eb", vi: "F_m", vii: "G_dim" }},      
];

const minorKeys = [
    { "A Minor": { i: "A_m", ii: "B_dim", III: "C", iv: "D_m", v: "E_m", VI: "F", VII: "G" }},
    { "B Minor": { i: "B_m", ii: "C%23_dim", III: "D", iv: "E_m", v: "F%23_m", VI: "G", VII: "A" }},
    { "C Minor": { i: "C_m", ii: "D_dim", III: "Eb", iv: "F_m", v: "G_m", VI: "Ab", VII: "Bb" }}, 
    { "D Minor": { i: "D_m", ii: "E_dim", III: "F", iv: "G_m", v: "A_m", VI: "Bb", VII: "C" }},
    { "E Minor": { i: "E_m", ii: "F%23_dim", III: "G", iv: "A_m", v: "B_m", VI: "C", VII: "D" }}, 
    { "F Minor": { i: "F_m", ii: "G_dim", III: "Ab", iv: "Bb_m", v: "C_m", VI: "Db", VII: "Eb" }},
    { "G Minor": { i: "G_m", ii: "A_dim", III: "Bb", iv: "C_m", v: "D_m", VI: "Eb", VII: "F" }},
    { "A# Minor": { i: "A%23_m", ii: "C_dim", III: "C%23", iv: "D%23_m", v: "F_m", VI: "F%23", VII: "G%23" }},
    { "Bb Minor": { i: "Bb_m", ii: "C_dim", III: "Db", iv: "Eb_m", v: "F_m", VI: "Bb", VII: "Ab" }},
    { "C# Minor": { i: "C%23_m", ii: "D%23_dim", III: "E", iv: "F%23_m", v: "G%23_m", VI: "A", VII: "B" }},
    { "Db Minor": { i: "Db_m", ii: "Eb_dim", III: "E", iv: "Gb_m", v: "Ab_m", VI: "A", VII: "B" }},
    { "Eb Minor": { i: "Eb_m", ii: "F_dim", III: "Gb", iv: "Ab_m", v: "Bb_m", VI: "B", VII: "Db" }},
    { "F# Minor": { i: "F%23_m", ii: "G%23_dim", III: "A", iv: "B_m", v: "C%23_m", VI: "D", VII: "E" }},
    { "Gb Minor": { i: "Gb_m", ii: "Ab_dim", III: "A", iv: "B_m", v: "Db_m", VI: "D", VII: "E" }}, 
    { "G# Minor": { i: "G%23_m", ii: "A%23_dim", III: "B", iv: "C%23_m", v: "D%23_m", VI: "E", VII: "F%23" }},
];

//add more progressions here to build up selection, handleProgressionArray function will do all the work
const majorProgressions = [
    { "I-IV-V": ["I","IV","V"] },
    { "I-vi-IV-V": ["I", "vi", "IV","V"] },
    { "vi-IV-I-V": ["vi","IV", "I", "V"] },
    { "I-vi-ii-V": ["I","vi", "ii", "V"] },
    { "I-IV-V-I": ["I", "IV","V", "I"] },
    { "I-V-vi-iii-IV-I-IV-V": ["I", "V", "vi","iii", "IV", "I", "IV", "V"] },
    { "ii-I-V": ["ii", "I", "V"] },
    { "I-V-vi-IV": ["I", "V", "vi", "IV"] },
    { "ii-IV-V": ["ii", "IV", "V"] },
    { "vi-IV-V": ["vi", "IV", "V"] },
];
const majorNashNumbers = ["I", "ii", "iii", "IV", "V", "vi", "vii"];

//add more progressions here to build up selection, handleProgressionArray function will do all the work
const minorProgressions = [
    { "i-iv-v": ["i", "iv", "v"] },
    { "i-VI-III-iv": ["i", "VI", "III", "iv"] },
    { "i-VI-VII": ["i", "VI","VII"] },
    { "i-ii-VII-v-i": ["i", "ii", "VII","v", "i"] },
    { "i-VI-III-VII": ["i", "VI", "III", "VII"] },
    { "i-iv-VII": ["i", "iv", "VII"] },
    { "i-VII-VI-VII": ["i", "VII", "VI", "VII"] },
    { "i-III-VII-VI": ["i", "III", "VII", "VI"] },
    { "i-v-iv-VII": ["i", "v", "iv", "VII"] },
    { "i-v-VII-iv": ["i", "v", "VII", "iv"] },
];
const minorNashNumbers = ["i", "ii", "III", "iv", "v", "VI", "VII"];

const chordKeySelectors = ["A", "A#", "Bb", "B", "C", "C#", "Db", "D", "D#", "Eb", "E", "F", "F#", "Gb", "G", "G#", "Ab"];

const guitarScalesData = [
    {"Major Scale": {
        fifth: images.Major5th,
        sixth: images.Major6th
    }},   
    {"Minor Pentatonic": {
        fifth: images.MinPentatonic5th,
        sixth: images.MinPentatonic6th
    }},  
    {"Blues Scale": {
        fifth: images.Blues5th,
        sixth: images.Blues6th
    }}, 
    {"Natural Minor/Aeolian": {
        fifth: images.NatMinor5th,
        sixth: images.NatMinor6th
    }}, 
    {"Dorian Mode": {
        fifth: images.Dorian5th,
        sixth: images.Dorian6th
    }}, 
    {"Mixolydian Mode": {
        fifth: images.Mixolydian5th,
        sixth: images.Mixolydian6th
    }}
];

export { 
    majorKeys, 
    minorKeys, 
    majorProgressions, 
    minorProgressions, 
    minorNashNumbers, 
    majorNashNumbers, 
    chordKeySelectors,
    guitarScalesData 
    };