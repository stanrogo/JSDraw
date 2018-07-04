/**
 * @file ToolPanel.ts
 * @description A specialised draw area for shapes to drag and drop
 * @author Stanley Clark <me@stanrogo.com>
 * @version 0.0.1
 */

import DrawArea from "./DrawArea";
import CanvasCoordinates from '../interfaces/CanvasCoordinates';

class ToolPanel extends DrawArea{

	addShape(type: string, location: CanvasCoordinates){
		super.addShape(type, location);
	}
}

export default ToolPanel;
