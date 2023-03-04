import { Environment } from '@src/Environment';
import { Color } from '@src/model/Color';
import { Font, FontStyle } from '@src/model/Font';
import { MusicFontSymbol } from '@src/model/MusicFontSymbol';
import { ICanvas, TextAlign, TextBaseline } from '@src/platform/ICanvas';
import { Settings } from '@src/Settings';

/**
 * A canvas-alike component which can be used in combination with 
 * WebRasterCanvas to support any built-in or 3rd party libraries exposing
 * a HTML5 canvas style interface for rendering. 
 * @target web
 */
export interface CanvasLike {
    getContext(contextId: "2d"): CanvasRenderingContext2D | null;
}

/**
 * A canvas implementation for objects supporting 
 * @target web
 */
export class WebRasterCanvas implements ICanvas {
    private _measureCanvas: CanvasLike;
    private _measureContext: CanvasRenderingContext2D;
    private _canvas: CanvasLike | null = null;
    private _context!: CanvasRenderingContext2D;
    private _color: Color = new Color(0, 0, 0, 0xff);
    private _font: Font = new Font('Arial', 10, FontStyle.Plain);
    private _musicFont: Font;
    private _lineWidth: number = 0;
    private _canvasFactory: (width: number, height: number) => CanvasLike;

    public settings!: Settings;

    public constructor(musicFontFamily:string, musicFontSize: number,
        canvasFactory: (width:number, height:number) => CanvasLike) {
        this._canvasFactory = canvasFactory;
        this._musicFont = new Font(musicFontFamily, musicFontSize);
        this._measureCanvas = canvasFactory(10, 10);
        this._measureContext = this._measureCanvas.getContext('2d')!;
        this._measureContext.textBaseline = 'hanging';
    }

    public onRenderFinished(): unknown {
        return null;
    }

    public beginRender(width: number, height: number): void {
        this._canvas = this._canvasFactory(width, height);;
        this._context = this._canvas.getContext('2d')!;
        this._context.textBaseline = 'hanging';
        this._context.scale(Environment.HighDpiFactor, Environment.HighDpiFactor);
        this._context.lineWidth = this._lineWidth;
    }

    public endRender(): unknown {
        const result = this._canvas!;
        this._canvas = null;
        return result;
    }

    public get color(): Color {
        return this._color;
    }

    public set color(value: Color) {
        if (this._color.rgba === value.rgba) {
            return;
        }
        this._color = value;
        this._context.strokeStyle = value.rgba;
        this._context.fillStyle = value.rgba;
    }

    public get lineWidth(): number {
        return this._lineWidth;
    }

    public set lineWidth(value: number) {
        this._lineWidth = value;
        if (this._context) {
            this._context.lineWidth = value;
        }
    }

    public fillRect(x: number, y: number, w: number, h: number): void {
        if (w > 0) {
            this._context.fillRect((x | 0), (y | 0), w, h);
        }
    }

    public strokeRect(x: number, y: number, w: number, h: number): void {
        this._context.strokeRect((x | 0), (y | 0), w, h);
    }

    public beginPath(): void {
        this._context.beginPath();
    }

    public closePath(): void {
        this._context.closePath();
    }

    public moveTo(x: number, y: number): void {
        this._context.moveTo(x, y);
    }

    public lineTo(x: number, y: number): void {
        this._context.lineTo(x, y);
    }

    public quadraticCurveTo(cpx: number, cpy: number, x: number, y: number): void {
        this._context.quadraticCurveTo(cpx, cpy, x, y);
    }

    public bezierCurveTo(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number): void {
        this._context.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
    }

    public fillCircle(x: number, y: number, radius: number): void {
        this._context.beginPath();
        this._context.arc(
            x,
            y,
            radius,
            0,
            Math.PI * 2,
            true
        );
        this.fill();
    }

    public strokeCircle(x: number, y: number, radius: number): void {
        this._context.beginPath();
        this._context.arc(
            x,
            y,
            radius,
            0,
            Math.PI * 2,
            true
        );
        this.stroke();
    }

    public fill(): void {
        this._context.fill();
        this._context.beginPath();
    }

    public stroke(): void {
        this._context.stroke();
        this._context.beginPath();
    }

    public get font(): Font {
        return this._font;
    }

    public set font(value: Font) {
        this._font = value;
        if (this._context) {
            this._context.font = value.toCssString(this.settings.display.scale);
        }
        this._measureContext.font = value.toCssString(this.settings.display.scale);
    }

    public get textAlign(): TextAlign {
        switch (this._context.textAlign) {
            case 'left':
                return TextAlign.Left;
            case 'center':
                return TextAlign.Center;
            case 'right':
                return TextAlign.Right;
            default:
                return TextAlign.Left;
        }
    }

    public set textAlign(value: TextAlign) {
        switch (value) {
            case TextAlign.Left:
                this._context.textAlign = 'left';
                break;
            case TextAlign.Center:
                this._context.textAlign = 'center';
                break;
            case TextAlign.Right:
                this._context.textAlign = 'right';
                break;
        }
    }

    public get textBaseline(): TextBaseline {
        switch (this._context.textBaseline) {
            case 'hanging':
                return TextBaseline.Top;
            case 'middle':
                return TextBaseline.Middle;
            case 'bottom':
                return TextBaseline.Bottom;
            default:
                return TextBaseline.Top;
        }
    }

    public set textBaseline(value: TextBaseline) {
        switch (value) {
            case TextBaseline.Top:
                this._context.textBaseline = 'hanging';
                break;
            case TextBaseline.Middle:
                this._context.textBaseline = 'middle';
                break;
            case TextBaseline.Bottom:
                this._context.textBaseline = 'bottom';
                break;
        }
    }

    public beginGroup(_: string): void {
        // not supported
    }

    public endGroup(): void {
        // not supported
    }

    public fillText(text: string, x: number, y: number): void {
        this._context.fillText(text, x, y);
    }

    public measureText(text: string): number {
        return this._measureContext.measureText(text).width / Environment.HighDpiFactor;
    }

    public fillMusicFontSymbol(
        x: number,
        y: number,
        scale: number,
        symbol: MusicFontSymbol,
        centerAtPosition: boolean = false
    ): void {
        if (symbol === MusicFontSymbol.None) {
            return;
        }
        this.fillMusicFontSymbolText(x, y, scale, String.fromCharCode(symbol), centerAtPosition);
    }

    public fillMusicFontSymbols(
        x: number,
        y: number,
        scale: number,
        symbols: MusicFontSymbol[],
        centerAtPosition: boolean = false
    ): void {
        let s: string = '';
        for (let symbol of symbols) {
            if (symbol !== MusicFontSymbol.None) {
                s += String.fromCharCode(symbol);
            }
        }
        this.fillMusicFontSymbolText(x, y, scale, s, centerAtPosition);
    }

    private fillMusicFontSymbolText(
        x: number,
        y: number,
        scale: number,
        symbols: string,
        centerAtPosition: boolean = false
    ): void {
        let textAlign = this._context.textAlign;
        let baseLine = this._context.textBaseline;
        let font: string = this._context.font;
        this._context.font = this._musicFont.toCssString(scale);
        this._context.textBaseline = 'middle';
        if (centerAtPosition) {
            this._context.textAlign = 'center';
        } else {
            this._context.textAlign = 'left';
        }
        this._context.fillText(symbols, x, y);
        this._context.textBaseline = baseLine;
        this._context.font = font;
        this._context.textAlign = textAlign;
    }

    public beginRotate(centerX: number, centerY: number, angle: number): void {
        this._context.save();
        this._context.translate(centerX, centerY);
        this._context.rotate((angle * Math.PI) / 180.0);
    }

    public endRotate(): void {
        this._context.restore();
    }
}