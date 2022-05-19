const majorKeys = [
    { "C Major" :{ I: "C", ii: "Dm", iii: "Em", IV: "F", V: "G", vi: "Am", vii: "B⁰" }},
    { "G Major" :{ I: "G", ii: "Am", iii: "Bm", IV: "C", V: "D", vi: "Em", vii: "F#⁰" }},
    { "D Major" :{ I: "D", ii: "Em", iii: "F#m", IV: "G", V: "A", vi: "Bm", vii: "C#⁰" }},
    { "A Major" :{ I: "A", ii: "Bm", iii: "C#m", IV: "D", V: "E", vi: "F#m", vii: "G#⁰" }},
    { "E Major" :{ I: "E", ii: "F#m", iii: "G#m", IV: "A", V: "B", vi: "C#m", vii: "D#⁰" }},
    { "B Major" :{ I: "B", ii: "C#m", iii: "D#m", IV: "E", V: "F#", vi: "G#m", vii: "A#⁰" }},
    { "F# Major" :{ I: "F#", ii: "G#m", iii: "A#m", IV: "B", V: "C#", vi: "D#m", vii: "E#⁰" }},
    { "F Major" :{ I: "F", ii: "Gm", iii: "Am", IV: "Bb", V: "C", vi: "Dm", vii: "E⁰" }},
    { "Bb Major" :{ I: "Bb", ii: "Cm", iii: "Dm", IV: "Eb", V: "F", vi: "Gm", vii: "A⁰" }},
    { "Eb Major" :{ I: "Eb", ii: "Fm", iii: "Gm", IV: "Ab", V: "Bb", vi: "Cm", vii: "D⁰" }},
    { "Ab Major" :{ I: "Ab", ii: "Bbm", iii: "Cm", IV: "Db", V: "Eb", vi: "Fm", vii: "G⁰" }},
    { "Db Major" :{ I: "Db", ii: "Ebm", iii: "Fm", IV: "Gb", V: "Ab", vi: "Bbm", vii: "C⁰" }},
    { "Gb Major" :{ I: "Gb", ii: "Abm", iii: "Bbm", IV: "Cb", V: "Db", vi: "Ebm", vii: "F⁰" }},
    { "Cb Major" :{ I: "Cb", ii: "Dbm", iii: "Ebm", IV: "Fb", V: "Gb", vi: "Abm", vii: "Bb⁰" }}
];

const minorKeys = [
    { "C Minor" :{ i: "Cm", ii: "D⁰", III: "Eb", iv: "Fm", v: "Gm", VI: "Ab", VII: "Bb" }},
    { "G Minor" :{ i: "Gm", ii: "A⁰", III: "Bb", iv: "Cm", v: "Dm", VI: "Eb", VII: "F" }},
    { "D Minor" :{ i: "Dm", ii: "E⁰", III: "F", iv: "Gm", v: "Am", VI: "Bb", VII: "C" }},
    { "A Minor" :{ i: "Am", ii: "B⁰", III: "C", iv: "Dm", v: "Em", VI: "F", VII: "G" }},
    { "E Minor" :{ i: "Em", ii: "F#⁰", III: "G", iv: "Am", v: "Bm", VI: "C", VII: "D" }},
    { "B Minor" :{ i: "Bm", ii: "C#⁰", III: "D", iv: "Em", v: "F#m", VI: "G", VII: "A" }},
    { "F# Minor" :{ i: "F#m", ii: "G#⁰", III: "A", iv: "Bm", v: "C#m", VI: "D", VII: "E" }},
    { "F Minor" :{ i: "Fm", ii: "G⁰", III: "Ab", iv: "Bbm", v: "Cm", VI: "Db", VII: "Eb" }},
    { "Bb Minor" :{ i: "Bbm", ii: "C⁰", III: "Db", iv: "Ebm", v: "Fm", VI: "Gb", VII: "Ab" }},
    { "Eb Minor" :{ i: "Ebm", ii: "F⁰", III: "Gb", iv: "Abm", v: "Bbm", VI: "Cb", VII: "Db" }},
    { "Ab Minor" :{ i: "Abm", ii: "Bb⁰", III: "Cb", iv: "Dbm", v: "Ebm", VI: "Fb", VII: "Gb" }},
    { "Db Minor" :{ i: "Dbm", ii: "Eb⁰", III: "Fb", iv: "Gbm", v: "Abm", VI: "Bbb", VII: "Cb" }},
    { "Gb Minor" :{ i: "Gbm", ii: "Ab⁰", III: "Bbb", iv: "Cbm", v: "Dbm", VI: "Ebb", VII: "Fb" }},
    { "Cb Minor" :{ i: "Cbm", ii: "Db⁰", III: "Ebb", iv: "Fbm", v: "Gbm", VI: "Abb", VII: "Bbb⁰" }}
];

const majCommonProgressions = [
    { "I-IV-V" : ["I","IV","V"] },
    { "I-vi-IV-V" : ["I", "vi", "IV","V"] },
    { "vi-IV-I-V" : ["vi","IV", "I", "V"] },
    { "I-vi-ii-V" : ["I","vi", "ii", "V"] },
]

const majRockProgressions = [
    { "I-vi-IV-V" : ["I", "vi", "IV","V"] },
    { "I-IV-V-I" : ["I", "IV","V", "I"] },
    { "I-V-vi-iii-IV-I-IV-V" : ["I", "V", "vi","iii", "IV", "I", "IV", "V"] },
    { "ii-I-V" : ["ii", "I", "V"] },
    { "ii-I-V" : ["ii", "I", "V"] },
    { "I-V-vi-IV" : ["I", "V", "vi", "IV"] },
    { "ii-IV-V" : ["ii", "IV", "V"] },
    { "VI-IV-V" : ["VI", "IV", "V"] },
]

const minSadProgressions = [
    { "i-iv-v" : ["i", "iv", "v"] },
    { "i-iv-V" : ["i", "iv","V"] },
    { "i-ii-VII-V-i" : ["i", "ii", "VII","V", "i"] },
    { "i-VI-III-VII" : ["i", "VI", "III", "VII"] },
]

const minJazzProgressions = [
    { "i-iv-v" : ["i", "iv", "v"] },
    { "i-iv-V" : ["i", "iv","V"] },
    { "i-ii-VII-V-i" : ["i", "ii", "VII","V", "i"] },
    { "i-VI-III-VII" : ["i", "VI", "III", "VII"] },
]


export { majorKeys, minorKeys };