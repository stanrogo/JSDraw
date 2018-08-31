import ClassProps from "../interfaces/ClassProps";
import MethodProps from "../interfaces/MethodProps";

class ClassBuilder {
    props: ClassProps;

    constructor(props: ClassProps){
        this.props = props;
    }

    generateCode() {
        let classString = '';
        classString += `class ${this.props.name} {\n`;
        this.props.methods.forEach((method: MethodProps) => {
            classString += `
                ${method.visibility} ${method.name}() {
                
                }
            `;
        });

        classString += '}\n';
        return classString;
    }
}

export default ClassBuilder;
