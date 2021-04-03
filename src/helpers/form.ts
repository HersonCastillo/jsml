import { ref } from './ref';

export const useForm = <T>(
  formKey: string,
  onSubmit: (data: T) => void,
): void => {
  const formNode = ref<HTMLFormElement>(formKey, 'form');

  const updateOnSubmit = () => {
    let formValues = {};
    if (formNode?.children.length) {
      const inputs = Array.from(formNode?.children).filter(
        (node) => node.nodeName.includes('INPUT'),
      );
      for (const input of inputs) {
        formValues = {
          ...formValues,
          [input.id]: (input as HTMLFormElement).value,
        };
      }
    }
    return formValues;
  };

  if (onSubmit) {
    formNode?.addEventListener('submit', (event) => {
      event.preventDefault();
      onSubmit(updateOnSubmit() as T);
    });
  }
};
