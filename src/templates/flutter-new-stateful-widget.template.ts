import * as changeCase from "change-case";

export function getNewFlutterStatefulWidgetTemplate(widgetName: string): string {
    const pascalCaseWidgetName = changeCase.pascalCase(widgetName);
    return `import 'package:flutter/material.dart';

class ${pascalCaseWidgetName} extends StatefulWidget {
    ${pascalCaseWidgetName}({Key? key}) : super(key: key);

    @override
    _${pascalCaseWidgetName}State createState() => _${pascalCaseWidgetName}State();
}

class _${pascalCaseWidgetName}State extends State<${pascalCaseWidgetName}> {
    @override
    Widget build(BuildContext context) {
        return Container();
    }
}`;
}