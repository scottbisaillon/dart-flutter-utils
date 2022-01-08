import * as changeCase from "change-case";

export function getNewDartEnumTemplate(enumName: string): string {
    const pascalCaseClassName = changeCase.pascalCase(enumName);
    return `enum ${pascalCaseClassName} {
    
}`;
};