import { DisplayForm } from '../../form2/DisplayForm';

export default function userFormPlugin(editor: any) {
  const blockManager = editor.Blocks;
  blockManager.add('UserForm', {
    label: 'User Form',
    content: ` 
      <div>
        ${(
          <DisplayForm
            slug="users"
            settings={{ widgetType: 'form', whoCanSubmit: 'all' }}
            modifyForm={(form) => {
              const newForm = { ...form };
              newForm.fields = newForm?.fields?.map((field) => {
                const newField = { ...field };
                if (newField?.label?.toLowerCase() === 'roles') {
                  newField.options.hidden = true;
                }
                return newField;
              });
              return newForm;
            }}
          />
        )}
      </div>
    `,
    category: 'Forms',
    attributes: {
      title: 'User Form',
    },
  });
}
