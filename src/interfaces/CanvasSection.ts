interface CanvasSection {
	resize: () => void;
	mousedown: (e) => void;
	mouseup: (e) => void;
	doubleClick: (e) => void;
	mousemove: (e) => void;
}

export default CanvasSection;
