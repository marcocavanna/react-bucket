import { NodePlopAPI } from 'plop';


export default function buildGenerators(plop: NodePlopAPI) {

  /** Set the Component Type */
  const componentTypePrompts = {
    type   : 'list',
    name   : 'type',
    message: 'Component Type',
    choices: [ 'collections', 'elements', 'modules', 'widget' ]
  };

  /** Set the Component Extras */
  const componentExtras = [
    {
      type   : 'confirm',
      name   : 'couldHaveChildren',
      message: 'This component could have declared children?'
    },
    {
      type   : 'confirm',
      name   : 'couldChangeElementType',
      message: 'This component could change its default ElementType?'
    },
    {
      type   : 'confirm',
      name   : 'hasStateClasses',
      message: 'This components could has component state classes, like primary/danger etc?'
    }
  ];


  /* --------
   * Build Generators
   * -------- */
  plop.setGenerator('component', {
    description: 'React Bucket Component',
    prompts    : [
      componentTypePrompts,
      {
        type   : 'input',
        name   : 'componentName',
        message: 'The Component Name'
      },
      ...componentExtras
    ],
    actions    : [
      {
        type        : 'add',
        path        : 'src/react/{{ type }}/{{ pascalCase componentName }}/{{ pascalCase componentName }}.tsx',
        templateFile: 'templates/component.hbs'
      },
      {
        type        : 'add',
        path        : 'src/react/{{ type }}/{{ pascalCase componentName }}/{{ pascalCase componentName }}.types.ts',
        templateFile: 'templates/component.types.hbs'
      },
      {
        type        : 'add',
        path        : 'src/react/{{ type }}/{{ pascalCase componentName }}/index.ts',
        templateFile: 'templates/component.index.hbs'
      }
    ]
  });

  plop.setGenerator('subcomponent', {
    description: 'React Bucket Sub Component',
    prompts    : [
      componentTypePrompts,
      {
        type   : 'input',
        name   : 'parentComponentName',
        message: 'Parent Component Name'
      },
      {
        type   : 'input',
        name   : 'componentName',
        message: 'Component Name'
      },
      ...componentExtras
    ],
    actions    : [
      {
        type        : 'add',
        path        : 'src/react/{{ type }}/{{ pascalCase parentComponentName }}/{{ pascalCase componentName }}.tsx',
        templateFile: 'templates/component.hbs'
      },
      {
        type        : 'add',
        path        : 'src/react/{{ type }}/{{ pascalCase parentComponentName }}/{{ pascalCase componentName }}.types.ts',
        templateFile: 'templates/component.types.hbs'
      }
    ]
  });

}
