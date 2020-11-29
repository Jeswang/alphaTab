import { MusicFontSymbol } from "@src/model/MusicFontSymbol";
import { TextBaseline } from "@src/platform/ICanvas";
import { InstrumentArticulation } from "@src/model/InstrumentArticulation";
import { Note } from "@src/model/Note";

export class PercussionMapper {
    private static gp6ElementAndVariationToArticulation: number[][] = [
        // known GP6 elements and variations, analyzed from a GPX test file
        // with all instruments inside manually aligned with the same names of articulations in GP7
        // [{articulation index}]   // [{element number}] => {element name} ({variation[0]}, {variation[1]}, {variation[2]})
        [35, 35, 35], // [0] => Kick (hit, unused, unused) 
        [38, 91, 37], // [1] => Snare (hit, rim shot, side stick)
        [99, 100, 99], // [2] => Cowbell low (hit, tip, unused)
        [56, 100, 56], // [3] => Cowbell medium (hit, tip, unused)
        [102, 103, 102], // [4] => Cowbell high (hit, tip, unused)
        [43, 43, 43], // [5] => Tom very low (hit, unused, unused)
        [45, 45, 45], // [6] => Tom low (hit, unused, unused)
        [47, 47, 47], // [7] => Tom medium (hit, unused, unused)
        [48, 48, 48], // [8] => Tom high (hit, unused, unused)
        [50, 50, 50], // [9] => Tom very high (hit, unused, unused)
        [42, 92, 46], // [10] => Hihat (closed, half, open)
        [44, 44, 44], // [11] => Pedal hihat (hit, unused, unused)
        [57, 98, 57], // [12] => Crash medium (hit, choke, unused)
        [49, 97, 49], // [13] => Crash high (hit, choke, unused)
        [55, 95, 55], // [14] => Splash (hit, choke, unused)
        [51, 93, 127], // [15] => Ride (middle, edge, bell)
        [52, 96, 52], // [16] => China (hit, choke, unused)
    ];


    public static articulationFromElementVariation(element: number, variation: number): number {
        if (element < PercussionMapper.gp6ElementAndVariationToArticulation.length) {
            if (variation >= PercussionMapper.gp6ElementAndVariationToArticulation.length) {
                variation = 0;
            }
            return PercussionMapper.gp6ElementAndVariationToArticulation[element][variation];
        }
        // unknown combination, should not happen, fallback to some default value (Snare hit)
        return 38;
    }

    /*
     * This map was generated using the following steps: 
     * 1. Make a new GP7 file with a drumkit track
     * 2. Add one note for each midi value using the instrument panel
     * 3. Load the file in alphaTab and set a breakpoint in the GP7 importer. 
     * 4. Use the following snipped in the console to generate the map initializer (fix enums manually): 
     * parser = new DOMParser();
     * xmlDoc = parser.parseFromString(xml, 'text/xml');
     * articulations = xmlDoc.getElementsByTagName('Articulation');
     * existingArticulations = new Map();
     * s = '';
     * for(let i = 0; i < articulations.length; i++) {
     *     const articulation = articulations[i];
     *     let midi = articulation.getElementsByTagName('InputMidiNumbers');
     * 	if(midi.length === 1) {
     * 		midi = midi[0].textContent;
     *      const outputMidiNumber = articulation.getElementsByTagName('OutputMidiNumber')[0].textContent
     * 		const staffLine = articulation.getElementsByTagName('StaffLine')[0].textContent;
     * 		const techniqueSymbol = articulation.getElementsByTagName('TechniqueSymbol')[0].textContent;
     * 		const techniquePlacement = articulation.getElementsByTagName('TechniquePlacement')[0].textContent;
     * 		const noteHeads = articulation.getElementsByTagName('Noteheads')[0].textContent.split(' ').map(n=>n = 'MusicFontSymbol.' + n);
     * 		if(!existingArticulations.has(midi)) {
     *        if(techniqueSymbol) {
     * 		    s += `[${midi}, new InstrumentArticulation(${staffLine}, ${outputMidiNumber}, ${noteHeads[0]}, ${noteHeads[1]}, ${noteHeads[2]}, ${techniqueSymbol}, ${techniquePlacement})],\r\n`;
     *        }
     *        else {
     * 		    s += `[${midi}, new InstrumentArticulation(${staffLine}, ${outputMidiNumber}, ${noteHeads[0]}, ${noteHeads[1]}, ${noteHeads[2]})],\r\n`;
     *        }
     * 		  existingArticulations.set(midi, true);
     * 		}
     * 	}
     * }
     * copy(s)
     */
    private static instrumentArticulations: Map<number, InstrumentArticulation> = new Map([
        [38, new InstrumentArticulation(3, 38, MusicFontSymbol.NoteheadBlack, MusicFontSymbol.NoteheadHalf, MusicFontSymbol.NoteheadWhole)],
        [37, new InstrumentArticulation(3, 37, MusicFontSymbol.NoteheadXBlack, MusicFontSymbol.NoteheadXBlack, MusicFontSymbol.NoteheadXBlack)],
        [91, new InstrumentArticulation(3, 38, MusicFontSymbol.NoteheadDiamondWhite, MusicFontSymbol.NoteheadDiamondWhite, MusicFontSymbol.NoteheadDiamondWhite)],
        [42, new InstrumentArticulation(-1, 42, MusicFontSymbol.NoteheadXBlack, MusicFontSymbol.NoteheadXBlack, MusicFontSymbol.NoteheadXBlack)],
        [92, new InstrumentArticulation(-1, 46, MusicFontSymbol.NoteheadCircleSlash, MusicFontSymbol.NoteheadCircleSlash, MusicFontSymbol.NoteheadCircleSlash)],
        [46, new InstrumentArticulation(-1, 46, MusicFontSymbol.NoteheadCircleX, MusicFontSymbol.NoteheadCircleX, MusicFontSymbol.NoteheadCircleX)],
        [44, new InstrumentArticulation(9, 44, MusicFontSymbol.NoteheadXBlack, MusicFontSymbol.NoteheadXBlack, MusicFontSymbol.NoteheadXBlack)],
        [35, new InstrumentArticulation(8, 35, MusicFontSymbol.NoteheadBlack, MusicFontSymbol.NoteheadHalf, MusicFontSymbol.NoteheadWhole)],
        [36, new InstrumentArticulation(7, 36, MusicFontSymbol.NoteheadBlack, MusicFontSymbol.NoteheadHalf, MusicFontSymbol.NoteheadWhole)],
        [50, new InstrumentArticulation(1, 50, MusicFontSymbol.NoteheadBlack, MusicFontSymbol.NoteheadHalf, MusicFontSymbol.NoteheadWhole)],
        [48, new InstrumentArticulation(2, 48, MusicFontSymbol.NoteheadBlack, MusicFontSymbol.NoteheadHalf, MusicFontSymbol.NoteheadWhole)],
        [47, new InstrumentArticulation(4, 47, MusicFontSymbol.NoteheadBlack, MusicFontSymbol.NoteheadHalf, MusicFontSymbol.NoteheadWhole)],
        [45, new InstrumentArticulation(5, 45, MusicFontSymbol.NoteheadBlack, MusicFontSymbol.NoteheadHalf, MusicFontSymbol.NoteheadWhole)],
        [43, new InstrumentArticulation(6, 43, MusicFontSymbol.NoteheadBlack, MusicFontSymbol.NoteheadHalf, MusicFontSymbol.NoteheadWhole)],
        [93, new InstrumentArticulation(0, 51, MusicFontSymbol.NoteheadXBlack, MusicFontSymbol.NoteheadXBlack, MusicFontSymbol.NoteheadXBlack, MusicFontSymbol.PictEdgeOfCymbal, TextBaseline.Bottom)],
        [51, new InstrumentArticulation(0, 51, MusicFontSymbol.NoteheadXBlack, MusicFontSymbol.NoteheadXBlack, MusicFontSymbol.NoteheadXBlack)],
        [53, new InstrumentArticulation(0, 53, MusicFontSymbol.NoteheadDiamondWhite, MusicFontSymbol.NoteheadDiamondWhite, MusicFontSymbol.NoteheadDiamondWhite)],
        [94, new InstrumentArticulation(0, 51, MusicFontSymbol.NoteheadXBlack, MusicFontSymbol.NoteheadXBlack, MusicFontSymbol.NoteheadXBlack, MusicFontSymbol.ArticStaccatoAbove, TextBaseline.Top)],
        [55, new InstrumentArticulation(-2, 55, MusicFontSymbol.NoteheadXBlack, MusicFontSymbol.NoteheadXBlack, MusicFontSymbol.NoteheadXBlack)],
        [95, new InstrumentArticulation(-2, 55, MusicFontSymbol.NoteheadXBlack, MusicFontSymbol.NoteheadXBlack, MusicFontSymbol.NoteheadXBlack, MusicFontSymbol.ArticStaccatoAbove, TextBaseline.Bottom)],
        [52, new InstrumentArticulation(-3, 52, MusicFontSymbol.NoteheadHeavyXHat, MusicFontSymbol.NoteheadHeavyXHat, MusicFontSymbol.NoteheadHeavyXHat)],
        [96, new InstrumentArticulation(-3, 52, MusicFontSymbol.NoteheadHeavyXHat, MusicFontSymbol.NoteheadHeavyXHat, MusicFontSymbol.NoteheadHeavyXHat)],
        [49, new InstrumentArticulation(-2, 49, MusicFontSymbol.NoteheadHeavyX, MusicFontSymbol.NoteheadHeavyX, MusicFontSymbol.NoteheadHeavyX)],
        [97, new InstrumentArticulation(-2, 49, MusicFontSymbol.NoteheadHeavyX, MusicFontSymbol.NoteheadHeavyX, MusicFontSymbol.NoteheadHeavyX, MusicFontSymbol.ArticStaccatoAbove, TextBaseline.Bottom)],
        [57, new InstrumentArticulation(-1, 57, MusicFontSymbol.NoteheadHeavyX, MusicFontSymbol.NoteheadHeavyX, MusicFontSymbol.NoteheadHeavyX)],
        [98, new InstrumentArticulation(-1, 57, MusicFontSymbol.NoteheadHeavyX, MusicFontSymbol.NoteheadHeavyX, MusicFontSymbol.NoteheadHeavyX, MusicFontSymbol.ArticStaccatoAbove, TextBaseline.Bottom)],
        [99, new InstrumentArticulation(1, 56, MusicFontSymbol.NoteheadTriangleUpBlack, MusicFontSymbol.NoteheadTriangleUpHalf, MusicFontSymbol.NoteheadTriangleUpWhole)],
        [100, new InstrumentArticulation(1, 56, MusicFontSymbol.NoteheadXBlack, MusicFontSymbol.NoteheadXHalf, MusicFontSymbol.NoteheadXWhole)],
        [56, new InstrumentArticulation(0, 56, MusicFontSymbol.NoteheadTriangleUpBlack, MusicFontSymbol.NoteheadTriangleUpHalf, MusicFontSymbol.NoteheadTriangleUpWhole)],
        [101, new InstrumentArticulation(0, 56, MusicFontSymbol.NoteheadXBlack, MusicFontSymbol.NoteheadXHalf, MusicFontSymbol.NoteheadXWhole)],
        [102, new InstrumentArticulation(-1, 56, MusicFontSymbol.NoteheadTriangleUpBlack, MusicFontSymbol.NoteheadTriangleUpHalf, MusicFontSymbol.NoteheadTriangleUpWhole)],
        [103, new InstrumentArticulation(-1, 56, MusicFontSymbol.NoteheadXBlack, MusicFontSymbol.NoteheadXHalf, MusicFontSymbol.NoteheadXWhole)],
        [77, new InstrumentArticulation(-9, 77, MusicFontSymbol.NoteheadTriangleUpBlack, MusicFontSymbol.NoteheadTriangleUpBlack, MusicFontSymbol.NoteheadTriangleUpBlack)],
        [76, new InstrumentArticulation(-10, 76, MusicFontSymbol.NoteheadTriangleUpBlack, MusicFontSymbol.NoteheadTriangleUpBlack, MusicFontSymbol.NoteheadTriangleUpBlack)],
        [60, new InstrumentArticulation(-4, 60, MusicFontSymbol.NoteheadBlack, MusicFontSymbol.NoteheadHalf, MusicFontSymbol.NoteheadWhole)],
        [104, new InstrumentArticulation(-5, 60, MusicFontSymbol.NoteheadBlack, MusicFontSymbol.NoteheadHalf, MusicFontSymbol.NoteheadWhole, MusicFontSymbol.NoteheadParenthesis, TextBaseline.Middle)],
        [105, new InstrumentArticulation(-6, 60, MusicFontSymbol.NoteheadXBlack, MusicFontSymbol.NoteheadXBlack, MusicFontSymbol.NoteheadXBlack)],
        [61, new InstrumentArticulation(-7, 61, MusicFontSymbol.NoteheadBlack, MusicFontSymbol.NoteheadHalf, MusicFontSymbol.NoteheadWhole)],
        [106, new InstrumentArticulation(-8, 61, MusicFontSymbol.NoteheadBlack, MusicFontSymbol.NoteheadHalf, MusicFontSymbol.NoteheadWhole, MusicFontSymbol.NoteheadParenthesis, TextBaseline.Middle)],
        [107, new InstrumentArticulation(-16, 61, MusicFontSymbol.NoteheadXBlack, MusicFontSymbol.NoteheadXBlack, MusicFontSymbol.NoteheadXBlack)],
        [66, new InstrumentArticulation(10, 66, MusicFontSymbol.NoteheadBlack, MusicFontSymbol.NoteheadHalf, MusicFontSymbol.NoteheadWhole)],
        [65, new InstrumentArticulation(9, 65, MusicFontSymbol.NoteheadBlack, MusicFontSymbol.NoteheadHalf, MusicFontSymbol.NoteheadWhole)],
        [68, new InstrumentArticulation(12, 68, MusicFontSymbol.NoteheadBlack, MusicFontSymbol.NoteheadHalf, MusicFontSymbol.NoteheadWhole)],
        [67, new InstrumentArticulation(11, 67, MusicFontSymbol.NoteheadBlack, MusicFontSymbol.NoteheadHalf, MusicFontSymbol.NoteheadWhole)],
        [64, new InstrumentArticulation(17, 64, MusicFontSymbol.NoteheadBlack, MusicFontSymbol.NoteheadHalf, MusicFontSymbol.NoteheadWhole)],
        [108, new InstrumentArticulation(16, 64, MusicFontSymbol.NoteheadXBlack, MusicFontSymbol.NoteheadXBlack, MusicFontSymbol.NoteheadXBlack)],
        [109, new InstrumentArticulation(15, 64, MusicFontSymbol.NoteheadBlack, MusicFontSymbol.NoteheadHalf, MusicFontSymbol.NoteheadWhole, MusicFontSymbol.NoteheadParenthesis, TextBaseline.Middle)],
        [63, new InstrumentArticulation(14, 63, MusicFontSymbol.NoteheadBlack, MusicFontSymbol.NoteheadHalf, MusicFontSymbol.NoteheadWhole)],
        [110, new InstrumentArticulation(13, 63, MusicFontSymbol.NoteheadXBlack, MusicFontSymbol.NoteheadXBlack, MusicFontSymbol.NoteheadXBlack)],
        [62, new InstrumentArticulation(19, 62, MusicFontSymbol.NoteheadBlack, MusicFontSymbol.NoteheadHalf, MusicFontSymbol.NoteheadWhole, MusicFontSymbol.NoteheadParenthesis, TextBaseline.Middle)],
        [72, new InstrumentArticulation(-11, 72, MusicFontSymbol.NoteheadBlack, MusicFontSymbol.NoteheadHalf, MusicFontSymbol.NoteheadWhole)],
        [71, new InstrumentArticulation(-17, 71, MusicFontSymbol.NoteheadBlack, MusicFontSymbol.NoteheadHalf, MusicFontSymbol.NoteheadWhole)],
        [73, new InstrumentArticulation(38, 73, MusicFontSymbol.NoteheadBlack, MusicFontSymbol.NoteheadHalf, MusicFontSymbol.NoteheadWhole)],
        [74, new InstrumentArticulation(37, 74, MusicFontSymbol.NoteheadBlack, MusicFontSymbol.NoteheadHalf, MusicFontSymbol.NoteheadWhole)],
        [86, new InstrumentArticulation(36, 86, MusicFontSymbol.NoteheadBlack, MusicFontSymbol.NoteheadHalf, MusicFontSymbol.NoteheadWhole)],
        [87, new InstrumentArticulation(35, 87, MusicFontSymbol.NoteheadXBlack, MusicFontSymbol.NoteheadXBlack, MusicFontSymbol.NoteheadXBlack, MusicFontSymbol.NoteheadParenthesis, TextBaseline.Middle)],
        [54, new InstrumentArticulation(3, 54, MusicFontSymbol.NoteheadTriangleUpBlack, MusicFontSymbol.NoteheadTriangleUpBlack, MusicFontSymbol.NoteheadTriangleUpBlack)],
        [111, new InstrumentArticulation(2, 54, MusicFontSymbol.NoteheadTriangleUpBlack, MusicFontSymbol.NoteheadTriangleUpBlack, MusicFontSymbol.NoteheadTriangleUpBlack, MusicFontSymbol.StringsUpBow, TextBaseline.Bottom)],
        [112, new InstrumentArticulation(1, 54, MusicFontSymbol.NoteheadTriangleUpBlack, MusicFontSymbol.NoteheadTriangleUpBlack, MusicFontSymbol.NoteheadTriangleUpBlack, MusicFontSymbol.StringsDownBow, TextBaseline.Bottom)],
        [113, new InstrumentArticulation(-7, 54, MusicFontSymbol.NoteheadXBlack, MusicFontSymbol.NoteheadXBlack, MusicFontSymbol.NoteheadXBlack)],
        [79, new InstrumentArticulation(30, 79, MusicFontSymbol.NoteheadBlack, MusicFontSymbol.NoteheadHalf, MusicFontSymbol.NoteheadWhole)],
        [78, new InstrumentArticulation(29, 78, MusicFontSymbol.NoteheadXBlack, MusicFontSymbol.NoteheadXBlack, MusicFontSymbol.NoteheadXBlack)],
        [58, new InstrumentArticulation(28, 58, MusicFontSymbol.NoteheadBlack, MusicFontSymbol.NoteheadHalf, MusicFontSymbol.NoteheadWhole)],
        [81, new InstrumentArticulation(27, 81, MusicFontSymbol.NoteheadBlack, MusicFontSymbol.NoteheadHalf, MusicFontSymbol.NoteheadWhole)],
        [80, new InstrumentArticulation(26, 80, MusicFontSymbol.NoteheadXBlack, MusicFontSymbol.NoteheadXBlack, MusicFontSymbol.NoteheadXBlack, MusicFontSymbol.NoteheadParenthesis, TextBaseline.Middle)],
        [114, new InstrumentArticulation(25, 43, MusicFontSymbol.NoteheadBlack, MusicFontSymbol.NoteheadHalf, MusicFontSymbol.NoteheadWhole)],
        [115, new InstrumentArticulation(18, 49, MusicFontSymbol.NoteheadBlack, MusicFontSymbol.NoteheadHalf, MusicFontSymbol.NoteheadWhole)],
        [116, new InstrumentArticulation(24, 49, MusicFontSymbol.NoteheadXBlack, MusicFontSymbol.NoteheadXBlack, MusicFontSymbol.NoteheadXBlack)],
        [69, new InstrumentArticulation(23, 69, MusicFontSymbol.NoteheadBlack, MusicFontSymbol.NoteheadHalf, MusicFontSymbol.NoteheadWhole)],
        [117, new InstrumentArticulation(22, 69, MusicFontSymbol.NoteheadBlack, MusicFontSymbol.NoteheadHalf, MusicFontSymbol.NoteheadWhole, MusicFontSymbol.StringsUpBow, TextBaseline.Bottom)],
        [85, new InstrumentArticulation(21, 85, MusicFontSymbol.NoteheadBlack, MusicFontSymbol.NoteheadHalf, MusicFontSymbol.NoteheadWhole)],
        [75, new InstrumentArticulation(20, 75, MusicFontSymbol.NoteheadBlack, MusicFontSymbol.NoteheadHalf, MusicFontSymbol.NoteheadWhole)],
        [70, new InstrumentArticulation(-12, 70, MusicFontSymbol.NoteheadBlack, MusicFontSymbol.NoteheadHalf, MusicFontSymbol.NoteheadWhole)],
        [118, new InstrumentArticulation(-13, 70, MusicFontSymbol.NoteheadBlack, MusicFontSymbol.NoteheadHalf, MusicFontSymbol.NoteheadWhole, MusicFontSymbol.StringsUpBow, TextBaseline.Bottom)],
        [119, new InstrumentArticulation(-14, 70, MusicFontSymbol.NoteheadBlack, MusicFontSymbol.NoteheadHalf, MusicFontSymbol.NoteheadWhole)],
        [120, new InstrumentArticulation(-15, 70, MusicFontSymbol.NoteheadBlack, MusicFontSymbol.NoteheadHalf, MusicFontSymbol.NoteheadWhole, MusicFontSymbol.StringsUpBow, TextBaseline.Bottom)],
        [82, new InstrumentArticulation(-23, 54, MusicFontSymbol.NoteheadBlack, MusicFontSymbol.NoteheadHalf, MusicFontSymbol.NoteheadWhole)],
        [122, new InstrumentArticulation(-24, 54, MusicFontSymbol.NoteheadBlack, MusicFontSymbol.NoteheadHalf, MusicFontSymbol.NoteheadWhole, MusicFontSymbol.StringsUpBow, TextBaseline.Bottom)],
        [84, new InstrumentArticulation(-18, 53, MusicFontSymbol.NoteheadBlack, MusicFontSymbol.NoteheadHalf, MusicFontSymbol.NoteheadWhole)],
        [123, new InstrumentArticulation(-19, 53, MusicFontSymbol.NoteheadBlack, MusicFontSymbol.NoteheadHalf, MusicFontSymbol.NoteheadWhole, MusicFontSymbol.StringsUpBow, TextBaseline.Bottom)],
        [83, new InstrumentArticulation(-20, 53, MusicFontSymbol.NoteheadBlack, MusicFontSymbol.NoteheadHalf, MusicFontSymbol.NoteheadWhole)],
        [124, new InstrumentArticulation(-21, 62, MusicFontSymbol.NoteheadNull, MusicFontSymbol.NoteheadNull, MusicFontSymbol.NoteheadNull, MusicFontSymbol.GuitarGolpe, TextBaseline.Top)],
        [125, new InstrumentArticulation(-22, 62, MusicFontSymbol.NoteheadNull, MusicFontSymbol.NoteheadNull, MusicFontSymbol.NoteheadNull, MusicFontSymbol.GuitarGolpe, TextBaseline.Bottom)],
        [39, new InstrumentArticulation(3, 39, MusicFontSymbol.NoteheadBlack, MusicFontSymbol.NoteheadHalf, MusicFontSymbol.NoteheadWhole)],
        [40, new InstrumentArticulation(3, 40, MusicFontSymbol.NoteheadBlack, MusicFontSymbol.NoteheadHalf, MusicFontSymbol.NoteheadWhole)],
        [31, new InstrumentArticulation(3, 40, MusicFontSymbol.NoteheadSlashedBlack2, MusicFontSymbol.NoteheadSlashedBlack2, MusicFontSymbol.NoteheadSlashedBlack2)],
        [41, new InstrumentArticulation(5, 41, MusicFontSymbol.NoteheadBlack, MusicFontSymbol.NoteheadHalf, MusicFontSymbol.NoteheadWhole)],
        [59, new InstrumentArticulation(2, 59, MusicFontSymbol.NoteheadXBlack, MusicFontSymbol.NoteheadXBlack, MusicFontSymbol.NoteheadXBlack, MusicFontSymbol.PictEdgeOfCymbal, TextBaseline.Bottom)],
        [126, new InstrumentArticulation(2, 59, MusicFontSymbol.NoteheadXBlack, MusicFontSymbol.NoteheadXBlack, MusicFontSymbol.NoteheadXBlack)],
        [127, new InstrumentArticulation(2, 59, MusicFontSymbol.NoteheadDiamondWhite, MusicFontSymbol.NoteheadDiamondWhite, MusicFontSymbol.NoteheadDiamondWhite)],
        [29, new InstrumentArticulation(2, 59, MusicFontSymbol.NoteheadXBlack, MusicFontSymbol.NoteheadXBlack, MusicFontSymbol.NoteheadXBlack, MusicFontSymbol.ArticStaccatoAbove, TextBaseline.Top)],
        [30, new InstrumentArticulation(-3, 49, MusicFontSymbol.NoteheadXBlack, MusicFontSymbol.NoteheadXBlack, MusicFontSymbol.NoteheadXBlack)],
        [33, new InstrumentArticulation(3, 37, MusicFontSymbol.NoteheadXBlack, MusicFontSymbol.NoteheadXBlack, MusicFontSymbol.NoteheadXBlack)],
        [34, new InstrumentArticulation(3, 38, MusicFontSymbol.NoteheadBlack, MusicFontSymbol.NoteheadBlack, MusicFontSymbol.NoteheadBlack)]
    ]);


    public static getArticulation(n: Note): InstrumentArticulation | null {
        const articulationIndex = n.percussionArticulation;

        const trackArticulations = n.beat.voice.bar.staff.track.percussionArticulations;
        if (articulationIndex < trackArticulations.length) {
            return trackArticulations[articulationIndex];
        }

        return PercussionMapper.getArticulationByValue(articulationIndex);;
    }

    public static getElementAndVariation(n: Note): number[] {
        const articulation = PercussionMapper.getArticulation(n);
        if (!articulation) {
            return [-1, -1];
        }

        // search for the first element/variation combination with the same midi output 
        for (let element = 0; element < PercussionMapper.gp6ElementAndVariationToArticulation.length; element++) {
            const variations = PercussionMapper.gp6ElementAndVariationToArticulation[element];
            for (let variation = 0; variation < variations.length; variation++) {
                const gp6Articulation = PercussionMapper.getArticulationByValue(variations[variation]);
                if (gp6Articulation?.outputMidiNumber === articulation.outputMidiNumber) {
                    return [element, variation];
                }
            }
        }

        return [-1, -1];
    }

    public static getArticulationByValue(midiNumber: number): InstrumentArticulation | null {
        if (PercussionMapper.instrumentArticulations.has(midiNumber)) {
            return PercussionMapper.instrumentArticulations.get(midiNumber)!;
        }
        return null;
    }
}
