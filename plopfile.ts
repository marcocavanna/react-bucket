import { NodePlopAPI } from 'plop';


export default function buildGenerators(plop: NodePlopAPI) {

  plop.setGenerator('component', {
    description: 'React Bucket Component',
    prompts    : [
      {
        type   : 'input',
        name   : 'type',
        message: 'Component Type'
      },
      {
        type   : 'input',
        name   : 'componentName',
        message: 'The Component Name'
      }
    ],
    actions    : [
      {
        type        : 'add',
        path        : 'src/react/{{ type }}/{{ componentName }}/{{ pascalCase componentName }}.tsx',
        templateFile: 'templates/component.hbs'
      },
      {
        type        : 'add',
        path        : 'src/react/{{ type }}/{{ componentName }}/{{ pascalCase componentName }}.types.ts',
        templateFile: 'templates/component.types.hbs'
      },
      {
        type        : 'add',
        path        : 'src/react/{{ type }}/{{ pascalCase componentName }}/index.ts',
        templateFile: 'templates/component.index.hbs'
      }
    ]
  });

}
