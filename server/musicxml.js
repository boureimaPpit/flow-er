const fileSystem = require("fs");
const xml2js = require("xml2js");
const newma = require("./musical-score");
const Fraction = require("Fraction.js-master/fraction");

/*const symHei = { 
    c1: "c1", g1: "g1", d1: "d1", a1: "a1", e1: "e1", b1: "b1", fs1: "fs1", cs1: "cs1", gs1: "gs1", ds1: "ds1", as1: "as1", es1: "es1", bs1: "bs1", fss1: "fss1", css1: "css1", gss1: "gss1", dss1: "dss1", ass1: "ass1", ess1: "ess1", bss1: "bss1", f1: "f1", bf1: "bf1", ef1: "ef1", af1: "af1", df1: "df1", gf1: "gf1", cf1: "cf1", ff1: "ff1", bff1: "bff1", eff1: "eff1", aff1: "aff1", dff1: "dff1", gff1: "gff1", cff1: "cff1", fff1: "fff1", 
    c2: "c2", g2: "g2", d2: "d2", a2: "a2", e2: "e2", b2: "b2", fs2: "fs2", cs2: "cs2", gs2: "gs2", ds2: "ds2", as2: "as2", es2: "es2", bs2: "bs2", fss2: "fss2", css2: "css2", gss2: "gss2", dss2: "dss2", ass2: "ass2", ess2: "ess2", bss2: "bss2", f2: "f2", bf2: "bf2", ef2: "ef2", af2: "af2", df2: "df2", gf2: "gf2", cf2: "cf2", ff2: "ff2", bff2: "bff2", eff2: "eff2", aff2: "aff2", dff2: "dff2", gff2: "gff2", cff2: "cff2", fff2: "fff2", 
    c3: "c3", g3: "g3", d3: "d3", a3: "a3", e3: "e3", b3: "b3", fs3: "fs3", cs3: "cs3", gs3: "gs3", ds3: "ds3", as3: "as3", es3: "es3", bs3: "bs3", fss3: "fss3", css3: "css3", gss3: "gss3", dss3: "dss3", ass3: "ass3", ess3: "ess3", bss3: "bss3", f3: "f3", bf3: "bf3", ef3: "ef3", af3: "af3", df3: "df3", gf3: "gf3", cf3: "cf3", ff3: "ff3", bff3: "bff3", eff3: "eff3", aff3: "aff3", dff3: "dff3", gff3: "gff3", cff3: "cff3", fff3: "fff3", 
    0: "c4", g4: "g4", d4: "d4", a4: "a4", e4: "e4", b4: "b4", fs4: "fs4", cs4: "cs4", gs4: "gs4", ds4: "ds4", as4: "as4", es4: "es4", bs4: "bs4", fss4: "fss4", css4: "css4", gss4: "gss4", dss4: "dss4", ass4: "ass4", ess4: "ess4", bss4: "bss4", f4: "f4", bf4: "bf4", ef4: "ef4", af4: "af4", df4: "df4", gf4: "gf4", cf4: "cf4", ff4: "ff4", bff4: "bff4", eff4: "eff4", aff4: "aff4", dff4: "dff4", gff4: "gff4", cff4: "cff4", fff4: "fff4", 
    c5: "c5", g5: "g5", d5: "d5", a5: "a5", e5: "e5", b5: "b5", fs5: "fs5", cs5: "cs5", gs5: "gs5", ds5: "ds5", as5: "as5", es5: "es5", bs5: "bs5", fss5: "fss5", css5: "css5", gss5: "gss5", dss5: "dss5", ass5: "ass5", ess5: "ess5", bss5: "bss5", f5: "f5", bf5: "bf5", ef5: "ef5", af5: "af5", df5: "df5", gf5: "gf5", cf5: "cf5", ff5: "ff5", bff5: "bff5", eff5: "eff5", aff5: "aff5", dff5: "dff5", gff5: "gff5", cff5: "cff5", fff5: "fff5",
    c6: "c6", g6: "g6", d6: "d6", a6: "a6", e6: "e6", b6: "b6", fs6: "fs6", cs6: "cs6", gs6: "gs6", ds6: "ds6", as6: "as6", es6: "es6", bs6: "bs6", fss6: "fss6", css6: "css6", gss6: "gss6", dss6: "dss6", ass6: "ass6", ess6: "ess6", bss6: "bss6", f6: "f6", bf6: "bf6", ef6: "ef6", af6: "af6", df6: "df6", gf6: "gf6", cf6: "cf6", ff6: "ff6", bff6: "bff6", eff6: "eff6", aff6: "aff6", dff6: "dff6", gff6: "gff6", cff6: "cff6", fff6: "fff6",
    c7: "c7", g7: "g7", d7: "d7", a7: "a7", e7: "e7", b7: "b7", fs7: "fs7", cs7: "cs7", gs7: "gs7", ds7: "ds7", as7: "as7", es7: "es7", bs7: "bs7", fss7: "fss7", css7: "css7", gss7: "gss7", dss7: "dss7", ass7: "ass7", ess7: "ess7", bss7: "bss7", f7: "f7", bf7: "bf7", ef7: "ef7", af7: "af7", df7: "df7", gf7: "gf7", cf7: "cf7", ff7: "ff7", bff7: "bff7", eff7: "eff7", aff7: "aff7", dff7: "dff7", gff7: "gff7", cff7: "cff7", fff7: "fff7",
    c8: "c8", g8: "g8", d8: "d8", a8: "a8", e8: "e8", b8: "b8", fs8: "fs8", cs8: "cs8", gs8: "gs8", ds8: "ds8", as8: "as8", es8: "es8", bs8: "bs8", fss8: "fss8", css8: "css8", gss8: "gss8", dss8: "dss8", ass8: "ass8", ess8: "ess8", bss8: "bss8", f8: "f8", bf8: "bf8", ef8: "ef8", af8: "af8", df8: "df8", gf8: "gf8", cf8: "cf8", ff8: "ff8", bff8: "bff8", eff8: "eff8", aff8: "aff8", dff8: "dff8", gff8: "gff8", cff8: "cff8", fff8: "fff8"
};*/

const symHei = {
    "-3828": "cff1",
    "-3624": "dff1",
    "-3420": "eff1",
    "-3330": "fff1",
    "-3126": "gff1",
    "-2922": "aff1",
    "-2718": "bff1",
    "-3714": "cf1",
    "-3510": "df1",
    "-3306": "ef1",
    "-3216": "ff1",
    "-3012": "gf1",
    "-2808": "af1",
    "-2604": "bf1",
    "-3600": "c1",
    "-3396": "d1",
    "-3192": "e1",
    "-3102": "f1",
    "-2898": "g1",
    "-2694": "a1",
    "-2490": "b1",
    "-3486": "cs1",
    "-3282": "ds1",
    "-3078": "es1",
    "-2988": "fs1",
    "-2784": "gs1",
    "-2580": "as1",
    "-2376": "bs1",
    "-3372": "css1",
    "-3168": "dss1",
    "-2964": "ess1",
    "-2874": "fss1",
    "-2670": "gss1",
    "-2466": "ass1",
    "-2262": "bss1",

    "-2628": "cff2",
    "-2424": "dff2",
    "-2220": "eff2",
    "-2130": "fff2",
    "-1926": "gff2",
    "-1722": "aff2",
    "-1518": "bff2",
    "-2514": "df2",
    "-2310": "df2",
    "-2106": "ef2",
    "-2016": "ff2",
    "-1812": "gf2",
    "-1608": "af2",
    "-1404": "bf2",
    "-2400": "c2",
    "-2196": "d2",
    "-1992": "e2",
    "-1902": "f2",
    "-1698": "g2",
    "-1494": "a2",
    "-1290": "b2",
    "-2286": "cs2",
    "-2082": "ds2",
    "-1878": "es2",
    "-1788": "fs2",
    "-1584": "gs2",
    "-1380": "as2",
    "-1176": "bs2",
    "-2172": "css2",
    "-1968": "dss2",
    "-1764": "ess2",
    "-1674": "fss2",
    "-1470": "gss2",
    "-1266": "ass2",
    "-1062": "bss2",

    "-1428": "cff3",
    "-1224": "dff3",
    "-1020": "eff3",
    "-930": "fff3",
    "-726": "gff3",
    "-522": "aff3",
    "-318": "bff3",
    "-1314": "cf3",
    "-1110": "df3",
    "-906": "ef3",
    "-816": "ff3",
    "-612": "gf3",
    "-408": "af3",
    "-204": "bf3",
    "-1200": "c3",
    "-996": "d3",
    "-792": "e3",
    "-702": "f3",
    "-498": "g3",
    "-294": "a3",
    "-90": "b3",
    "-1086": "cs3",
    "-882": "ds3",
    "-678": "es3",
    "-588": "fs3",
    "-384": "gs3",
    "-180": "as3",
    "24": "bs3",
    "-972": "css3",
    "-768": "dss3",
    "-564": "ess3",
    "-474": "fss3",
    "-270": "gss3",
    "-66": "ass3",
    "138": "bss3",
  
    "-228": "cff4",
    "-24": "dff4",
    "180": "eff4",
    "270": "fff4",
    "474": "gff4",
    "678": "aff4",
    "882": "bff4",
    "-114": "cf4",
    "90": "df4",
    "294": "ef4",
    "384": "ff4",
    "588": "gf4",
    "792": "af4",
    "996": "bf4",
    "0": "c4",
    "204": "d4",
    "408": "e4",
    "498": "f4",
    "702": "g4",
    "906": "a4",
    "1110": "b4",
    "114": "cs4",
    "318": "ds4",
    "522": "es4",
    "612": "fs4",
    "816": "gs4",
    "1020": "as4",
    "1224": "bs4",
    "228": "css4",
    "432": "dss4",
    "636": "ess4",
    "726": "fss4",
    "930": "gss4",
    "1134": "ass4",
    "1338": "bss4",

    "972": "cff5",
    "1176": "dff5",
    "1380": "eff5",
    "1470": "fff5",
    "1674": "gf5",
    "1878": "af5",
    "2082": "bf5",
    "1086": "cf5",
    "1290": "df5",
    "1494": "ef5",
    "1584": "ff5",
    "1788": "gf5",
    "1992": "af5",
    "2196": "bf5",
    "1200": "c5",
    "1404": "d5",
    "1608": "e5",
    "1698": "f5",
    "1902": "g5",
    "2106": "a5",
    "2310": "b5",
    "1314": "cs5",
    "1518": "ds5",
    "1722": "es5",
    "1812": "fs5",
    "2016": "gs5",
    "2220": "as5",
    "2424": "bs5",
    "1428": "css5",
    "1632": "dss5",
    "1836": "ess5",
    "1926": "fss5",
    "2130": "gss5",
    "2334": "ass5",
    "2538": "bss5",

    "2172": "cff6",
    "2376": "dff6",
    "2580": "eff6",
    "2670": "fff6",
    "2874": "gff6",
    "3078": "aff6",
    "3282": "bff6",
    "2286": "cf6",
    "2490": "df6",
    "2694": "ef6",
    "2784": "ff6",
    "2988": "gf6",
    "3192": "af6",
    "3396": "bf6",
    "2400": "c6",
    "2604": "d6",
    "2808": "e6",
    "2898": "f6",
    "3102": "g6",
    "3306": "a6",
    "3510": "b6",
    "2514": "cs6",
    "2718": "ds6",
    "2922": "es6",
    "3012": "fs6",
    "3216": "gs6",
    "3420": "as6",
    "3624": "bs6",
    "2628": "css6",
    "2832": "dss6",
    "3036": "ess6",
    "3126": "fss6",
    "3330": "gss6",
    "3534": "ass6",
    "3738": "bss6",

    "3372": "cff7",
    "3576": "dff7",
    "3780": "eff7",
    "3870": "fff7",
    "4074": "gff7",
    "4278": "aff7",
    "4482": "bff7",
    "3486": "cf7",
    "3690": "df7",
    "3894": "ef7",
    "3984": "ff7",
    "4188": "gf7",
    "4392": "af7",
    "4596": "bf7",
    "3600": "c7",
    "3804": "d7",
    "4008": "e7",
    "4098": "f7",
    "4302": "g7",
    "4506": "a7",
    "4710": "b7",
    "3714": "cs7",
    "3918": "ds7",
    "4122": "es7",
    "4212": "fs7",
    "4416": "gs7",
    "4620": "as7",
    "4824": "bs7",
    "3828": "css7",
    "4032": "dss7",
    "4236": "ess7",
    "4326": "fss7",
    "4530": "gss7",
    "4734": "ass7",
    "4938": "bss7",

    "4572": "cff8",
    "4776": "dff8",
    "4980": "eff8",
    "5070": "fff8",
    "5274": "gff8",
    "5478": "aff8",
    "5682": "bff8",
    "4686": "cf8",
    "4890": "df8",
    "5094": "ef8",
    "5184": "ff8",
    "5388": "gf8",
    "5592": "af8",
    "5796": "bf8",
    "4800": "c8",
    "5004": "d8",
    "5208": "e8",
    "5298": "f8",
    "5502": "g8",
    "5706": "a8",
    "5910": "b8",
    "4914": "cs8",
    "5118": "ds8",
    "5322": "es8",
    "5412": "fs8",
    "5616": "gs8",
    "5820": "as8",
    "5024": "bs8",
    "5028": "css8",
    "5232": "dss8",
    "5436": "ess8",
    "5526": "fss8",
    "5730": "gss8",
    "5934": "ass8",
    "6138": "bss8"
}

const symDur = {
    "4": "w", "6": "w.",
    "2": "h", "3": "h.", 
    "1": "q", "1.5": "q.", 
    "0.5": "8th", "0.75": "8th.", 
    "0.25": "16th", "0.475": "16th.",
    "0.125": "32th", "0.1875": "32th.",
    "0.0625": "64th", "0.09375": "64th."
};

const xml2json = (filename) => {
    const xml = fileSystem.readFileSync(filename);
    xml2js.parseString(xml, { mergeAttrs: true }, (err, result) => {
        if (err) {
            throw err;
        }
        const json = JSON.stringify(result, null, 4);
        const script = toNscript(result);
        console.log(script.reference);
        const ofilename = /*(script.reference) ? script.reference :*/ "aRenommer";
        fileSystem.writeFileSync("scripts/newma/" + ofilename + ".json", json);
        fileSystem.writeFileSync("scripts/newma/" + ofilename, script.content);
    });
};

const json2newma = (filename) => {
    let json = fileSystem.readFileSync(filename + ".json");
    json = JSON.parse(json);
    const script = toNscript(json);
    console.log(script.reference);
    fileSystem.writeFileSync(filename, script.content);
};

const toNscript = (json) => {
    const g = 702, d = g + g - 1200, a = d + g, f = 1200 - g, ef = f + f + f - 1200, e = a + g - 1200;

    const types = {
        "whole": new Fraction(4),
        "half": new Fraction(2), 
        "quarter": new Fraction(1), 
        "eighth": new Fraction(1, 2), 
        "16th": new Fraction(1, 4), 
        "32nd": new Fraction(1, 8),
        "64th": new Fraction(1, 16)  
    }

    const transpositions = {
        "-2": -d,
        "-3": -ef, 
        "-4": -e, 
        "-5": -f, 
        "-7": -g, 
        "2": d,
        "3": ef,
        "4": e, 
        "5": f, 
        "7": g, 
    }

    const parts = {};
    /*for (const partList of json["score-partwise"]["part-list"]) {
        for (const part of partList["score-part"]) {
            parts[part.id] = part["part-name"];
        }
    }*/
    const clefs = {}, transpose = {}, lyric = {}, slurToEnd = {};
    for (const part of json["score-partwise"].part) {
        const id = part.id[0];
        if (!slurToEnd[id]) slurToEnd[id] = false;
        let currentDur = null, divisions, tieToEnd = false;
        for (const measure of part.measure) {
            const measureId = measure.number[0];
            if (!parts[measureId]) {
                parts[measureId] = {};
                lyric[measureId] = {};
            }
            parts[measureId][id] = {};
            lyric[measureId][id] = "";

            if (measure.attributes && measure.attributes[0].divisions) divisions = measure.attributes[0].divisions;

            if (!transpose[id] && measure.attributes && measure.attributes[0].transpose) {
                if (measure.attributes[0].transpose[0].chromatic) {
                    transpose[id] = transpositions[measure.attributes[0].transpose[0].chromatic[0]];
                }
                else if (measure.attributes[0].transpose[0]["octave-change"]) {
                    const nbOctave = parseInt(measure.attributes[0].transpose[0]["octave-change"]);
                    transpose[id] = 1200 * nbOctave;
                }
            }

            let chord, voiceId, grace = false, tie = false;
            for (const note of measure.note) {

                if (!note.chord) {
                    if (chord && chord.length > 0) {
                        parts[measureId][id][voiceId].push((chord.length == 1) ? chord[0] : `[${chord.join(" ")}]`);
                        if (tieToEnd) {
                            parts[measureId][id][voiceId].push("-tie");
                            tieToEnd = false;
                        }
                    }
                    chord = [];
                }

                voiceId = id;
                voiceId += ((note.voice) ? note.voice : 0);
                if (!parts[measureId][id][voiceId]) {
                    parts[measureId][id][voiceId] = ["voi", voiceId + "|" + ((note.staff) ? note.staff : 0)];

                    currentDur = null;
                    tieToEnd = false;

                    if (transpose[id]) {
                        parts[measureId][id][voiceId].push("transpose");
                        parts[measureId][id][voiceId].push(transpose[id]);  
                    }

                    if (measure.attributes && measure.attributes[0].clef) {
                        for (const clef of measure.attributes[0].clef) {
                            const clefNumber = (clef.number) ? clef.number : 0;
                            if (!clefs[id]) clefs[id] = {};
                            if (!clefs[id][clefNumber] || clefs[id][clefNumber] != clef.sign + clef.line) {
                                clefs[id][clefNumber] = clef.sign + clef.line;
                            }
                        }
                    }

                    const clefNumber = (note.staff) ? note.staff : 0;
                    if (clefs[id][clefNumber]) {
                    //parts[measureId][id][voiceId].push("clef")
                        parts[measureId][id][voiceId].push("cl" + clefs[id][clefNumber].toLowerCase());
                    }
                }
                  
                if (!grace && note.grace) {
                    grace = true;
                    parts[measureId][id][voiceId].push("grace");
                }
                else if (grace && !note.grace) {
                    grace = false;
                    parts[measureId][id][voiceId].push("-grace");
                }
              
                if (note.tie) {
                    for (let i = 0; i < note.tie.length; i++) {
                        if (note.tie[i].type[0] == "stop") tieToEnd = true;    
                        if (note.tie[i].type[0] == "start") {
                            if (tieToEnd) tieToEnd = false;
                            else parts[measureId][id][voiceId].push("tie");
                        }
                    }
                }

                if (note.lyric) {
                    if (["middle", "end"].includes(note.lyric[0].syllabic[0])) {
                        if (lyric[measureId][id].charAt(lyric[measureId][id].length - 1) != "-") lyric[measureId][id] += "-";
                    }
                    lyric[measureId][id] += note.lyric[0].text;
                    if (note.lyric[0].syllabic[0] == "begin") lyric[measureId][id] += "-";
                    if (note.lyric[0].syllabic[0] == "end") lyric[measureId][id] += " ";
                }

                if (note.notations) for (const notation of note.notations) {
                    if (notation.slur) {
                        if (notation.slur[0].type[0] == "stop") slurToEnd[id] = true;    
                        if (notation.slur[0].type[0] == "start") {
                            if (slurToEnd[id]) slurToEnd[id] = false;
                            else parts[measureId][id][voiceId].push("legato");
                        }
                    }
                }

                let duration;
                if (note.type) {
                    duration = types[note.type];
                    if (!duration) duration = types[note.type[0]._];
                    if (note.dot) for (const dot of note.dot) {
                        duration = duration.add(duration.div(2));
                    }  
                }
                else {
                    duration = new Fraction(note.duration, divisions);
                }

                if (note["time-modification"]) {
                    const timeMod = note["time-modification"][0];
                    duration = duration.mul(timeMod["normal-notes"][0]);
                    duration = duration.div(timeMod["actual-notes"][0]);  
                }
                if (duration && !duration.equals(currentDur)) {
                    parts[measureId][id][voiceId].push("dur");
                    parts[measureId][id][voiceId].push((duration.d != 1) ? ("" + duration.n + "/" + duration.d) : duration.n);
                    currentDur = duration;
                }
                if (note.rest) parts[measureId][id][voiceId].push("rest");
                else if (note.pitch) {
                    const pitches = [];
                    for (const pitch of note.pitch) {
                        let hei = pitch.step[0].toLowerCase();
                        if (pitch.alter) {
                            if (pitch.alter[0] == -2) hei += "ff";
                            else if (pitch.alter[0] == -1) hei += "f";
                            else if (pitch.alter[0] == 1) hei += "s";
                            else if (pitch.alter[0] == 2) hei += "ss";  
                        }
                        hei += pitch.octave[0];
                        pitches.push(hei);
                    }
                    chord = chord.concat(pitches);
                }
            }

            if (chord && chord.length > 0) {
                parts[measureId][id][voiceId].push((chord.length == 1) ? chord[0] : `[${chord.join(" ")}]`);
                if (tieToEnd) {
                    parts[measureId][id][voiceId].push("-tie");
                    tieToEnd = false;
                }
                if (slurToEnd[id]) {
                    parts[measureId][id][voiceId].push("-legato");
                    slurToEnd[id] = false;
                }
            }
            chord = [];
        }
    }

    let result = "", title = "", subtitle = "", composer = "", reference = "";
    if (json["score-partwise"]["credit"]) {
        for (const credit of json["score-partwise"]["credit"]) {
            if (credit["credit-type"]) {
                if (credit["credit-type"][0] == "title") {
                    title = credit["credit-words"][0]._;
                }
                if (credit["credit-type"][0] == "subtitle") {
                    subtitle = credit["credit-words"][0]._;
                }
                if (credit["credit-type"][0] == "composer") {
                    composer = credit["credit-words"][0]._;
                }  
            }
        }
        if (composer) {
            result += "composer \"" + composer + "\" ";
            reference += composer;
        }
        if (title) {
            result += "title \"" + title + "\" ";
            reference += "_" + title;
        }
        if (subtitle) {
            result += "subtitle \"" + subtitle + "\" ";
            reference += "_" + subtitle;
        }
        result += "\n";
    }
    for (const measureId of Object.keys(parts)) {
        result += "measure " + measureId + "\n";
        result += "(sync\n";
        for (const id of Object.keys(parts[measureId])) {
            for (const key of Object.keys(parts[measureId][id])) {
                const part = parts[measureId][id][key].map(x => (Array.isArray(x) && x.length == 1) ? x[0] : x);
                result += "  (";
                if (lyric[measureId][id]) result += "\"" + lyric[measureId][id] + "\"\n";
                for (const atom of part) {
                    result += atom + " ";
                }
                result += ")\n";
            }
        }
        result += ")\n";
    }
    return { reference: reference, content : result };
};

const filterResult = (nscript, voices, measureStart, measureEnd) => {

    const addChord = (nscript) => {
        let result = "[";
        for (let i = 1; i < nscript.length; i++) {
            let term = nscript[i]; 
            if (typeof term == "string") {
                if (term.charAt(0) == ":") term = term.substring(1); 
                else term = "\"" + term + "\"";
            }
            
            if (term == "dur") {
                term = nscript[++i];
                const dur = symDur[term];
                if (dur) result += dur + " ";
                else result += "dur " + term + " ";
            }
            else if (term == "hei") {
                term = nscript[++i];
                const hei = symHei[term];
                if (hei) result += hei + " ";
                else result += "hei " + term + " ";
            }
            else result += term + " ";
        }
        result += "] ";
        return result;
    };

    const addVoice = (nscript) => {
        let result = "(";
        for (let i = 0; i < nscript.length; i++) {
            let term = nscript[i]; 
            if (typeof term == "string") {
                if (term.charAt(0) == ":") term = term.substring(1); 
                else term = "\"" + term + "\"";
            }

            if (Array.isArray(term)) {
                if (term[0] == ":chord") result += addChord(term);
                else result += addVoice(term);
            }
            else if (term == "dur") {
                term = nscript[++i];
                const dur = symDur[term];
                if (dur) result += dur + " ";
                else result += "dur " + term + " ";
            }
            else if (term == "hei") {
                term = nscript[++i];
                const hei = symHei[term];
                if (hei) result += hei + " ";
                else result += "hei " + term + " ";
            }
            else result += term + " ";
        }
        result += ")\n";
        return result;
    };

    const filterVoices = (nscript, voices) => {
        let result = "";
        let term = nscript[0];
        if (typeof term == "string") {
            if (term.charAt(0) == ":") term = term.substring(1); 
            else term = "\"" + term + "\"";
        }
        if (term == "sync") {
            let partialResult = "";
            for (let i = 1; i < nscript.length; i++) {
                let term = nscript[i];
                if (voices.includes(term[1].substring(1)) || voices.includes(term[2].substring(1))) partialResult += addVoice(term);
            }
            if (partialResult !== "") result += "(sync\n" + partialResult + ")\n";
        }
        return result;
    };

    var result = "";
    nscript = JSON.parse(newma.parse(nscript));
    for (let i = 0; i < nscript.length; i++) {
        let term = nscript[i];
        if (typeof term == "string") {
            if (term.charAt(0) == ":") term = term.substring(1); 
            else term = "\"" + term + "\"";
        }
        if (term == "measure") {
            term = nscript[++i]; 
            if (term >= measureStart && term <= measureEnd) {
                const measure = term;
                let partialResult = "";
                term = nscript[++i];
                partialResult += filterVoices(term, voices);
                if (partialResult != "") result += "\nmeasure " + measure + "\n" + partialResult;
            }
            else i++;
        }
        else result += term + " ";
    }
    return result;
};

module.exports = {
    xml2json,
    json2newma,
    toNscript,
    filterResult
};
