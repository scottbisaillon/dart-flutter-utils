import * as changeCase from "change-case";

export function getNewDartClassTemplate(className: string): string {
    const pascalCaseClassName = changeCase.pascalCase(className);
    return `class ${pascalCaseClassName} {
    
}`;
};