import { ChangeEvent, useState } from 'react';

interface IProduct {
  key: number;
  code: string;
  description: string;
  price?: number;
}

export const Products = () => {
  const [products, setProducts] = useState<IProduct[]>([
    { key: Date.now(), code: '10', description: 'Keyboard', price: 98 },
  ]);

  const handleAdd = () => {
    setProducts(prevProducts => [
      ...prevProducts,
      {
        key: Date.now(),
        code: '',
        description: '',
        price: undefined,
      },
    ]);
  };

  const handleDelete = (key: number) => {
    setProducts(prevProducts =>
      prevProducts.filter(product => product.key !== key)
    );
  };

  const handleInputChange = (
    key: number,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setProducts(prevState => {
      const newState = prevState.map(product => {
        if (product.key === key) {
          return {
            ...product,
            [event.target.name]: event.target.value,
          };
        }
        return product;
      });

      return newState;
    });
  };

  return (
    <div>
      <h2>Products</h2>
      {products.map(product => (
        <div className="row">
          <input
            type="text"
            placeholder="Code"
            name="code"
            value={product.code}
            onChange={event => handleInputChange(product.key, event)}
          />
          <input
            type="text"
            placeholder="Description"
            name="description"
            value={product.description}
            onChange={event => handleInputChange(product.key, event)}
          />
          <input
            type="text"
            placeholder="Price"
            name="price"
            value={product.price}
            onChange={event => handleInputChange(product.key, event)}
          />
          <button
            className="delete-btn"
            onClick={() => handleDelete(product.key)}
          >
            Delete
          </button>
        </div>
      ))}

      <button className="add-btn" onClick={handleAdd}>
        Add
      </button>
      <pre>
        <code>{JSON.stringify(products, null, 2)}</code>
      </pre>
    </div>
  );
};
