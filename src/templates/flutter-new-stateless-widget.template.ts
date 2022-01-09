import * as changeCase from "change-case";

export function getNewFlutterStatelessWidgetTemplate(widgetName: string): string {
    const pascalCaseWidgetName = changeCase.pascalCase(widgetName);
    return `import 'package:flutter/material.dart';

class ${pascalCaseWidgetName} extends StatelessWidget {
    const ${pascalCaseWidgetName}({Key? key}) : super(key: key);

    @override
    Widget build(BuildContext context) {
        return Container();
    }
}`;
}