interface CanvasSection {
	resize: () => void;
	mouseDown: (e) => void;
	mouseUp: (e) => void;
	doubleClick: (e) => void;
	mouseMove: (e) => void;
	draw: () => void;
}

export default CanvasSection;
