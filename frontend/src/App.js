import { useState } from "react";
import { Button } from "react-bootstrap";
import ProductForm from "./components/ProductForm";
import ProductTable from "./components/ProductTable";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [idForUpdate, setIdForUpdate] = useState("");

  const handleClose = () => setIsOpen(false);

  const openProductModel = () => setIsOpen(true);

  return (
    <div className="container pt-5 shadow mt-5 pb-5">
      <h1 className="text-center">CRUD Node.js With MySQL</h1>
      <hr className="horizontal"></hr>
      <div className="m-10 d-flex flex-row-reverse mt-4">
        <Button variant="primary" onClick={openProductModel}>
          Create Product
        </Button>
      </div>

      <ProductForm
        handleClose={handleClose}
        isOpen={isOpen}
        idForUpdate={idForUpdate}
        setAllProducts={setAllProducts}
      />
      <ProductTable
        handleClose={handleClose}
        setAllProducts={setAllProducts}
        allProducts={allProducts}
        openProductModel={openProductModel}
        setIdForUpdate={setIdForUpdate}
      />
    </div>
  );
}

export default App;
