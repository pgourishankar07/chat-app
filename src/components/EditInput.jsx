import { useCallback, useState } from 'react';
import { Alert, Icon, Input, InputGroup } from 'rsuite';

export default function EditInput({
  initialVal,
  onSave,
  label = null,
  placeholder = 'Write your Value',
  emptyMsg = 'Input is Empty',
  ...inputProps
}) {
  const [input, setInput] = useState(initialVal);
  const [isEdit, setIsEdit] = useState(null);

  const onInputChange = useCallback(val => {
    setInput(val);
  }, []);

  const onEditClick = useCallback(() => {
    setIsEdit(p => !p);
    setInput(initialVal);
  }, [initialVal]);

  const onSaveClick = async () => {
    const trimmed = input.trim();

    if (trimmed === '') {
      Alert.info(emptyMsg, 4000);
    }
    if (trimmed !== initialVal) {
      await onSave(trimmed);
    }
    setIsEdit(false);
  };

  return (
    <div>
      {label}
      <InputGroup>
        <Input
          {...inputProps}
          disabled={!isEdit}
          placeholder={placeholder}
          value={input}
          onChange={onInputChange}
        />
        <InputGroup.Button onClick={onEditClick}>
          <Icon icon={isEdit ? 'close' : 'edit2'} />
        </InputGroup.Button>
        {isEdit && (
          <InputGroup.Button onClick={onSaveClick}>
            <Icon icon="check" />
          </InputGroup.Button>
        )}
      </InputGroup>
    </div>
  );
}
