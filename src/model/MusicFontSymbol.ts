/**
 * Lists all music font symbols used within alphaTab. The names
 * and values are aligned with the SMuFL standard. 
 */
export enum MusicFontSymbol {
    None = -1,

    GClef = 0xe050,
    CClef = 0xe05c,
    FClef = 0xe062,
    UnpitchedPercussionClef1 = 0xe069,
    SixStringTabClef = 0xe06d,
    FourStringTabClef = 0xe06e,

    TimeSig0 = 0xe080,
    TimeSig1 = 0xe081,
    TimeSig2 = 0xe082,
    TimeSig3 = 0xe083,
    TimeSig4 = 0xe084,
    TimeSig5 = 0xe085,
    TimeSig6 = 0xe086,
    TimeSig7 = 0xe087,
    TimeSig8 = 0xe088,
    TimeSig9 = 0xe089,
    TimeSigCommon = 0xe08a,
    TimeSigCutCommon = 0xe08b,

    NoteheadDoubleWholeSquare = 0xe0a1,
    NoteheadDoubleWhole = 0xe0a0,
    NoteheadWhole = 0xe0a2,
    NoteheadHalf = 0xe0a3,
    NoteheadBlack = 0xe0a4,
    NoteheadNull = 0xe0a5,
    NoteheadXOrnate = 0xe0aa,
    NoteheadTriangleUpWhole = 0xe0bb,
    NoteheadTriangleUpHalf = 0xe0bc,
    NoteheadTriangleUpBlack = 0xe0be,
    NoteheadDiamondBlackWide = 0xe0dc,
    NoteheadDiamondWhite = 0xe0dd,
    NoteheadDiamondWhiteWide = 0xe0de,
    NoteheadCircleX = 0xe0b3,
    NoteheadXWhole = 0xe0a7,
    NoteheadXHalf = 0xe0a8,
    NoteheadXBlack = 0xe0a9,
    NoteheadParenthesis = 0xe0ce,
    NoteheadSlashedBlack2 = 0xe0d0,
    NoteheadCircleSlash = 0xe0f7,
    NoteheadHeavyX = 0xe0f8,
    NoteheadHeavyXHat = 0xe0f9,

    NoteQuarterUp = 0xe1d5,
    NoteEighthUp = 0xe1d7,

    Tremolo3 = 0xe222,
    Tremolo2 = 0xe221,
    Tremolo1 = 0xe220,

    FlagEighthUp = 0xe240,
    FlagEighthDown = 0xe241,
    FlagSixteenthUp = 0xe242,
    FlagSixteenthDown = 0xe243,
    FlagThirtySecondUp = 0xe244,
    FlagThirtySecondDown = 0xe245,
    FlagSixtyFourthUp = 0xe246,
    FlagSixtyFourthDown = 0xe247,
    FlagOneHundredTwentyEighthUp = 0xe248,
    FlagOneHundredTwentyEighthDown = 0xe249,
    FlagTwoHundredFiftySixthUp = 0xe24a,
    FlagTwoHundredFiftySixthDown = 0xe24b,

    AccidentalFlat = 0xe260,
    AccidentalNatural = 0xe261,
    AccidentalSharp = 0xe262,
    AccidentalDoubleSharp = 0xe263,
    AccidentalDoubleFlat = 0xe264,
    AccidentalQuarterToneFlatArrowUp = 0xe270,
    AccidentalQuarterToneSharpArrowUp = 0xe274,
    AccidentalQuarterToneNaturalArrowUp = 0xe272,
    
    ArticAccentAbove = 0xe4a0,
    ArticStaccatoAbove = 0xe4a2,
    ArticMarcatoAbove = 0xe4ac,

    FermataAbove = 0xe4c0,
    FermataShortAbove = 0xe4c4,
    FermataLongAbove = 0xe4c6,

    RestLonga = 0xe4e1,
    RestDoubleWhole = 0xe4e2,
    RestWhole = 0xe4e3,
    RestHalf = 0xe4e4,
    RestQuarter = 0xe4e5,
    RestEighth = 0xe4e6,
    RestSixteenth = 0xe4e7,
    RestThirtySecond = 0xe4e8,
    RestSixtyFourth = 0xe4e9,
    RestOneHundredTwentyEighth = 0xe4ea,
    RestTwoHundredFiftySixth = 0xe4eb,

    Repeat1Bar = 0xe500,
    Repeat2Bars = 0xe501,

    Ottava = 0xe510,
    OttavaAlta = 0xe511,
    OttavaBassaVb = 0xe51c,
    Quindicesima = 0xe514,
    QuindicesimaAlta = 0xe515,
    
    DynamicPPP = 0xe52a,
    DynamicPP = 0xe52b,
    DynamicPiano = 0xe520,
    DynamicMP = 0xe52c,
    DynamicMF = 0xe52d,
    DynamicForte = 0xe522,
    DynamicFF = 0xe52f,
    DynamicFFF = 0xe530,

    OrnamentTrill = 0xe566,

    StringsDownBow = 0xe610,
    StringsUpBow = 0xe612,

    PictEdgeOfCymbal = 0xe729,

    GuitarGolpe = 0xe842,

    FretboardX = 0xe859,
    FretboardO = 0xe85a,

    WiggleTrill = 0xeaa4,
    WiggleVibratoMediumFast = 0xeade,

    OctaveBaselineM = 0xec95,
    OctaveBaselineB = 0xec93
}
