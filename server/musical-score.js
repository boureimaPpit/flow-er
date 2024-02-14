const fileSystem = require("fs");
const Fraction = require("Fraction.js-master/fraction");

const //hei = "hei",
    c = 0,
    g = 702,
    d = g + g - 1200,
    a = d + g,
    e = a + g - 1200,
    b = e + g,
    fs = b + g - 1200,
    cs = fs + g - 1200,
    gs = cs + g,
    ds = gs + g - 1200,
    as = ds + g,
    es = as + g - 1200,
    bs = es + g,
    fss = bs + g - 1200,
    css = fss + g - 1200,
    gss = css + g,
    dss = gss + g - 1200,
    ass = dss + g,
    ess = ass + g - 1200,
    bss = ess + g,
    f = 1200 - g,
    bf = f - g + 1200,
    ef = bf - g,
    af = ef - g + 1200,
    df = af - g,
    gf = df - g + 1200,
    cf = gf - g,
    ff = cf - g + 1200,
    bff = ff - g + 1200,
    eff = bff - g,
    aff = eff - g + 1200,
    dff = aff - g,
    gff = dff - g + 1200,
    cff = gff - g,
    fff = cff - g + 1200;

c4 = c, g4 = g, d4 = d, a4 = a, e4 = e, b4 = b, fs4 = fs, cs4 = cs, gs4 = gs, ds4 = ds, as4 = as, es4 = es, bs4 = bs, fss4 = fss, css4 = css, gss4 = gss, dss4 = dss, ass4 = ass, ess4 = ess, bss4 = bss, f4 = f, bf4 = bf, ef4 = ef, af4 = af, df4 = df, gf4 = gf, cf4 = cf, ff4 = ff, bff4 = bff, eff4 = eff, aff4 = aff, dff4 = aff, gff4 = gff, cff4 = cff, fff4 = fff;
c3 = c4 - 1200, g3 = g4 - 1200, d3 = d4 - 1200, a3 = a4 - 1200, e3 = e4 - 1200, b3 = b4 - 1200, fs3 = fs4 - 1200, cs3 = cs4 - 1200, gs3 = gs4 - 1200, ds3 = ds4 - 1200, as3 = as4 - 1200, es3 = es4 - 1200, bs3 = bs4 - 1200, fss3 = fss4 - 1200, css3 = css4 - 1200, gss3 = gss4 - 1200, dss3 = dss4 - 1200, ass3 = ass4 - 1200, ess3 = ess4 - 1200, bss3 = bss4 - 1200, f3 = f4 - 1200, bf3 = bf4 - 1200, ef3 = ef4 - 1200, af3 = af4 - 1200, df3 = df4 - 1200, gf3 = gf4 - 1200, cf3 = cf4 - 1200, ff3 = ff4 - 1200, bff3 = bff4 - 1200, eff3 = eff4 - 1200, aff3 = aff4 - 1200, dff3 = aff4 - 1200, gff3 = gff4 - 1200, cff3 = cff4 - 1200, fff3 = fff4 - 1200;
c2 = c3 - 1200, g2 = g3 - 1200, d2 = d3 - 1200, a2 = a3 - 1200, e2 = e3 - 1200, b2 = b3 - 1200, fs2 = fs3 - 1200, cs2 = cs3 - 1200, gs2 = gs3 - 1200, ds2 = ds3 - 1200, as2 = as3 - 1200, es2 = es3 - 1200, bs2 = bs3 - 1200, fss2 = fss3 - 1200, css2 = css3 - 1200, gss2 = gss3 - 1200, dss2 = dss3 - 1200, ass2 = ass3 - 1200, ess2 = ess3 - 1200, bss2 = bss3 - 1200, f2 = f3 - 1200, bf2 = bf3 - 1200, ef2 = ef3 - 1200, af2 = af3 - 1200, df2 = df3 - 1200, gf2 = gf3 - 1200, cf2 = cf3 - 1200, ff2 = ff3 - 1200, bff2 = bff3 - 1200, eff2 = eff3 - 1200, aff2 = aff3 - 1200, dff2 = aff3 - 1200, gff2 = gff3 - 1200, cff2 = cff3 - 1200, fff2 = fff3 - 1200;
c1 = c2 - 1200, g1 = g2 - 1200, d1 = d2 - 1200, a1 = a2 - 1200, e1 = e2 - 1200, b1 = b2 - 1200, fs1 = fs2 - 1200, cs1 = cs2 - 1200, gs1 = gs2 - 1200, ds1 = ds2 - 1200, as1 = as2 - 1200, es1 = es2 - 1200, bs1 = bs2 - 1200, fss1 = fss2 - 1200, css1 = css2 - 1200, gss1 = gss2 - 1200, dss1 = dss2 - 1200, ass1 = ass2 - 1200, ess1 = ess2 - 1200, bss1 = bss2 - 1200, f1 = f2 - 1200, bf1 = bf2 - 1200, ef1 = ef2 - 1200, af1 = af2 - 1200, df1 = df2 - 1200, gf1 = gf2 - 1200, cf1 = cf2 - 1200, ff1 = ff2 - 1200, bff1 = bff2 - 1200, eff1 = eff2 - 1200, aff1 = aff2 - 1200, dff1 = aff2 - 1200, gff1 = gff2 - 1200, cff1 = cff2 - 1200, fff1 = fff2 - 1200;
c5 = c4 + 1200, g5 = g4 + 1200, d5 = d4 + 1200, a5 = a4 + 1200, e5 = e4 + 1200, b5 = b4 + 1200, fs5 = fs4 + 1200, cs5 = cs4 + 1200, gs5 = gs4 + 1200, ds5 = ds4 + 1200, as5 = as4 + 1200, es5 = es4 + 1200, bs5 = bs4 + 1200, fss5 = fss4 + 1200, css5 = css4 + 1200, gss5 = gss4 + 1200, dss5 = dss4 + 1200, ass5 = ass4 + 1200, ess5 = ess4 + 1200, bss5 = bss4 + 1200, f5 = f4 + 1200, bf5 = bf4 + 1200, ef5 = ef4 + 1200, af5 = af4 + 1200, df5 = df4 + 1200, gf5 = gf4 + 1200, cf5 = cf4 + 1200, ff5 = ff4 + 1200, bff5 = bff4 + 1200, eff5 = eff4 + 1200, aff5 = aff4 + 1200, dff5 = aff4 + 1200, gff5 = gff4 + 1200, cff5 = cff4 + 1200, fff5 = fff4 + 1200;
c6 = c5 + 1200, g6 = g5 + 1200, d6 = d5 + 1200, a6 = a5 + 1200, e6 = e5 + 1200, b6 = b5 + 1200, fs6 = fs5 + 1200, cs6 = cs5 + 1200, gs6 = gs5 + 1200, ds6 = ds5 + 1200, as6 = as5 + 1200, es6 = es5 + 1200, bs6 = bs5 + 1200, fss6 = fss5 + 1200, css6 = css5 + 1200, gss6 = gss5 + 1200, dss6 = dss5 + 1200, ass6 = ass5 + 1200, ess6 = ess5 + 1200, bss6 = bss5 + 1200, f6 = f5 + 1200, bf6 = bf5 + 1200, ef6 = ef5 + 1200, af6 = af5 + 1200, df6 = df5 + 1200, gf6 = gf5 + 1200, cf6 = cf5 + 1200, ff6 = ff5 + 1200, bff6 = bff5 + 1200, eff6 = eff5 + 1200, aff6 = aff5 + 1200, dff6 = aff5 + 1200, gff6 = gff5 + 1200, cff6 = cff5 + 1200, fff6 = fff5 + 1200;
c7 = c6 + 1200, g7 = g6 + 1200, d7 = d6 + 1200, a7 = a6 + 1200, e7 = e6 + 1200, b7 = b6 + 1200, fs7 = fs6 + 1200, cs7 = cs6 + 1200, gs7 = gs6 + 1200, ds7 = ds6 + 1200, as7 = as6 + 1200, es7 = es6 + 1200, bs7 = bs6 + 1200, fss7 = fss6 + 1200, css7 = css6 + 1200, gss7 = gss6 + 1200, dss7 = dss6 + 1200, ass7 = ass6 + 1200, ess7 = ess6 + 1200, bss7 = bss6 + 1200, f7 = f6 + 1200, bf7 = bf6 + 1200, ef7 = ef6 + 1200, af7 = af6 + 1200, df7 = df6 + 1200, gf7 = gf6 + 1200, cf7 = cf6 + 1200, ff7 = ff6 + 1200, bff7 = bff6 + 1200, eff7 = eff6 + 1200, aff7 = aff6 + 1200, dff7 = aff6 + 1200, gff7 = gff6 + 1200, cff7 = cff6 + 1200, fff7 = fff6 + 1200;
c8 = c7 + 1200, g8 = g7 + 1200, d8 = d7 + 1200, a8 = a7 + 1200, e8 = e7 + 1200, b8 = b7 + 1200, fs8 = fs7 + 1200, cs8 = cs7 + 1200, gs8 = gs7 + 1200, ds8 = ds7 + 1200, as8 = as7 + 1200, es8 = es7 + 1200, bs8 = bs7 + 1200, fss8 = fss7 + 1200, css8 = css7 + 1200, gss8 = gss7 + 1200, dss8 = dss7 + 1200, ass8 = ass7 + 1200, ess8 = ess7 + 1200, bss8 = bss7 + 1200, f8 = f7 + 1200, bf8 = bf7 + 1200, ef8 = ef7 + 1200, af8 = af7 + 1200, df8 = df7 + 1200, gf8 = gf7 + 1200, cf8 = cf7 + 1200, ff8 = ff7 + 1200, bff8 = bff7 + 1200, eff8 = eff7 + 1200, aff8 = aff7 + 1200, dff8 = aff7 + 1200, gff8 = gff7 + 1200, cff8 = cff7 + 1200, fff8 = fff7 + 1200;

const hei = { "c": c, "g": g, "d": d, "a": a, "e": e, "b": b, "fs": fs, "cs": cs, "gs": gs, "ds": ds, "as": as, "es": es, "bs": bs, "fss": fss, "css": css, "gss": gss, "dss": dss, "ass": ass, "ess": ess, "bss": bss, "f": f, "bf": bf, "ef": ef, "af": af, "df": df, "gf": gf, "cf": cf, "ff": ff, "bff": bff, "eff": eff, "aff": aff, "dff": aff, "gff": gff, "cff": cff, "fff": fff, 
    "c1": c1, "g1": g1, "d1": d1, "a1": a1, "e1": e1, "b1": b1, "fs1": fs1, "cs1": cs1, "gs1": gs1, "ds1": ds1, "as1": as1, "es1": es1, "bs1": bs1, "fss1": fss1, "css1": css1, "gss1": gss1, "dss1": dss1, "ass1": ass1, "ess1": ess1, "bss1": bss1, "f1": f1, "bf1": bf1, "ef1": ef1, "af1": af1, "df1": df1, "gf1": gf1, "cf1": cf1, "ff1": ff1, "bff1": bff1, "eff1": eff1, "aff1": aff1, "dff1": aff1, "gff1": gff1, "cff1": cff1, "fff1": fff2, 
    "c2": c2, "g2": g2, "d2": d2, "a2": a2, "e2": e2, "b2": b2, "fs2": fs2, "cs2": cs2, "gs2": gs2, "ds2": ds2, "as2": as2, "es2": es2, "bs2": bs2, "fss2": fss2, "css2": css2, "gss2": gss2, "dss2": dss2, "ass2": ass2, "ess2": ess2, "bss2": bss2, "f2": f2, "bf2": bf2, "ef2": ef2, "af2": af2, "df2": df2, "gf2": gf2, "cf2": cf2, "ff2": ff2, "bff2": bff2, "eff2": eff2, "aff2": aff2, "dff2": aff2, "gff2": gff2, "cff2": cff2, "fff2": fff2, 
    "c3": c3, "g3": g3, "d3": d3, "a3": a3, "e3": e3, "b3": b3, "fs3": fs3, "cs3": cs3, "gs3": gs3, "ds3": ds3, "as3": as3, "es3": es3, "bs3": bs3, "fss3": fss3, "css3": css3, "gss3": gss3, "dss3": dss3, "ass3": ass3, "ess3": ess3, "bss3": bss3, "f3": f3, "bf3": bf3, "ef3": ef3, "af3": af3, "df3": df3, "gf3": gf3, "cf3": cf3, "ff3": ff3, "bff3": bff3, "eff3": eff3, "aff3": aff3, "dff3": aff3, "gff3": gff3, "cff3": cff3, "fff3": fff3, 
    "c4": c4, "g4": g4, "d4": d4, "a4": a4, "e4": e4, "b4": b4, "fs4": fs4, "cs4": cs4, "gs4": gs4, "ds4": ds4, "as4": as4, "es4": es4, "bs4": bs4, "fss4": fss4, "css4": css4, "gss4": gss4, "dss4": dss4, "ass4": ass4, "ess4": ess4, "bss4": bss4, "f4": f4, "bf4": bf4, "ef4": ef4, "af4": af4, "df4": df4, "gf4": gf4, "cf4": cf4, "ff4": ff4, "bff4": bff4, "eff4": eff4, "aff4": aff4, "dff4": aff4, "gff4": gff4, "cff4": cff4, "fff4": fff4, 
    "c5": c5, "g5": g5, "d5": d5, "a5": a5, "e5": e5, "b5": b5, "fs5": fs5, "cs5": cs5, "gs5": gs5, "ds5": ds5, "as5": as5, "es5": es5, "bs5": bs5, "fss5": fss5, "css5": css5, "gss5": gss5, "dss5": dss5, "ass5": ass5, "ess5": ess5, "bss5": bss5, "f5": f5, "bf5": bf5, "ef5": ef5, "af5": af5, "df5": df5, "gf5": gf5, "cf5": cf5, "ff5": ff5, "bff5": bff5, "eff5": eff5, "aff5": aff5, "dff5": aff5, "gff5": gff5, "cff5": cff5, "fff5": fff5,
    "c6": c6, "g6": g6, "d6": d6, "a6": a6, "e6": e6, "b6": b6, "fs6": fs6, "cs6": cs6, "gs6": gs6, "ds6": ds6, "as6": as6, "es6": es6, "bs6": bs6, "fss6": fss6, "css6": css6, "gss6": gss6, "dss6": dss6, "ass6": ass6, "ess6": ess6, "bss6": bss6, "f6": f6, "bf6": bf6, "ef6": ef6, "af6": af6, "df6": df6, "gf6": gf6, "cf6": cf6, "ff6": ff6, "bff6": bff6, "eff6": eff6, "aff6": aff6, "dff6": aff6, "gff6": gff6, "cff6": cff6, "fff6": fff6,
    "c7": c7, "g7": g7, "d7": d7, "a7": a7, "e7": e7, "b7": b7, "fs7": fs7, "cs7": cs7, "gs7": gs7, "ds7": ds7, "as7": as7, "es7": es7, "bs7": bs7, "fss7": fss7, "css7": css7, "gss7": gss7, "dss7": dss7, "ass7": ass7, "ess7": ess7, "bss7": bss7, "f7": f7, "bf7": bf7, "ef7": ef7, "af7": af7, "df7": df7, "gf7": gf7, "cf7": cf7, "ff7": ff7, "bff7": bff7, "eff7": eff7, "aff7": aff7, "dff7": aff7, "gff7": gff7, "cff7": cff7, "fff7": fff7,
    "c8": c8, "g8": g8, "d8": d8, "a8": a8, "e8": e8, "b8": b8, "fs8": fs8, "cs8": cs8, "gs8": gs8, "ds8": ds8, "as8": as8, "es8": es8, "bs8": bs8, "fss8": fss8, "css8": css8, "gss8": gss8, "dss8": dss8, "ass8": ass8, "ess8": ess8, "bss8": bss8, "f8": f8, "bf8": bf8, "ef8": ef8, "af8": af8, "df8": df8, "gf8": gf8, "cf8": cf8, "ff8": ff8, "bff8": bff8, "eff8": eff8, "aff8": aff8, "dff8": aff8, "gff8": gff8, "cff8": cff8, "fff8": fff8 };

const validIdentifiers = [':composer', ':reference', ':title', ":subtitle"]

const validProperties = [
    ':tie', ':-tie',
    ':fermata', ':-fermata',
    ':legato', ':-legato', 
    ':pizzicato', ':-pizzicato',
    ':tenuto', ':-tenuto',
    ':staccato', ':-staccato',
    ':grace', ':-grace',
    ':clg2', ':-clg2',
    ':clc1', ':-clc1',
    ':clc2', ':-clc2',
    ':clc3', ':-clc3',
    ':clc4', ':-clc4',
    ':clf4', ':-clf4',
    ':clf3', ':-clf3',
    ':clperc', ':-clperc',
]

const keySignatures = [":1s", ":2s", ":3s", ":4s", ":5s", ":6s", ":7s", ":1b", ":2b", ":3b", ":4b", ":5b", ":6b", ":7b"];
const timeSignatures = [
    ":1:1", ":2:1", ":3:1", ":4:1", ":5:1", ":6:1", ":7:1", ":8:1", ":9:1", ":10:1", ":11:1", ":12:1",
    ":1:2", ":2:2", ":3:2", ":4:2", ":5:2", ":6:2", ":7:2", ":8:2", ":9:2", ":10:2", ":11:2", ":12:2",
    ":1:4", ":2:4", ":3:4", ":4:4", ":5:4", ":6:4", ":7:4", ":8:4", ":9:4", ":10:4", ":11:4", ":12:4",
    ":1:8", ":2:8", ":3:8", ":4:8", ":5:8", ":6:8", ":7:8", ":8:8", ":9:8", ":10:8", ":11:8", ":12:8",
];

function parse(input) {

    const dur = {
        'w': 4, 'w.': 6,
        'h': 2, 'h.': 3, 
        'q': 1, 'q.': new Fraction(3, 2), 
        '8th': new Fraction(1, 2), '8th.': new Fraction(3, 4), 
        '16th': new Fraction(1, 4), '16th.': new Fraction(3, 8), 
        '32th': new Fraction(1, 8), '32th.': new Fraction(3, 16),
        '64th': new Fraction(1, 16), '64th.': new Fraction(3, 32)
    };    

    const replace = function(token) {
        if (hei[token] !== undefined) return '":hei", ' + hei[token];
        if (dur[token]) return '":dur", ' + JSON.stringify(dur[token]);
        if (token[0] == '"') return /*'":hei", ' +*/ token ;
        if (token[token.length - 1] == '=') return '"let", ' + '"' + token.substring(0, token.length - 1) + '"';
        if (token[0] == '=') return '"=' + token.substring(1, token.length) + '"';
        const split = token.split("/");
        if (split.length == 2 && !isNaN(split[0]) && !isNaN(split[1])) return new Fraction(split[0], split[1]);
        if (isNaN(token)) return '":' + token + '"';
        return token;
    };
  
    let result = '[', token = '', currentList = false;
  
    for (let i = 0; i < input.length; i++) {
        let char = input[i]; 
        if ([' ', ";", "\n", '(', ')', '[', ']'].includes(char)) { 
            while ([' ', ";", "\n"].includes(char)) { 
                if (char == ';') while (i < input.length && char != "\n") { i++; char = input[i]; }
                else { i++; char = input[i]; }
            }
            if (token) {
                result += replace(token);
                token = '';
                currentList = true;
            } 
            if (['(', ')'].includes(char)) {
                if (char == ')') currentList = true;
                else if (currentList && char == '(') {
                    result += ', '; 
                    currentList = false;
                }
                result += { '(': '[', ')': ']' }[char]; 
            }
            else if (['[', ']'].includes(char)) {
                if (char == ']') currentList = true;
                else if (currentList && char == '[') {
                    result += ', '; 
                    currentList = false;
                }
                result += { '[': '[":chord", ', ']': ']' }[char]; 
            }
            else {
                if (currentList && i < input.length) result += ', ';
                i--;
            }
        }
        else if (char == '"') {
            token += char;
            char = input[++i];
            while (i < input.length && char != '"') {
                token += char;
                char = input[++i];
            }
            token += char;
        }
        else token += char;
    } 
    if (token) result += replace(token);
    return result + ']';
}

function keySignature() {
    return this.properties.reduce( (acc, curr) => ((acc) ? acc : ((keySignatures.includes(curr)) ? curr : null )), null);
}

/*function timeSignature() {
  return this.properties.reduce( (acc, curr) => ((acc) ? acc : ((timeSignatures.includes(curr)) ? curr : null )), null);
}*/

function tree2sequence(parsed, sequence, ind, measure, voi, pos, dur, hei, lyrics, type, stack, properties, identifiers, timeSignature, tempo, transpose) {

    const voices = [
        ":flute",
        ":flute+",
        ":petite_flute", 
        ":petite_flute+", 
        ":hautbois", 
        ":hautbois+", 
        ":cor_anglais", 
        ":cor_anglais+", 
        ":clarinette_mib", 
        ":clarinette_mib+", 
        ":clarinette_sib", 
        ":clarinette_sib+", 
        ":clarinette_basse", 
        ":clarinette_basse+", 
        ":basson", 
        ":basson+", 
        ":contrebasson", 
        ":contrebasson+", 
        ":cor", 
        ":cor+", 
        ":cor++", 
        ":trompette_re", 
        ":trompette_ut", 
        ":trompette_ut+", 
        ":trombone", 
        ":trombone+", 
        ":trombone++", 
        ":tuba", 
        ":timbale", 
        ":tambour", 
        ":cymballe", 
        ":harpe", 
        ":harpe+", 
        ":violon", 
        ":violon+", 
        ":violon++", 
        ":alto", 
        ":alto+", 
        ":violoncelle", 
        ":violoncelle+", 
        ":contrebasse", 
        ":contrebasse+", 

        ":sol", 
        ":sol+", 
        ":ut1", 
        ":ut2", 
        ":ut3", 
        ":ut4", 
        ":fa3", 
        ":fa4", 
        ":fa4+", 
        ":soprano", 
        ":alto", 
        ":tenor", 
        ":bass", 
        ":percussion"
    ];
    const durations = { w: new Fraction(4), h: new Fraction(2), q: new Fraction(1), "8th": new Fraction(0.5), "16th": new   Fraction(0.25), "32th": new Fraction(0.125), "64th": new Fraction(0.0625) };
    const validProps = validProperties.concat(keySignatures)/*.concat(timeSignatures)*/;

    const serialize = function(properties) {
        let result = [], canceled = [];
        while (properties) {
            const property = properties.car;
            if (property && property.substring(1, 2) == "-") canceled.push(":" + property.substring(2, property.length));
            else if (!canceled.includes(property)) result.push(properties.car);
            properties = properties.cdr;
        }
        return result;
    }

    if (ind == parsed.length) return pos;
    let current = parsed[ind];
    if (Array.isArray(current)) pos = tree2sequence(current, sequence, 0, measure, voi, pos, dur, hei, lyrics, type, stack, properties, identifiers, timeSignature, tempo, transpose);
    else if (current == 'let') {
        let key = parsed[++ind];
        current = parsed[++ind];
        stack = [[key, current]].concat(stack);
    }
    else {
        let isVoi = (voices.includes(current)) ? true : false;
        let isDur = false;
        if (Object.keys(durations).includes(current)) isDur = true;
        let isProperty = (validProps.includes(current)) ? true : false;
        let isIdentifier = (validIdentifiers.includes(current)) ? true : false;
        let isTimeSignature = (timeSignatures.includes(current)) ? true : false;

        if (current == ':sync') {
            let subParsed = parsed.slice(ind+1), subPos, maxPos = 0;
            for (let i = 0; i < subParsed.length; i++) {
                subPos = tree2sequence(subParsed[i], sequence, 0, measure, voi, pos, dur, hei, lyrics, type, stack, properties, identifiers, timeSignature, tempo, transpose);
                if (subPos > maxPos) maxPos = subPos;
            }
            return maxPos;
        }
        else if (current == ':chord') {
            let subParsed = parsed.slice(ind+1);
            for (let i = 0; i < subParsed.length; i++) {
                ++ind; i++;
                hei = parsed[++ind] + transpose;
                sequence.push({ measure: measure, voi: voi, pos: pos, hei: hei, dur: dur, lyrics: lyrics, properties: serialize(properties), identifiers: identifiers, keySignature: keySignature, timeSignature: timeSignature, tempo: tempo });
            }
            pos = new Fraction(pos).add(dur);
        }
        else {
            if (current == ':measure') {
                measure = parsed[++ind];
            }
            else if (current == ':tempo') tempo = parsed[++ind];
            else if (current == ':voi') {
                voi = parsed[++ind];
                if (voi.charAt(0) == ":") voi = voi.substring(1);
            }
            else if (isVoi) {
                voi = current;
                if (voi.charAt(0) == ":") voi = voi.substring(1);
            }
            else if (current == ':pos') pos = parsed[++ind];
            else if (!isNaN(current)) dur = new Fraction(current);
            else if (current == ':dur') dur = parsed[++ind];
            else if (isDur) dur = durations[current];
            else if (current == ':rest') pos = new Fraction(pos).add(dur);
            else if (current == ':hei') {
                hei = parsed[++ind] + transpose;
                const serializedProps = serialize(properties);
                sequence.push({ measure: measure, voi: voi, pos: pos, hei: hei, dur: dur, lyrics: lyrics, properties: serializedProps, identifiers: identifiers, keySignature: keySignature, timeSignature: timeSignature, tempo: tempo });
                if (!serializedProps.includes(":grace")) pos = new Fraction(pos).add(dur);
            }
            else if (current == ':transpose') transpose = parsed[++ind];
            else if (isProperty) properties = { car: current, cdr: properties };
            else if (isIdentifier) identifiers[current] = parsed[++ind];
            else if (isTimeSignature) timeSignature = current.substring(1, current.length);
            else if (typeof current == "string" && current[0] != "=") lyrics = [pos, current];
            else if (current[0] == "=") {
                for (i = 0; i < stack.length; i++) {
                    if (stack[i][0] == current.substring(1, current.length)) {
                        parsed[ind--] = stack[i][1];
                        break;
                    }
                }
            }
            else {
                sequence.push({ measure: measure, voi: voi, pos: pos, hei: current, dur: dur, lyrics: lyrics, properties: serialize(properties), identifiers: identifiers, keySignature: keySignature, timeSignature: timeSignature, tempo: tempo });
                pos = new Fraction(pos).add(dur);
            }
        }
    }
  
    pos = tree2sequence(parsed, sequence, ind + 1, measure, voi, pos, dur, hei, lyrics, type, stack, properties, identifiers, timeSignature, tempo, transpose);
    return pos;
}

// Find per voice the indice corresponding to position n
function sliceMeasure(score, n) {
    let voices = [];

    // Initialize the array of current indices per voice
    let i = 0, voiceIndices = [];
    score.forEach(function (item) {
        voiceIndices.push(0);
    });

    for (i = 0; i < score.length; i++) {
        let start, end;
        while (true) {
            let item = score[i][voiceIndices[i]];
            if (!item || item.pos >= n * 4) {
                start = voiceIndices[i];
                break;
            }
            voiceIndices[i]++;
        }
        voices.push(score[i].slice(start));
    }
    return voices;
}

function deserialize(score) {
    let voices = {}, composer = null, title = null;
        /*for (i = 0; i < score.length; i++) {
            let sequence = [];*/
        score/*[i]*/.forEach( atom => {
            if (!voices[atom.voi]) voices[atom.voi] = [];
            if (atom.identifiers && atom.identifiers[":composer"]) composer = atom.identifiers[":composer"];
            if (atom.identifiers && atom.identifiers[":title"]) title = atom.identifiers[":title"];
            atom.pos = new Fraction(atom.pos);
            atom.dur = new Fraction(atom.dur);
            voices[atom.voi].push(atom);
        });
        //voices[sequence[0].voi] = { "voi": sequence[0].voi, "sequence": sequence };
        // }
    return { composer: composer, title: title, voices: voices };
}

const cacheNormalized = (filename) => {
    const script = fileSystem.readFileSync("scripts/newma/" + filename, {encoding:'utf8', flag:'r'});
    let work = parse(script);
    work = JSON.parse(work);
    let sequence = [];
    tree2sequence(work, sequence, 0, null, 0, new Fraction(1), 0, null, "note", [], [], [], {}, "4:4");
    fileSystem.writeFileSync("scripts/" + filename + ".json", JSON.stringify(sequence));
};

module.exports = {
    parse,
    tree2sequence,
    deserialize,
    cacheNormalized
};
