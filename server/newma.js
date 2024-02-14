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

const dur = "dur", w = "w", h = "h", q = "q"; 
const durations = { "4": new Fraction(4), "2": new Fraction(2), "": new Fraction(1), "/2": new Fraction(0.5), "/4": new Fraction(0.25), "/8": new Fraction(0.125), "/16": new Fraction(0.0625) };

const natural = (hei) => {
    const altered = {};
    altered[c] = c; altered[cs] = c; altered[css] = c; altered[cf + 1200] = c; altered[cff + 1200] = c;
    altered[d] = d; altered[ds] = d; altered[dss] = d; altered[df] = d; altered[dff + 1200] = d;
    altered[e] = e; altered[es] = e; altered[ess] = e; altered[ef] = e; altered[eff] = e;
    altered[f] = f; altered[fs] = f; altered[fss] = f; altered[ff] = f; altered[fff] = f;
    altered[g] = g; altered[gs] = g; altered[gss] = g; altered[gf] = g; altered[gff] = g;
    altered[a] = a; altered[as] = a; altered[ass] = a; altered[af] = a; altered[aff] = a;
    altered[b] = b; altered[bs - 1200] = b; altered[bss - 1200] = b; altered[bf] = b; altered[bff] = b;
    return altered[(hei % 1200 + 1200) % 1200];
};

const abcHeights = {
    "-3828": { hei: "__C,,," },
    "-3624": { hei: "__D,,," },
    "-3420": { hei: "__E,,," },
    "-3330": { hei: "__F,,," },
    "-3126": { hei: "__G,,," },
    "-2922": { hei: "__A,,," },
    "-2718": { hei: "__B,,," },
    "-3714": { hei: "_C,,," },
    "-3510": { hei: "_D,,," },
    "-3306": { hei: "_E,,," },
    "-3216": { hei: "_F,,," },
    "-3012": { hei: "_G,,,"},
    "-2808": { hei: "_A,,," },
    "-2604": { hei: "_B,,," },
    "-3600": { hei: "C,,," },
    "-3396": { hei: "D,,," },
    "-3192": { hei: "E,,," },
    "-3102": { hei: "F,,," },
    "-2898": { hei: "G,,," },
    "-2694": { hei: "A,,," },
    "-2490": { hei: "B,,," },
    "-3486": { hei: "^C,,," },
    "-3282": { hei: "^D,,," },
    "-3078": { hei: "^E,,," },
    "-2988": { hei: "^F,,," },
    "-2784": { hei: "^G,,," },
    "-2580": { hei: "^A,,," },
    "-2376": { hei: "^B,,," },
    "-3372": { hei: "^^C,,," },
    "-3168": { hei: "^^D,,," },
    "-2964": { hei: "^^E,,," },
    "-2874": { hei: "^^F,,," },
    "-2670": { hei: "^^G,,," },
    "-2466": { hei: "^^A,,," },
    "-2262": { hei: "^^B,,," },

    "-2628": { hei: "__C,," },
    "-2424": { hei: "__D,," },
    "-2220": { hei: "__E,," },
    "-2130": { hei: "__F,," },
    "-1926": { hei: "__G,," },
    "-1722": { hei: "__A,," },
    "-1518": { hei: "__B,," },
    "-2514": { hei: "_C,," },
    "-2310": { hei: "_D,," },
    "-2106": { hei: "_E,," },
    "-2016": { hei: "_F,," },
    "-1812": { hei: "_G,,"},
    "-1608": { hei: "_A,," },
    "-1404": { hei: "_B,," },
    "-2400": { hei: "C,," },
    "-2196": { hei: "D,," },
    "-1992": { hei: "E,," },
    "-1902": { hei: "F,," },
    "-1698": { hei: "G,," },
    "-1494": { hei: "A,," },
    "-1290": { hei: "B,," },
    "-2286": { hei: "^C,," },
    "-2082": { hei: "^D,," },
    "-1878": { hei: "^E,," },
    "-1788": { hei: "^F,," },
    "-1584": { hei: "^G,," },
    "-1380": { hei: "^A,," },
    "-1176": { hei: "^B,," },
    "-2172": { hei: "^^C,," },
    "-1968": { hei: "^^D,," },
    "-1764": { hei: "^^E,," },
    "-1674": { hei: "^^F,," },
    "-1470": { hei: "^^G,," },
    "-1266": { hei: "^^A,," },
    "-1062": { hei: "^^B,," },

    "-1428": { hei: "__C," },
    "-1224": { hei: "__D," },
    "-1020": { hei: "__E," },
    "-930": { hei: "__F," },
    "-726": { hei: "__G," },
    "-522": { hei: "__A," },
    "-318": { hei: "__B," },
    "-1314": { hei: "_C," },
    "-1110": { hei: "_D," },
    "-906": { hei: "_E," },
    "-816": { hei: "_F," },
    "-612": { hei: "_G,"},
    "-408": { hei: "_A," },
    "-204": { hei: "_B," },
    "-1200": { hei: "C," },
    "-996": { hei: "D," },
    "-792": { hei: "E," },
    "-702": { hei: "F," },
    "-498": { hei: "G," },
    "-294": { hei: "A," },
    "-90": { hei: "B," },
    "-1086": { hei: "^C," },
    "-882": { hei: "^D," },
    "-678": { hei: "^E," },
    "-588": { hei: "^F," },
    "-384": { hei: "^G," },
    "-180": { hei: "^A," },
    "24": { hei: "^B," },
    "-972": { hei: "^^C," },
    "-768": { hei: "^^D," },
    "-564": { hei: "^^E," },
    "-474": { hei: "^^F," },
    "-270": { hei: "^^G," },
    "-66": { hei: "^^A," },
    "138": { hei: "^^B," },
  
    "-228": { hei: "__C" },
    "-24": { hei: "__D" },
    "180": { hei: "__E" },
    "270": { hei: "__F" },
    "474": { hei: "__G" },
    "678": { hei: "__A" },
    "882": { hei: "__B" },
    "-114": { hei: "_C" },
    "90": { hei: "_D" },
    "294": { hei: "_E" },
    "384": { hei: "_F" },
    "588": { hei: "_G"},
    "792": { hei: "_A" },
    "996": { hei: "_B" },
    "0": { hei: "C" },
    "204": { hei: "D" },
    "408": { hei: "E" },
    "498": { hei: "F" },
    "702": { hei: "G" },
    "906": { hei: "A" },
    "1110": { hei: "B" },
    "114": { hei: "^C" },
    "318": { hei: "^D" },
    "522": { hei: "^E" },
    "612": { hei: "^F" },
    "816": { hei: "^G" },
    "1020": { hei: "^A" },
    "1224": { hei: "^B" },
    "228": { hei: "^^C" },
    "432": { hei: "^^D" },
    "636": { hei: "^^E" },
    "726": { hei: "^^F" },
    "930": { hei: "^^G" },
    "1134": { hei: "^^A" },
    "1338": { hei: "^^B" },

    "972": { hei: "__c" },
    "1176": { hei: "__d" },
    "1380": { hei: "__e" },
    "1470": { hei: "__f" },
    "1674": { hei: "__g" },
    "1878": { hei: "__a" },
    "2082": { hei: "__b" },
    "1086": { hei: "_c" },
    "1290": { hei: "_d" },
    "1494": { hei: "_e" },
    "1584": { hei: "_f" },
    "1788": { hei: "_g"},
    "1992": { hei: "_a" },
    "2196": { hei: "_b" },
    "1200": { hei: "c" },
    "1404": { hei: "d" },
    "1608": { hei: "e" },
    "1698": { hei: "f" },
    "1902": { hei: "g" },
    "2106": { hei: "a" },
    "2310": { hei: "b" },
    "1314": { hei: "^c" },
    "1518": { hei: "^d" },
    "1722": { hei: "^e" },
    "1812": { hei: "^f" },
    "2016": { hei: "^g" },
    "2220": { hei: "^a" },
    "2424": { hei: "^b" },
    "1428": { hei: "^^c" },
    "1632": { hei: "^^d" },
    "1836": { hei: "^^e" },
    "1926": { hei: "^^f" },
    "2130": { hei: "^^g" },
    "2334": { hei: "^^a" },
    "2538": { hei: "^^b" },

    "2172": { hei: "__c'" },
    "2376": { hei: "__d'" },
    "2580": { hei: "__e'" },
    "2670": { hei: "__f'" },
    "2874": { hei: "__g'" },
    "3078": { hei: "__a'" },
    "3282": { hei: "__b'" },
    "2286": { hei: "_c'" },
    "2490": { hei: "_d'" },
    "2694": { hei: "_e'" },
    "2784": { hei: "_f'" },
    "2988": { hei: "_g'"},
    "3192": { hei: "_a'" },
    "3396": { hei: "_b'" },
    "2400": { hei: "c'" },
    "2604": { hei: "d'" },
    "2808": { hei: "e'" },
    "2898": { hei: "f'" },
    "3102": { hei: "g'" },
    "3306": { hei: "a'" },
    "3510": { hei: "b'" },
    "2514": { hei: "^c'" },
    "2718": { hei: "^d'" },
    "2922": { hei: "^e'" },
    "3012": { hei: "^f'" },
    "3216": { hei: "^g'" },
    "3420": { hei: "^a'" },
    "3624": { hei: "^b'" },
    "2628": { hei: "^^c'" },
    "2832": { hei: "^^d'" },
    "3036": { hei: "^^e'" },
    "3126": { hei: "^^f'" },
    "3330": { hei: "^^g'" },
    "3534": { hei: "^^a'" },
    "3738": { hei: "^^b'" },

    "3372": { hei: "__c''" },
    "3576": { hei: "__d''" },
    "3780": { hei: "__e''" },
    "3870": { hei: "__f''" },
    "4074": { hei: "__g''" },
    "4278": { hei: "__a''" },
    "4482": { hei: "__b''" },
    "3486": { hei: "_c''" },
    "3690": { hei: "_d''" },
    "3894": { hei: "_e''" },
    "3984": { hei: "_f''" },
    "4188": { hei: "_g''"},
    "4392": { hei: "_a''" },
    "4596": { hei: "_b''" },
    "3600": { hei: "c''" },
    "3804": { hei: "d''" },
    "4008": { hei: "e''" },
    "4098": { hei: "f''" },
    "4302": { hei: "g''" },
    "4506": { hei: "a''" },
    "4710": { hei: "b''" },
    "3714": { hei: "^c''" },
    "3918": { hei: "^d''" },
    "4122": { hei: "^e''" },
    "4212": { hei: "^f''" },
    "4416": { hei: "^g''" },
    "4620": { hei: "^a''" },
    "4824": { hei: "^b''" },
    "3828": { hei: "^^c''" },
    "4032": { hei: "^^d''" },
    "4236": { hei: "^^e''" },
    "4326": { hei: "^^f''" },
    "4530": { hei: "^^g''" },
    "4734": { hei: "^^a''" },
    "4938": { hei: "^^b''" },

    "4572": { hei: "__c'''" },
    "4776": { hei: "__d'''" },
    "4980": { hei: "__e'''" },
    "5070": { hei: "__f'''" },
    "5274": { hei: "__g'''" },
    "5478": { hei: "__a'''" },
    "5682": { hei: "__b'''" },
    "4686": { hei: "_c'''" },
    "4890": { hei: "_d'''" },
    "5094": { hei: "_e'''" },
    "5184": { hei: "_f'''" },
    "5388": { hei: "_g'''"},
    "5592": { hei: "_a'''" },
    "5796": { hei: "_b'''" },
    "4800": { hei: "c'''" },
    "5004": { hei: "d'''" },
    "5208": { hei: "e'''" },
    "5298": { hei: "f'''" },
    "5502": { hei: "g'''" },
    "5706": { hei: "a'''" },
    "5910": { hei: "b'''" },
    "4914": { hei: "^c'''" },
    "5118": { hei: "^d'''" },
    "5322": { hei: "^e'''" },
    "5412": { hei: "^f'''" },
    "5616": { hei: "^g'''" },
    "5820": { hei: "^a'''" },
    "5024": { hei: "^b'''" },
    "5028": { hei: "^^c'''" },
    "5232": { hei: "^^d'''" },
    "5436": { hei: "^^e'''" },
    "5526": { hei: "^^f'''" },
    "5730": { hei: "^^g'''" },
    "5934": { hei: "^^a'''" },
    "6138": { hei: "^^b'''" }
}

function decodeDur(dur) {
    for (const [key, value] of Object.entries(durations)) {
        if (value.compare(dur) == 0) return key;
    };
    if (dur.n && dur.d) return dur.n + '/' + dur.d;
}

function deserialize(score, inactives) {
    let voices = {}, composer = null, title = null;
    /*  for (i = 0; i < score.length; i++) {
    let sequence = [];*/
    score/*[i]*/.forEach( atom => {
        if (!inactives.includes(atom.voi)) {
            if (!voices[atom.voi]) voices[atom.voi] = [];
            if (atom.identifiers && atom.identifiers[":composer"]) composer = atom.identifiers[":composer"];
            if (atom.identifiers && atom.identifiers[":title"]) title = atom.identifiers[":title"];
            atom.pos = new Fraction(atom.pos);
            atom.dur = new Fraction(atom.dur);
            voices[atom.voi].push(atom);
        }
    });
    //    voices[sequence[0].voi] = { "voi": sequence[0].voi, "sequence": sequence };
    //  }
    return { composer: composer, title: title, voices: voices };
}
  
// Render the score

function toMidi(score, tempo = 72) {
    const MidiWriter = require('midi-writer-js')
    let startPos = new Fraction(Number.MAX_VALUE)
    let i = 0
    let tracks = []
    Object.keys(score.voices).forEach(voi => {
        const voice = score.voices[voi]
        const track = new MidiWriter.Track()
        track.addEvent(new MidiWriter.ProgramChangeEvent({instrument: i}))
        let wait = 0
        voice.forEach(chord => {
            let dur = chord.dur.n * 128 / chord.dur.d
            if (chord.hei == ":rest") wait = dur
            else {
                let pitch = chord.hei
                if (!Array.isArray(pitch)) pitch = [pitch];
                pitch = pitch.map(x => midiHeights[x])
                let options = {pitch: pitch, duration: dur}
                if (wait) options.wait = wait
                wait = 0
                let note = new MidiWriter.NoteEvent();
                track.addEvent(note);
            }
        })
        tracks.push(track)
    })
    const write = new MidiWriter.Writer(tracks)
    return write
}

module.exports = {
  toMidi
};
