import { useFieldArray, useForm } from 'react-hook-form';

interface IProduct {
  code: string;
  description: string;
  price?: number;
}

type FormValues = {
  products: IProduct[];
};

export const ProductsRHF = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'products',
  });

  const handleAdd = () => {
    append({
      code: '',
      description: '',
      price: undefined,
    });
  };

  console.log(errors);

  return (
    <div>
      <h2>Products</h2>
      <form onSubmit={handleSubmit(data => console.log(data))}>
        {fields.map((product, index) => (
          <div className="row" key={product.id}>
            <input
              type="text"
              placeholder="Code"
              {...register(`products.${index}.code`, {
                required: 'Por favor, preencha o campo code.',
              })}
            />
            <input
              type="text"
              placeholder="Description"
              {...register(`products.${index}.description`)}
            />
            <input
              type="text"
              placeholder="Price"
              {...register(`products.${index}.price`)}
            />
            <button className="delete-btn" onClick={() => remove(index)}>
              Delete
            </button>
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
      <button className="add-btn" onClick={handleAdd}>
        Add
      </button>
      <pre>
        <code>{JSON.stringify(fields, null, 2)}</code>
      </pre>
    </div>
  );
};
