/* eslint-disable no-irregular-whitespace */
const fileSystem = require("fs");
const events = require("../content/events");
const works = require("../content/works");
const works2021 = require("../content/works2021");
const index = require("../content/index");
const Fraction = require("Fraction.js-master/fraction");
const newma = require("./musical-score");
const abc = require("./newmaToAbc");

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

var lazzyHei = {};
lazzyHei[c] = c; lazzyHei[g] = g; lazzyHei[d] = d; lazzyHei[a] = a; lazzyHei[e] = e; lazzyHei[b] = b; lazzyHei[fs] = f; lazzyHei[cs] = c; lazzyHei[gs] = g; lazzyHei[ds] = d; lazzyHei[as] = a; lazzyHei[es] = e; lazzyHei[bs] = b; lazzyHei[fss] = f; lazzyHei[css] = c; lazzyHei[gss] = g; lazzyHei[dss] = d; lazzyHei[ass] = a; lazzyHei[ess] = e; lazzyHei[bss] = b; lazzyHei[f] = f; lazzyHei[bf] = b; lazzyHei[ef] = e; lazzyHei[af] = a; lazzyHei[df] = d; lazzyHei[gf] = g; lazzyHei[cf] = c; lazzyHei[ff] = f; lazzyHei[bff] = b; lazzyHei[eff] = e; lazzyHei[aff] = a; lazzyHei[dff] = a; lazzyHei[gff] = g; lazzyHei[cff] = c; lazzyHei[fff] = f; 
lazzyHei[c1] = c1; lazzyHei[g1] = g1; lazzyHei[d1] = d1; lazzyHei[a1] = a1; lazzyHei[e1] = e1; lazzyHei[b1] = b1; lazzyHei[fs1] = f1; lazzyHei[cs1] = c1; lazzyHei[gs1] = g1; lazzyHei[ds1] = d1; lazzyHei[as1] = a1; lazzyHei[es1] = e1; lazzyHei[bs1] = b1; lazzyHei[fss1] = f1; lazzyHei[css1] = c1; lazzyHei[gss1] = g1; lazzyHei[dss1] = d1; lazzyHei[ass1] = a1; lazzyHei[ess1] = e1; lazzyHei[bss1] = b1; lazzyHei[f1] = f1; lazzyHei[bf1] = b1; lazzyHei[ef1] = e1; lazzyHei[af1] = a1; lazzyHei[df1] = d1; lazzyHei[gf1] = g1; lazzyHei[cf1] = c1; lazzyHei[ff1] = f1; lazzyHei[bff1] = b1; lazzyHei[eff1] = e1; lazzyHei[aff1] = a1; lazzyHei[dff1] = a1; lazzyHei[gff1] = g1; lazzyHei[cff1] = c1; lazzyHei[fff1] = f2; 
lazzyHei[c2] = c2; lazzyHei[g2] = g2; lazzyHei[d2] = d2; lazzyHei[a2] = a2; lazzyHei[e2] = e2; lazzyHei[b2] = b2; lazzyHei[fs2] = f2; lazzyHei[cs2] = c2; lazzyHei[gs2] = g2; lazzyHei[ds2] = d2; lazzyHei[as2] = a2; lazzyHei[es2] = e2; lazzyHei[bs2] = b2; lazzyHei[fss2] = f2; lazzyHei[css2] = c2; lazzyHei[gss2] = g2; lazzyHei[dss2] = d2; lazzyHei[ass2] = a2; lazzyHei[ess2] = e2; lazzyHei[bss2] = b2; lazzyHei[f2] = f2; lazzyHei[bf2] = b2; lazzyHei[ef2] = e2; lazzyHei[af2] = a2; lazzyHei[df2] = d2; lazzyHei[gf2] = g2; lazzyHei[cf2] = c2; lazzyHei[ff2] = f2; lazzyHei[bff2] = b2; lazzyHei[eff2] = e2; lazzyHei[aff2] = a2; lazzyHei[dff2] = a2; lazzyHei[gff2] = g2; lazzyHei[cff2] = c2; lazzyHei[fff2] = f2; 
lazzyHei[c3] = c3; lazzyHei[g3] = g3; lazzyHei[d3] = d3; lazzyHei[a3] = a3; lazzyHei[e3] = e3; lazzyHei[b3] = b3; lazzyHei[fs3] = f3; lazzyHei[cs3] = c3; lazzyHei[gs3] = g3; lazzyHei[ds3] = d3; lazzyHei[as3] = a3; lazzyHei[es3] = e3; lazzyHei[bs3] = b3; lazzyHei[fss3] = f3; lazzyHei[css3] = c3; lazzyHei[gss3] = g3; lazzyHei[dss3] = d3; lazzyHei[ass3] = a3; lazzyHei[ess3] = e3; lazzyHei[bss3] = b3; lazzyHei[f3] = f3; lazzyHei[bf3] = b3; lazzyHei[ef3] = e3; lazzyHei[af3] = a3; lazzyHei[df3] = d3; lazzyHei[gf3] = g3; lazzyHei[cf3] = c3; lazzyHei[ff3] = f3; lazzyHei[bff3] = b3; lazzyHei[eff3] = e3; lazzyHei[aff3] = a3; lazzyHei[dff3] = a3; lazzyHei[gff3] = g3; lazzyHei[cff3] = c3; lazzyHei[fff3] = f3; 
lazzyHei[c4] = c4; lazzyHei[g4] = g4; lazzyHei[d4] = d4; lazzyHei[a4] = a4; lazzyHei[e4] = e4; lazzyHei[b4] = b4; lazzyHei[fs4] = f4; lazzyHei[cs4] = c4; lazzyHei[gs4] = g4; lazzyHei[ds4] = d4; lazzyHei[as4] = a4; lazzyHei[es4] = e4; lazzyHei[bs4] = b4; lazzyHei[fss4] = f4; lazzyHei[css4] = c4; lazzyHei[gss4] = g4; lazzyHei[dss4] = d4; lazzyHei[ass4] = a4; lazzyHei[ess4] = e4; lazzyHei[bss4] = b4; lazzyHei[f4] = f4; lazzyHei[bf4] = b4; lazzyHei[ef4] = e4; lazzyHei[af4] = a4; lazzyHei[df4] = d4; lazzyHei[gf4] = g4; lazzyHei[cf4] = c4; lazzyHei[ff4] = f4; lazzyHei[bff4] = b4; lazzyHei[eff4] = e4; lazzyHei[aff4] = a4; lazzyHei[dff4] = a4; lazzyHei[gff4] = g4; lazzyHei[cff4] = c4; lazzyHei[fff4] = f4;
lazzyHei[c5] = c5; lazzyHei[g5] = g5; lazzyHei[d5] = d5; lazzyHei[a5] = a5; lazzyHei[e5] = e5; lazzyHei[b5] = b5; lazzyHei[fs5] = f5; lazzyHei[cs5] = c5; lazzyHei[gs5] = g5; lazzyHei[ds5] = d5; lazzyHei[as5] = a5; lazzyHei[es5] = e5; lazzyHei[bs5] = b5; lazzyHei[fss5] = f5; lazzyHei[css5] = c5; lazzyHei[gss5] = g5; lazzyHei[dss5] = d5; lazzyHei[ass5] = a5; lazzyHei[ess5] = e5; lazzyHei[bss5] = b5; lazzyHei[f5] = f5; lazzyHei[bf5] = b5; lazzyHei[ef5] = e5; lazzyHei[af5] = a5; lazzyHei[df5] = d5; lazzyHei[gf5] = g5; lazzyHei[cf5] = c5; lazzyHei[ff5] = f5; lazzyHei[bff5] = b5; lazzyHei[eff5] = e5; lazzyHei[aff5] = a5; lazzyHei[dff5] = a5; lazzyHei[gff5] = g5; lazzyHei[cff5] = c5; lazzyHei[fff5] = f5;
lazzyHei[c6] = c6; lazzyHei[g6] = g6; lazzyHei[d6] = d6; lazzyHei[a6] = a6; lazzyHei[e6] = e6; lazzyHei[b6] = b6; lazzyHei[fs6] = f6; lazzyHei[cs6] = c6; lazzyHei[gs6] = g6; lazzyHei[ds6] = d6; lazzyHei[as6] = a6; lazzyHei[es6] = e6; lazzyHei[bs6] = b6; lazzyHei[fss6] = f6; lazzyHei[css6] = c6; lazzyHei[gss6] = g6; lazzyHei[dss6] = d6; lazzyHei[ass6] = a6; lazzyHei[ess6] = e6; lazzyHei[bss6] = b6; lazzyHei[f6] = f6; lazzyHei[bf6] = b6; lazzyHei[ef6] = e6; lazzyHei[af6] = a6; lazzyHei[df6] = d6; lazzyHei[gf6] = g6; lazzyHei[cf6] = c6; lazzyHei[ff6] = f6; lazzyHei[bff6] = b6; lazzyHei[eff6] = e6; lazzyHei[aff6] = a6; lazzyHei[dff6] = a6; lazzyHei[gff6] = g6; lazzyHei[cff6] = c6; lazzyHei[fff6] = f6;
lazzyHei[c7] = c7; lazzyHei[g7] = g7; lazzyHei[d7] = d7; lazzyHei[a7] = a7; lazzyHei[e7] = e7; lazzyHei[b7] = b7; lazzyHei[fs7] = f7; lazzyHei[cs7] = c7; lazzyHei[gs7] = g7; lazzyHei[ds7] = d7; lazzyHei[as7] = a7; lazzyHei[es7] = e7; lazzyHei[bs7] = b7; lazzyHei[fss7] = f7; lazzyHei[css7] = c7; lazzyHei[gss7] = g7; lazzyHei[dss7] = d7; lazzyHei[ass7] = a7; lazzyHei[ess7] = e7; lazzyHei[bss7] = b7; lazzyHei[f7] = f7; lazzyHei[bf7] = b7; lazzyHei[ef7] = e7; lazzyHei[af7] = a7; lazzyHei[df7] = d7; lazzyHei[gf7] = g7; lazzyHei[cf7] = c7; lazzyHei[ff7] = f7; lazzyHei[bff7] = b7; lazzyHei[eff7] = e7; lazzyHei[aff7] = a7; lazzyHei[dff7] = a7; lazzyHei[gff7] = g7; lazzyHei[cff7] = c7; lazzyHei[fff7] = f7;
lazzyHei[c8] = c8; lazzyHei[g8] = g8; lazzyHei[d8] = d8; lazzyHei[a8] = a8; lazzyHei[e8] = e8; lazzyHei[b8] = b8; lazzyHei[fs8] = f8; lazzyHei[cs8] = c8; lazzyHei[gs8] = g8; lazzyHei[ds8] = d8; lazzyHei[as8] = a8; lazzyHei[es8] = e8; lazzyHei[bs8] = b8; lazzyHei[fss8] = f8; lazzyHei[css8] = c8; lazzyHei[gss8] = g8; lazzyHei[dss8] = d8; lazzyHei[ass8] = a8; lazzyHei[ess8] = e8; lazzyHei[bss8] = b8; lazzyHei[f8] = f8; lazzyHei[bf8] = b8; lazzyHei[ef8] = e8; lazzyHei[af8] = a8; lazzyHei[df8] = d8; lazzyHei[gf8] = g8; lazzyHei[cf8] = c8; lazzyHei[ff8] = f8; lazzyHei[bff8] = b8; lazzyHei[eff8] = e8; lazzyHei[aff8] = a8; lazzyHei[dff8] = a8; lazzyHei[gff8] = g8; lazzyHei[cff8] = c8; lazzyHei[fff8] = f8;

var stats = { melody: {}, lazzy: {} };

const loadScore = (score) => {
    let voices = [];
    for (const key of Object.keys(score.voices)) {
        const voice = score.voices[key];
        let newVoice = [];
        for (let note of voice) {
            newVoice.push( { identifier: note.identifiers[":reference"], voi: note.voi, pos: new Fraction(note.pos), hei: note.hei, dur: new Fraction(note.dur) } );
        }
        voices.push( { identifier: key, notes: newVoice } );
    }
    return {
        identifier: score.identifier,
        voices: voices
    };
};

const extractSuperMelody = voices => {
    let result = [], i = 0;
    while (true) {
        let end = true, byPosResult = [], minPos = Number.MAX_VALUE;

        // Retrieve the local minimum pos
        for (let voice of voices) {
            if (voice.length > 0) {
                end = false;
                if (voice[0].pos < minPos) minPos = voice[0].pos;
            }
        }
        if (end) return result;

        let nextVoices = [];
        for (let voice of voices) {
            if (voice[0].pos.equals(minPos)) {
                byPosResult.push( { ...voice[0], index: i++ } );
                voice = voice.slice(1);
            }
            if (voice.length != 0) nextVoices.push(voice);
        }

        byPosResult.sort(function(first, second) { return first.hei - second.hei; });
        result.push(...byPosResult);

        voices = nextVoices;
    }
};

const extractSimpleMelody = notes => {
    if (notes.length == 0) return [];
    let voice = [], previous = null, current = notes[0], i = 0, highest = current.hei;
    notes = notes.slice(1);
    while (notes.length > 0) {
        if (notes[0].pos.equals(current.pos)) {
            if (notes[0].hei > highest) {
                highest = notes[0].hei;
                current = notes[0];
            }
        } 
        else {
            voice.push({ ...current, index: i });
            current = notes[0];
            highest = current.hei;
            i++;
        }
        notes = notes.slice(1);
    }
    voice.push({ ...current, index: i });
    return voice;
};

/**
 * Simplify a voice to a one note per time voice
 * Try to remove ornaments and keep real degree steps. For example : "g (8th g f) e" becomes "g f e" rather than "g g e"
 */
const extractByTimeMelody = notes => {
    if (notes.length == 0) return [];
    let voice = [], previous = null, current = notes[0], i = 0;
    notes = notes.slice(1);
    while (notes.length > 0) {
        if (notes[0].pos.mod(1) != 0) { 
            if (previous === current.hei) current = notes[0];
        }
        else {
            previous = current.hei;
            voice.push({ ...current, index: i });
            current = notes[0];
            i++;
        }
        notes = notes.slice(1);
    }
    voice.push({ ...current, index: i });
    return voice;
};

/**
 * Compute a segment of max length size of a melody, based on real intervals 
 */
const loadStrict = (stats, melody, size) => {
    let currentNode = stats;
    const tone = melody[melody.length - 1].hei;
    let i = 0;
    for (let note of melody) {
        if (size-- == 0) return;
        const pointer = { ...note };
        const relativeHei = note.hei - tone;
        let node = currentNode[relativeHei];
        if (!node) node = { pointers: [], next: new Object() };
        let exists = false;
        for (let p of node.pointers) if (p.toString() == pointer.toString()) exists = true;
        if (!exists) node.pointers.push(pointer);
        currentNode[relativeHei] = node;
        currentNode = node.next;
        i++;
    }
};

/**
 * Compute a segment of max length size of a melody, canceling the mode (for example minor 3rd become equivalent to major 3rd) 
 */
const loadLazzy = (stats, melody, size) => {
    let currentNode = stats;
    const tone = lazzyHei[melody[melody.length - 1].hei];
    let i = 0;
    for (let note of melody) {
        if (size-- == 0) return;
        const pointer = { ...note };
        const lazzy = lazzyHei[note.hei - tone];
        let node = currentNode[lazzy];
        if (!node) node = { pointers: [], next: new Object() };
        let exists = false;
        for (let p of node.pointers) if ((p.identifier + "_" + p.voi + "_" + (p.index - i)).toString() == (pointer.identifier + "_" + pointer.voi + "_" + (pointer.index - i)).toString()) exists = true;
        if (!exists) node.pointers.push(pointer);
        currentNode[lazzy] = node;
        currentNode = node.next;
        i++;
    }
};

const mineStrict = (melody, stats, tone) => {
    let path = [], ranking = [];
    let node = stats;
    let i = 0;
    for (const note of melody) {
        const relativeHei = note.hei - tone;
        if (!node[relativeHei]) break;
        path.push({ hei: note.hei, pointers: node[relativeHei].pointers });
        for (const pointer of node[relativeHei].pointers) {
            if (!ranking[pointer.identifier + "|" + pointer.voi + "_" + (pointer.index - i)]) ranking[pointer.identifier + "|" + pointer.voi + "_" + (pointer.index - i)] = 1;
            else ranking[pointer.identifier + "|" + pointer.voi + "_" + (pointer.index - i)]++;
        }
        node = node[relativeHei].next;
        i++;
    }
    return [ path, ranking ];
};

const mineLazzy = (melody, stats, tone) => {
    let path = [], ranking = [];
    let node = stats;
    let i = 0;
    for (const note of melody) {
        const lazzy = lazzyHei[note.hei - tone];
        if (!node[lazzy]) break;
        path.push({ hei: note.hei, pointers: node[lazzy].pointers.map( (x) => x.identifier + "_" + x.voi + "_" + (x.index - i)) });
        for (const pointer of node[lazzy].pointers) {
            if (!ranking[pointer.identifier + "|" + pointer.voi + "_" + (pointer.index - i)]) ranking[pointer.identifier + "|" + pointer.voi + "_" + (pointer.index - i)] = 1;
            else ranking[pointer.identifier + "|" + pointer.voi + "_" + (pointer.index - i)]++;
        }
        node = node[lazzy].next;
        i++;
    }
    return [ path, ranking ];
};

const displayNode = (node, indentation) => {
    for (const hei of Object.keys(node)) {
        if (node[hei].pointers.length >= 1) {
            for (let i = 0; i < indentation; i++) process.stdout.write(" ");
            process.stdout.write(hei + ": " + node[hei].pointers.length + " ");
            for (const pointer of node[hei].pointers) process.stdout.write("{" + pointer.voi + " " + pointer.index + "} ");
            process.stdout.write("\n");
            if (Object.keys(node[hei].next).length > 0) displayNode(node[hei].next, indentation+4);
        }
    }
};

const displayResult = result => {
    for (const step of result) {
        process.stdout.write(step.hei + "\n");
        for (const pointer of step.pointers) process.stdout.write("  {" + pointer.voi + " " + pointer.index + "}\n");
    }
};

const create = (restriction = false, size = null) => {
    let excerpts = [], maxMelodyDuration = 20;

    const load2022Excerpts = () => {
        const works = JSON.parse(fileSystem.readFileSync("content/works.json", "utf8"));
        for (key of Object.keys(works)) {
            let work = works[key];
            if (work.excerpts) { 
                for (excerpt of work.excerpts) {
                    let identifier = work.name + "_" + excerpt.name;
                    if (!restriction || restriction.includes(identifier)) {
                        let script = fileSystem.readFileSync("scripts/" + identifier, "utf8");
                        script = newma.parse(script);
                        script = JSON.parse(script);
                        let sequence = [];
                        newma.tree2sequence(script, sequence, 0, 0, null, 0, new Fraction(1), 0, null, "note", [], [], {}, "4:4", null, c);
                        const score = newma.deserialize(sequence);
                        let voices = [];
                        for (const voiceKey of Object.keys(score.voices)) {
                            const voice = score.voices[voiceKey];
                            let newVoice = [];
                            for (let note of voice) {
                                newVoice.push( { identifier: identifier, voi: note.voi, pos: new Fraction(note.pos), hei: note.hei, dur: new Fraction(note.dur) } );
                            }
                            voices.push( { identifier: voiceKey, notes: newVoice } );
                        }
                        excerpts.push(voices);    
                    }
                }
            }
        }    
    };

    const load2021Excerpts = () => {
        for (key of Object.keys(works2021.works)) { 
            if (works.works[key].excerpts) { 
                for (scriptKey of works.works[key].excerpts) {
                    if (!restriction || restriction.includes(scriptKey)) {
                        let script = fileSystem.readFileSync("scripts/2021/" + scriptKey, "utf8");
                        let work = newma.parse(script);
                        work = JSON.parse(work);
                        let sequence = [];
                        newma.tree2sequence(work, sequence, 0, 0, null, 0, new Fraction(1), 0, null, "note", [], [], {}, "4:4", null, c);
                        const score = newma.deserialize(sequence);
                        let voices = [];
                        for (const voiceKey of Object.keys(score.voices)) {
                            const voice = score.voices[voiceKey];
                            let newVoice = [];
                            for (let note of voice) {
                                newVoice.push( { identifier: scriptKey, voi: note.voi, pos: new Fraction(note.pos), hei: note.hei, dur: new Fraction(note.dur) } );
                            }
                            voices.push( { identifier: voiceKey, notes: newVoice } );
                        }
                        excerpts.push(voices);
                    }
                }
            }
        }    
    }
    load2021Excerpts();
    load2022Excerpts();

    let i = (size) ? size : excerpts.length;
    for (let excerpt of excerpts) { 
        if (i == 0) break;
        console.log(i--);
        //        const superMelody = extractSuperMelody(excerpt);

        let byTimeMelodies = []; 
        for (let voice of excerpt) {
    
            let simpleMelody = extractSimpleMelody(voice.notes);
            while (simpleMelody.length > 0) {
                loadStrict(stats.melody, simpleMelody, maxMelodyDuration);
                simpleMelody = simpleMelody.slice(1);
            }

            let byTimeMelody = extractByTimeMelody(voice.notes);
            while (byTimeMelody.length > 0) {
                loadLazzy(stats.lazzy, byTimeMelody, maxMelodyDuration);
                byTimeMelody = byTimeMelody.slice(1);
            }
        }
    }
    return stats;
};

const mine = (melody) => {
    const searchFragment = [];
    melody = melody.split(",");
    for (let pitch of melody) searchFragment.push({ hei: hei[pitch] });
    melody = searchFragment;

    let ranking = [];
    for (const tone of [...new Set(Object.keys(stats.melody))]) {
        const [ strictPath, strictRanking ] = mineLazzy(melody, stats.melody, tone);
        for (const key of Object.keys(strictRanking)) {
            if (strictRanking[key] > 2 && (ranking[key] === undefined || strictRanking[key] > ranking[key])) {
                if (ranking[key] === undefined) ranking[key] = 0;
                ranking[key] = strictRanking[key];
            }
        }
    }
    let sortable = [];
    for (const key of Object.keys(ranking)) {
        const rank = ranking[key];
        sortable.push([key, rank]);
    }
    let strict = sortable.sort( (a, b) => b[1] - a[1]);

    ranking = [];
    for (const tone of [...new Set(Object.keys(stats.lazzy))]) {
        const [ lazzyPath, lazzyRanking ] = mineLazzy(melody, stats.lazzy, tone);
        for (const key of Object.keys(lazzyRanking)) {
            if (lazzyRanking[key] > 2 && (ranking[key] === undefined || lazzyRanking[key] > ranking[key])) {
                if (ranking[key] === undefined) ranking[key] = 0;
                ranking[key] = lazzyRanking[key];
            }
        }
    }
    sortable = [];
    for (const key of Object.keys(ranking)) {
        const rank = ranking[key];
        sortable.push([key, rank]);
    }
    let lazzy = sortable.sort( (a, b) => b[1] - a[1]); 

    let result = [];
    const length = Math.min(3, strict.length);
    while (strict != [] && lazzy != [] && result.length < length) {
        //if (strict[0][1] > lazzy[0][1]) {
            result.push(strict[0]);
            strict = strict.slice(1);
        /*}
        else {
            result.push(lazzy[0]);
            lazzy = lazzy.slice(1);
        }*/
    } 
    return result;
};

const loadStats = (statFile) => {
    let serializedStats = fileSystem.readFileSync("content/" + statFile);
    stats = JSON.parse(serializedStats);
}

module.exports = {
    create,
    loadStats,
    mine
};

/**
 * To be integrated
 */

/**
 * Compute a melodic score for a pair of note in a sequence
 */
const pairMelodyScore = (first, iFirst, second, iSecond, size) => {
    const vector = [];
    vector.push([(first.voi == second.voi) ? 1 : 0, 1]); // Same voice
    vector.push([(first.pos + first.dur == second.pos) ? 1 : 0, 1]); // Sequence
    vector.push([(size - iSecond + iFirst) / size, 1]); // Inverse of melodic distance
    /* ... */
    return vector.reduce( (acc, curr) => acc + curr[0]*curr[1], 0 ) / vector.length;
};

/**
 * Compute a segment of max length size of a super (accross voice) melody, canceling the mode (for example minor 3rd become equivalent to major 3rd) 
 */
const superLoadLazzy = (stats, melody, size) => {
    let currentNode = stats, i = 0;
    while (i < size) {
        for (let j = i; j < Math.min(20, melody.length, size); j++) {
            let note = melody[j];
            const pointer = { ...note }, lazzy = lazzyHei[note.hei];
            const score = (currentNode[lazzy]) ? pairMelodyScore(currentNode[lazzy].note, i, note, j, size) : 1;
            let node = currentNode[lazzy];
            if (!node) node = { note: note, pointers: [], next: new Object() };
            if (score >= 0.5) node.pointers.push([pointer, score]);
            currentNode[lazzy] = node;
            currentNode = node.next;
        }
        i++;
    }
};

const summarizeNode = (node) => {
    let result = {};
    for (const hei of Object.keys(node)) {
        if (node[hei].pointers.length > 1) {
            let pointers = [];
            for (const pointer of node[hei].pointers) {
                pointers.push( Math.round(pointer[1] * 100) / 100 );
            }
            result[hei] = { scores: pointers };
            if (Object.keys(node[hei].next).length > 0) result[hei].next = summarizeNode(node[hei].next);
        }
    }
    return result;
};

const superMineLazzy = (melody, stats, tone) => {
    let path = [], ranking = [];
    let node = stats;
    let i = 0;
    for (const note of melody) {
        const lazzy = lazzyHei[note.hei - tone];
        if (!node[lazzy]) break;
        path.push({ hei: note.hei, pointers: node[lazzy].pointers });
        for (const pointer of node[lazzy].pointers) {
            if (!ranking[pointer[0].identifier + "_" + pointer[0].voi + "_" + (pointer[0].index - i)]) ranking[pointer[0].identifier + "_" + pointer[0].voi + "_" + (pointer[0].index - i)] = pointer[1];
            else ranking[pointer[0].identifier + "_" + pointer[0].voi + "_" + (pointer[0].index - i)] += pointer[1];
        }
        node = node[lazzy].next;
        i++;
    }
    return [ path, ranking ];
};

const superMine = (melody, stats) => {
    const ranking = {};
    for (const tone of [...new Set(Object.keys(stats.superLazzy))]) {
        const [ superLazzyPath, superLazzyRanking ] = superMineLazzy(melody, stats.superLazzy, tone);
        for (const key of Object.keys(superLazzyRanking)) {
            if (superLazzyRanking[key] > 1 && (ranking[key] === undefined || superLazzyRanking[key] > ranking[key])) {
                if (ranking[key] === undefined) ranking[key] = 0;
                ranking[key] += superLazzyRanking[key];
            }
        }
    }

    const pairs = [];
    for (const key of Object.keys(ranking)) {
        if (ranking[key] > 1.5) pairs.push([key, ranking[key]]);
    }
    pairs.sort((a, b) => b[1] - a[1] );
    return pairs;
};

