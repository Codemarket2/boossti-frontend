import { useState } from 'react';
import userEvent from '@testing-library/user-event';
import { fireEvent, render, screen, act, waitFor } from '../../../../jest/test-utils';
import Actions from '../Actions';

export const mockForm = {
  name: 'demo-form',
  slug: 'demo-form',
  fields: [{ field: '629903795fa8f21aef7ed47c', label: 'name', fieldType: 'text' }],
  settings: {
    actions: [
      {
        name: 'Send email to owner',
        actionType: 'sendEmail',
        triggerType: 'onCreate',
        active: true,
        senderEmail: 'info@boossti.com',
        receiverType: 'formOwner',
        subject: 'New form submission',
        body: 'Hello You have new form submission on {{formName}} by {{createdBy}}',
      },
    ],
  },
};

export const ActionsTest = () => {
  const [form, setForm] = useState(mockForm);
  return (
    <>
      <Actions
        fields={form?.fields}
        settings={form?.settings}
        onChange={(actions) => {
          const newForm = { ...form, settings: { ...form.settings, actions } };
          setForm(newForm);
        }}
      />
      <p data-testid="action-counts">{form.settings.actions.length}</p>
    </>
  );
};

describe('Form Actions', () => {
  it('Actions list', () => {
    render(<ActionsTest />);
    expect(screen.getByTestId('actions-title')).toHaveTextContent('Actions');
    const actions = screen.getAllByTestId('action-item');
    expect(actions.length).toBe(1);
    const mockAction = mockForm.settings.actions[0];
    const action = actions[0];
    expect(action).toHaveTextContent(mockAction.name);
    expect(action).toHaveTextContent(mockAction.actionType);
    const moreButton = screen.getByTestId('action-more-button');
    expect(moreButton).toBeDefined();
    expect(moreButton).toBeEnabled();
  });

  it('Add new action button', () => {
    render(<ActionsTest />);
    const addButton = screen.getByTestId('add-new-action-button');
    expect(addButton).toBeDefined();
    fireEvent.click(addButton);
    expect(screen.getByTestId('action-form-title')).toHaveTextContent('Add Action');
    const saveButton = screen.getByTestId('save-button');
    expect(saveButton).toBeDefined();
    const cancelButton = screen.getByTestId('cancel-button');
    expect(cancelButton).toBeDefined();
    fireEvent.click(cancelButton);
    expect(screen.getByTestId('add-new-action-button')).toBeDefined();
  });

  it('Add new action - send email', async () => {
    render(<ActionsTest />);
    const addButton = screen.getByTestId('add-new-action-button');
    expect(addButton).toBeDefined();
    fireEvent.click(addButton);
    const nameInput = screen.getByTestId('action-name-input') as HTMLInputElement;
    fireEvent.change(nameInput, { target: { value: 'Send email to form owner' } });
    fireEvent.change(screen.getByTestId('trigger-type-input'), {
      target: { value: 'onCreate' },
    });
    const actionTypeInput = screen.getByTestId('action-type-input') as HTMLInputElement;
    fireEvent.change(actionTypeInput, {
      target: { value: 'sendEmail' },
    });
    expect(actionTypeInput.value).toBe('sendEmail');
    const senderEmailInput = screen.getByTestId('sender-email-input') as HTMLInputElement;
    expect(senderEmailInput.value).toBe('');
    fireEvent.change(senderEmailInput, {
      target: { value: 'info@boossti.com' },
    });
    fireEvent.change(screen.getByTestId('receiver-type-input'), {
      target: { value: 'formOwner' },
    });
    fireEvent.change(screen.getByTestId('subject-input'), {
      target: { value: 'New form submission' },
    });
    const bodyInput = screen.getByTestId('body-input') as HTMLInputElement;
    expect(bodyInput).toBeDefined();
    expect(bodyInput.value).toBe('');
    fireEvent.change(bodyInput, {
      target: { value: 'Hello, You have new form submission on {{formName}}, by {{createdBy}}' },
    });
    const saveButton = screen.getByTestId('save-button');
    fireEvent.click(saveButton);
    await new Promise((r) => setTimeout(r, 1000));
    expect(screen.getAllByTestId('action-item').length).toBe(2);
  });

  it('Delete action, confirm delete true', async () => {
    render(<ActionsTest />);
    expect(screen.getAllByTestId('action-item').length).toBe(1);
    const moreButton = screen.getByTestId('action-more-button');
    expect(moreButton).toBeDefined();
    expect(moreButton).toBeEnabled();
    fireEvent.click(moreButton);
    window.confirm = jest.fn((message) => true);
    const deleteButton = screen.getByTestId('crud-menu-delete-button');
    fireEvent.click(deleteButton);
    expect(screen.queryAllByTestId('action-item').length).toBe(0);
  });

  it('Delete action,  confirm delete false', async () => {
    render(<ActionsTest />);
    expect(screen.getAllByTestId('action-item').length).toBe(1);
    const moreButton = screen.getByTestId('action-more-button');
    expect(moreButton).toBeDefined();
    expect(moreButton).toBeEnabled();
    fireEvent.click(moreButton);
    window.confirm = jest.fn((message) => false);
    const deleteButton = screen.getByTestId('crud-menu-delete-button');
    fireEvent.click(deleteButton);
    expect(screen.queryAllByTestId('action-item').length).toBe(1);
  });

  it('Edit action', async () => {
    render(<ActionsTest />);
    expect(screen.getAllByTestId('action-item').length).toBe(1);
    const moreButton = screen.getByTestId('action-more-button');
    expect(moreButton).toBeDefined();
    expect(moreButton).toBeEnabled();
    fireEvent.click(moreButton);
    const editButton = screen.getByTestId('crud-menu-edit-button');
    fireEvent.click(editButton);
    const nameInput = screen.getByTestId('action-name-input') as HTMLInputElement;
    const newActionName = 'Send email to form owner changed';
    fireEvent.change(nameInput, { target: { value: newActionName } });
    const saveButton = screen.getByTestId('save-button');
    fireEvent.click(saveButton);
    await new Promise((r) => setTimeout(r, 1000));
    const actions = screen.getAllByTestId('action-item');
    expect(actions.length).toBe(1);
    const mockAction = mockForm.settings.actions[0];
    const action = actions[0];
    expect(action).toHaveTextContent(newActionName);
    expect(action).toHaveTextContent(mockAction.actionType);
  });
});
